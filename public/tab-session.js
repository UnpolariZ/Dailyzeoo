// Duplicating a tab copies sessionStorage: reserve both the token and the testing profile.
async function reserve(key,{locks,channelFactory,uuid,probeMs}){
 if(locks?.request)return new Promise(resolve=>{locks.request('daily-owner-'+key,{ifAvailable:true},async lock=>{if(!lock){resolve({owned:false,release(){}});return;}await new Promise(done=>resolve({owned:true,release:done}));}).catch(()=>resolve({owned:false,release(){}}));});
 try{const channel=channelFactory('daily-owner-'+key),id=uuid(),peers=new Set([id]);let occupied=false,owned=false;channel.onmessage=e=>{const m=e.data;if(m.id===id)return;if(m.type==='probe'&&owned)channel.postMessage({type:'owner',id});if(m.type==='owner')occupied=true;if(!owned&&(m.type==='probe'||m.type==='claim'))peers.add(m.id);};channel.postMessage({type:'probe',id});await new Promise(r=>setTimeout(r,probeMs));if(!occupied){channel.postMessage({type:'claim',id});await new Promise(r=>setTimeout(r,probeMs));}owned=!occupied&&[...peers].sort()[0]===id;if(!owned)channel.close();return{owned,release:()=>channel.close()};}catch{return{owned:false,release(){}};}
}
export async function claimTabSession({storage,locks=globalThis.navigator?.locks,channelFactory=name=>new BroadcastChannel(name),uuid=()=>crypto.randomUUID(),probeMs=100}={}){
 const options={locks,channelFactory,uuid,probeMs},releases=[];let token=storage.getItem('daily-token'),playerId=storage.getItem('daily-player'),profileId=storage.getItem('daily-profile-id')||uuid(),forked=false;
 if(token){const claim=await reserve('player-'+token,options);if(claim.owned)releases.push(claim.release);else{forked=true;token=null;playerId=null;profileId=uuid();storage.removeItem('daily-token');storage.removeItem('daily-player');}}
 let profileClaim=await reserve('profile-'+profileId,options);if(!profileClaim.owned){forked=true;profileId=uuid();profileClaim=await reserve('profile-'+profileId,options);}if(profileClaim.owned)releases.push(profileClaim.release);storage.setItem('daily-profile-id',profileId);
 return{token,playerId,profileId,forked,release(){for(const release of releases)release();}};
}
