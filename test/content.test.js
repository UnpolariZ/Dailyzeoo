import {test} from 'node:test';
import assert from 'node:assert/strict';
import {mkdtemp,rm} from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import {createContentHistory} from '../content-history.js';
import {words,drawingWords,wordPairs,quizPools,estimatePools} from '../games.js';
test('historique persistant : aucune répétition avant épuisement, même après redémarrage',async()=>{const dir=await mkdtemp(path.join(os.tmpdir(),'daily-content-'));try{const pool=['CHAT','CHIEN','LAPIN','TIGRE'],a=createContentHistory(dir),first=a.pick(pool);await a.flush();const b=createContentHistory(dir),rest=[b.pick(pool),b.pick(pool),b.pick(pool)];assert.equal(new Set([first,...rest]).size,4);assert.equal(b.pick(pool),first);await b.flush();}finally{await rm(dir,{recursive:true,force:true});}});
test('banques : variété, mots valides et questionnaires à choix distincts',()=>{assert.ok(words.length>1000);assert.ok(drawingWords.hard.length>10000);assert.ok(wordPairs.normal.length>400);assert.ok(estimatePools.hard.length>20000);assert.ok(words.every(w=>/^[A-Z]{3,18}$/.test(w)));assert.equal(new Set(words).size,words.length);for(const pool of Object.values(quizPools))for(const [title,options,answer]of pool){assert.ok(title.length>5);assert.equal(new Set(options).size,4,title);assert.ok(Number.isInteger(answer)&&answer>=0&&answer<4);}for(const pool of Object.values(drawingWords))assert.ok(pool.every(s=>s.length<=60));});

test('Sketch normal : uniquement des noms de trois mots maximum ; difficile : mots et scènes variés',()=>{assert.ok(drawingWords.normal.length>700);assert.ok(drawingWords.normal.every(s=>s.split(/\s+/).length<=3&&!s.includes(' QUI ')));assert.ok(drawingWords.normal.includes('FER A CHEVAL'));assert.ok(drawingWords.hard.length>20000);assert.ok(drawingWords.hard.some(s=>s.includes(' QUI ')));assert.ok(drawingWords.hard.some(s=>!s.includes(' ')));});
