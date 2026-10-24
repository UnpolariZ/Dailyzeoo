import {mkdir,readFile,writeFile,rename} from 'node:fs/promises';
import path from 'node:path';
export function createRankingStore(directory){
 const file=path.join(directory,'leaderboard.json');let rows=new Map(),queue=Promise.resolve();
 const ready=(async()=>{try{const data=JSON.parse(await readFile(file,'utf8'));if(Array.isArray(data))rows=new Map(data.filter(r=>typeof r.id==='string').map(r=>[r.id,r]));}catch(e){if(e.code!=='ENOENT')console.warn('Classement non chargé :',e.message);}})();
 return {
  record(players){queue=queue.then(async()=>{await ready;for(const p of players){const row=rows.get(p.profileId)||{id:p.profileId,name:p.name,points:0,wins:0,played:0,best:0};Object.assign(row,{name:p.name,points:row.points+p.score,wins:row.wins+(p.winner?1:0),played:row.played+1,best:Math.max(row.best,p.score),updated:Date.now()});rows.set(p.profileId,row);}await mkdir(directory,{recursive:true});await writeFile(file+'.tmp',JSON.stringify([...rows.values()],null,2));await rename(file+'.tmp',file);}).catch(e=>console.warn('Classement non enregistré :',e.message));return queue;},
  async snapshot(){await ready;await queue;return [...rows.values()].sort((a,b)=>b.points-a.points||b.wins-a.wins||a.name.localeCompare(b.name)).slice(0,100).map(({id,...row},i)=>({...row,rank:i+1}));}
 };
}
