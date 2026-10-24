import {readFileSync,mkdirSync} from 'node:fs';
import {writeFile,rename} from 'node:fs/promises';
import path from 'node:path';
import {createHash,randomInt} from 'node:crypto';
export function createContentHistory(directory){mkdirSync(directory,{recursive:true});const file=path.join(directory,'content-history.json');let seen={};try{const parsed=JSON.parse(readFileSync(file,'utf8'));if(parsed&&typeof parsed==='object'&&!Array.isArray(parsed))seen=parsed;}catch{}let queue=Promise.resolve(),counter=Object.values(seen).reduce((n,v)=>Math.max(n,Number(v)||0),0);const cache=new Map();const hash=value=>{if(!cache.has(value))cache.set(value,createHash('sha256').update(JSON.stringify(value)).digest('hex'));return cache.get(value);};
 function pick(pool){const keys=pool.map(hash);let oldest=Infinity,candidates=[];keys.forEach((key,i)=>{const at=seen[key]||0;if(at<oldest){oldest=at;candidates=[i];}else if(at===oldest)candidates.push(i);});const index=candidates[randomInt(candidates.length)];seen[keys[index]]=++counter;const json=JSON.stringify(seen);queue=queue.catch(()=>{}).then(async()=>{await writeFile(file+'.tmp',json);await rename(file+'.tmp',file);});queue.catch(()=>{});return pool[index];}
 return{pick,flush:()=>queue};}
