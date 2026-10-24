import {test} from 'node:test';
import assert from 'node:assert/strict';
import {mkdtemp,rm} from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import {createRankingStore} from '../ranking-store.js';
test('palmarès : cumul, égalités, renommage et rechargement depuis le disque',async()=>{const dir=await mkdtemp(path.join(os.tmpdir(),'daily-ranking-'));try{const store=createRankingStore(dir);await store.record([{profileId:'a',name:'Alice',score:1200,winner:true},{profileId:'b',name:'Bob',score:900,winner:false}]);await store.record([{profileId:'a',name:'Alice nouvelle',score:500,winner:false},{profileId:'b',name:'Bob',score:1000,winner:true}]);const ranks=await store.snapshot();assert.equal(ranks[0].name,'Bob');assert.equal(ranks[0].points,1900);assert.equal(ranks[0].wins,1);assert.equal(ranks[0].played,2);assert.equal(ranks[1].name,'Alice nouvelle');assert.equal(ranks[1].points,1700);assert.equal(ranks[1].best,1200);assert.ok(ranks.every(r=>!('id'in r)));assert.deepEqual(await createRankingStore(dir).snapshot(),ranks);}finally{await rm(dir,{recursive:true,force:true});}});
