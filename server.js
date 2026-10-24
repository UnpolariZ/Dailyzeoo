import {createContentHistory} from './content-history.js';
import http from 'node:http';
import {readFile} from 'node:fs/promises';
import {fileURLToPath} from 'node:url';
import path from 'node:path';
import {randomBytes,randomInt} from 'node:crypto';
import os from 'node:os';
import {createRankingStore} from './ranking-store.js';
import {games,defaultSettings} from './games.js';
import {createEngine,snapshot,validateSettings,recommendation} from './engine.js';
const root=path.resolve(fileURLToPath(new URL('./public/',import.meta.url)));
const uid=()=>randomBytes(18).toString('hex');
const clean=s=>String(s||'').trim().slice(0,22)||'Invité';
function send(res,data,status=200){res.writeHead(status,{'Content-Type':'application/json','Cache-Control':'no-store'});res.end(JSON.stringify(data));}
const fail=(message,status=400)=>{const e=Error(message);e.status=status;throw e;};
export function createServer({dataDir=path.resolve(fileURLToPath(new URL('./data/',import.meta.url))),timing={}}={}){
 const rooms=new Map(),clients=new Map(),store=createRankingStore(dataDir),contentHistory=createContentHistory(dataDir);
 function notify(r){r.revision=(r.revision||0)+1;for(const p of r.players){const message=`data: ${JSON.stringify(snapshot(r,p))}\n\n`;for(const res of clients.get(p.id)||[])res.write(message);}}
 const engine=createEngine({notify,timing});
 function remove(r,id){const p=r.players.find(p=>p.id===id);if(!p)return;clearTimeout(p.disconnectTimer);r.players=r.players.filter(p=>p.id!==id);if(!r.players.length){clearTimeout(r.timer);rooms.delete(r.code);return;}if(r.host===id)r.host=(r.players.find(p=>p.online)||r.players[0]).id;engine.departure(r,id);notify(r);}
 const cleanup=setInterval(()=>{for(const r of rooms.values()){for(const p of [...r.players])if(p.pollAt&&Date.now()-p.pollAt>90000&&!clients.get(p.id)?.size)remove(r,p.id);}for(const r of rooms.values())if(!r.players.some(p=>p.online)&&Date.now()-r.created>3600000){clearTimeout(r.timer);rooms.delete(r.code);}},60000);cleanup.unref();
 async function api(req,res,url){
 if(req.method==='GET'&&url.pathname==='/api/time')return send(res,{now:Date.now()});
 if(req.method==='GET'&&url.pathname==='/api/games')return send(res,games.map(g=>({...g,defaults:defaultSettings(g.id)})));
 if(req.method==='GET'&&url.pathname==='/api/leaderboard')return send(res,await store.snapshot());
 if(req.method==='GET'&&url.pathname==='/api/events'){
 const token=url.searchParams.get('token'),r=[...rooms.values()].find(r=>r.players.some(p=>p.token===token));if(!r)fail('Session expirée. Rejoignez un salon.',404);const p=r.players.find(p=>p.token===token);
 res.writeHead(200,{'Content-Type':'text/event-stream','Cache-Control':'no-cache','Connection':'keep-alive'});res.write(': connected\n\n');let set=clients.get(p.id)||new Set();set.add(res);clients.set(p.id,set);p.online=true;clearTimeout(p.disconnectTimer);notify(r);const heartbeat=setInterval(()=>res.write(': heartbeat\n\n'),12000);
 res.on('close',()=>{clearInterval(heartbeat);set.delete(res);if(!set.size&&r.players.includes(p)&&!(p.pollAt&&Date.now()-p.pollAt<90000)){p.online=false;notify(r);p.disconnectTimer=setTimeout(()=>{if(!clients.get(p.id)?.size){remove(r,p.id);clients.delete(p.id);}},30000);p.disconnectTimer.unref();}});return;
 }
 if(req.method!=='POST')fail('Route inconnue',404);
 if(req.headers.origin&&!['http://'+req.headers.host,'https://'+req.headers.host].includes(req.headers.origin))fail('Origine refusée',403);
 let body='';for await(const c of req){body+=c;if(body.length>16384)fail('Requête trop grande',413);}let b;try{b=JSON.parse(body||'{}');}catch{fail('JSON invalide');}if(!b||typeof b!=='object'||Array.isArray(b))fail('Requête invalide');
 if(['/api/create','/api/join'].includes(url.pathname)){
 let r;if(url.pathname==='/api/create'){if(rooms.size>=500)fail('Serveur plein',429);let code;do{code=randomBytes(4).toString('hex').slice(0,6).toUpperCase();}while(rooms.has(code));const game=games.some(g=>g.id===b.game)?b.game:'quiz';r={code,game,settings:validateSettings(game,b.settings||{}),history:[],players:[],phase:'lobby',round:0,created:Date.now(),store,contentHistory};rooms.set(code,r);}else{r=rooms.get(String(b.code).trim().toUpperCase());if(!r)fail('Ce code de salon est introuvable.',404);if(r.players.length>=12)fail('Salon complet (12 joueurs).',409);}
 const p={id:uid(),token:uid(),profileId:typeof b.profileId==='string'&&/^[a-zA-Z0-9-]{16,80}$/.test(b.profileId)?b.profileId:uid(),name:clean(b.name),color:r.players.length,online:false,waitingForNext:r.phase!=='lobby',score:0,total:0};r.players.push(p);r.host||=p.id;notify(r);return send(res,{token:p.token,playerId:p.id,room:snapshot(r,p)});
 }
 const r=[...rooms.values()].find(r=>r.players.some(p=>p.token===b.token));if(!r){if(['/api/resume','/api/poll'].includes(url.pathname))return send(res,{expired:true});fail('Session expirée.',401);}const p=r.players.find(p=>p.token===b.token);
 if(url.pathname==='/api/resume')return send(res,{playerId:p.id,room:snapshot(r,p)});
 if(url.pathname==='/api/poll'){const changed=!p.online;p.pollAt=Date.now();p.online=true;clearTimeout(p.disconnectTimer);if(changed)notify(r);return send(res,{playerId:p.id,room:snapshot(r,p)});}
 if(['/api/answer','/api/clue','/api/ballot','/api/draw'].includes(url.pathname)&&((b.round!==undefined&&b.round!==r.round)||(b.matchId!==undefined&&b.matchId!==r.matchId)))fail('Cette action appartient à une ancienne manche.',409);
 const host=()=>{if(p.id!==r.host)fail('Seul l’hôte peut effectuer cette action.',403);};
 const replayIfUnanimous=()=>{const voters=r.players.filter(x=>!x.waitingForNext);if(r.phase==='results'&&voters.length>=(games.find(g=>g.id===r.lastGame)?.minPlayers||1)&&voters.every(x=>x.online&&x.next==='replay')){r.game=r.lastGame;r.settings={...r.lastSettings};engine.begin(r);return true;}return false;};
 switch(url.pathname){
 case '/api/skip':host();if((b.round!==undefined&&b.round!==r.round)||(b.matchId!==undefined&&b.matchId!==r.matchId)||(b.timerVersion!==undefined&&b.timerVersion!==r.timerVersion))fail('Ce délai a déjà changé.',409);try{engine.skip(r,b.step);}catch(e){e.status=409;throw e;}return send(res,{ok:true});
 case '/api/name':p.name=clean(b.name);break;
 case '/api/leave':remove(r,p.id);return send(res,{ok:true});
 case '/api/configure':host();if(!['lobby','results'].includes(r.phase))fail('Attendez la fin de la partie.',409);{const settings=validateSettings(b.game,b.settings);if(b.launch){const old={game:r.game,settings:r.settings};try{r.game=b.game;r.settings=settings;engine.begin(r);}catch(e){Object.assign(r,old);throw e;}return send(res,{ok:true});}r.settings=settings;r.game=b.game;}break;
 case '/api/vote':if(!p.waitingForNext&&!['lobby','results'].includes(r.phase)||!games.some(g=>g.id===b.game))fail('Vote indisponible.',409);p.vote=b.game;p.next=r.phase==='results'&&b.game===r.lastGame?'replay':null;if(replayIfUnanimous())return send(res,{ok:true});break;
 case '/api/next':if(r.phase!=='results'||!['replay','lobby'].includes(b.choice))fail('Vote indisponible.',409);if(b.choice==='lobby'){p.resultsLobbyMatchId=r.matchId;break;}p.next=b.choice;p.vote=r.lastGame;if(replayIfUnanimous())return send(res,{ok:true});break;
 case '/api/lobby':if(r.phase==='results'){p.resultsLobbyMatchId=r.matchId;break;}host();engine.lobby(r);return send(res,{ok:true});
 case '/api/start':{
 host();if(!['lobby','results'].includes(r.phase))fail('Partie en cours.',409);const old={game:r.game,settings:r.settings};
 try{if(b.source==='vote'||b.source==='game-vote'){let choices=recommendation(r).choices;if(b.source==='game-vote'){const counts={};for(const player of r.players.filter(p=>p.online&&p.vote))counts[player.vote]=(counts[player.vote]||0)+1;const high=Math.max(0,...Object.values(counts));choices=Object.keys(counts).filter(id=>counts[id]===high);}if(!choices.length)fail('Aucun vote à valider.',409);const choice=choices[randomInt(choices.length)];if(choice==='lobby'){engine.lobby(r);return send(res,{ok:true});}r.game=choice==='replay'?r.lastGame:choice;r.settings=r.phase==='results'&&r.game===r.lastGame?{...r.lastSettings}:defaultSettings(r.game);}else if(b.source==='replay'){if(!r.lastGame)fail('Aucune partie précédente.');r.game=r.lastGame;r.settings={...r.lastSettings};}else if(b.source&&b.source!=='selected')fail('Choix invalide.');engine.begin(r);}catch(e){r.game=old.game;r.settings=old.settings;throw e;}return send(res,{ok:true});
 }
 case '/api/answer':try{engine.answer(r,p,b.value);}catch(e){e.status=/déjà|terminée/.test(e.message)?409:400;throw e;}break;
 case '/api/clue':engine.clue(r,p,b.value);break;
 case '/api/ballot':engine.ballot(r,p,b.id);break;
 case '/api/draw':{
 const q=r.question;if(r.phase!=='playing'||r.game!=='draw'||q.drawer!==p.id||Date.now()>q.deadline)fail('Dessin indisponible.',403);
 if(b.clear===true){q.strokes=[];q.pointCount=0;break;}
 const s=b.stroke;if(!s||typeof s.id!=='string'||s.id.length>80||!Array.isArray(s.points)||s.points.length<1||s.points.length>64||!['#242333','#f4f0e7','#ae80e8','#e47277','#65b4e2','#70b888','#edb85e'].includes(s.color)||typeof s.width!=='number'||s.width<1||s.width>15)fail('Trait invalide.');
 if(q.strokes.length>=1500||q.pointCount+s.points.length>18000)fail('La toile est pleine. Effacez-la pour continuer.',409);
 const points=s.points.map(point=>{if(!Array.isArray(point)||point.length!==2||point.some(n=>typeof n!=='number'||!Number.isFinite(n)||n<0||n>1))fail('Coordonnée invalide.');return point.map(n=>Math.round(n*1000)/1000);});
 if(q.strokes.some(x=>x.id===s.id))return send(res,{ok:true});q.strokes.push({id:s.id,color:s.color,width:s.width,points});q.pointCount+=points.length;break;
 }
 default:fail('Route inconnue',404);
 }
 notify(r);send(res,{ok:true});
 }
 const server=http.createServer(async(req,res)=>{try{const url=new URL(req.url,'http://localhost');if(url.pathname.startsWith('/api/'))return await api(req,res,url);let rel=decodeURIComponent(url.pathname);if(rel==='/')rel='/index.html';const file=path.resolve(root,'.'+rel);if(!file.startsWith(root+path.sep))fail('Interdit',403);const bytes=await readFile(file);res.writeHead(200,{'Content-Type':({'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8','.svg':'image/svg+xml','.png':'image/png','.ico':'image/x-icon','.webmanifest':'application/manifest+json'})[path.extname(file)]||'application/octet-stream','Cache-Control':'no-cache','X-Content-Type-Options':'nosniff'});res.end(bytes);}catch(e){if(!res.headersSent)send(res,{error:e.code==='ENOENT'?'Fichier introuvable':e.message||'Erreur serveur'},e.status||(e.code==='ENOENT'?404:400));else res.end();}});
 server.flushPersistence=async()=>{await store.snapshot();await contentHistory.flush();};
 server.on('close',()=>{clearInterval(cleanup);for(const r of rooms.values()){clearTimeout(r.timer);r.players.forEach(p=>clearTimeout(p.disconnectTimer));}});return server;
}
if(process.argv[1]===fileURLToPath(import.meta.url)){const port=Number(process.env.PORT)||3000;createServer().listen(port,'0.0.0.0',()=>{console.log(`\nDAILYZEOO → http://localhost:${port}`);for(const face of Object.values(os.networkInterfaces()).flat())if(face.family==='IPv4'&&!face.internal)console.log(`Réseau local → http://${face.address}:${port}`);console.log('Ctrl+C pour arrêter.');});}
