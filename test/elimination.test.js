import {test} from 'node:test';
import assert from 'node:assert/strict';
import {currentElimination,createEliminationTracker,eliminationMarkup} from '../public/elimination.js';

test('élimination : distingue le joueur désigné des anciens éliminés et des survivants',()=>{
 const results=[{id:'old',accused:false,impostor:true},{id:'new',name:'Léa',accused:true,impostor:false,votes:3},{id:'survivor',accused:false}];
 assert.deepEqual(currentElimination({results}),{id:'new',name:'Léa',impostor:false,role:'Innocent',votes:3});
 assert.equal(currentElimination({results:results.filter(p=>!p.accused)}),null);
});
test('annonce personnelle : une fois par élimination, uniquement pendant la révélation',()=>{
 const tracker=createEliminationTracker(),room={game:'impostor',phase:'playing',matchId:'m1',round:1,question:{results:[{id:'a',name:'Alice',impostor:true,accused:true}]}};
 assert.equal(tracker.update(room),null);
 room.phase='reveal';assert.equal(tracker.update(room).id,'a');assert.equal(tracker.update(room),null);
 room.round=2;room.question.results[0].accused=false;assert.equal(tracker.update(room),null);
 room.question.results.push({id:'b',name:'Bob',accused:true});assert.equal(tracker.update(room).id,'b');assert.equal(tracker.update(room),null);
 room.matchId='m2';assert.equal(tracker.update(room).id,'b');
 room.game='quiz';assert.equal(tracker.update(room),null);
});
test('verdict public : rôle explicite et pseudo échappé',()=>{
 const innocent=eliminationMarkup({name:'<Alice>',role:'Innocent',impostor:false});
 assert.match(innocent,/&lt;Alice&gt;/);assert.match(innocent,/UN INNOCENT A ÉTÉ ÉLIMINÉ/);assert.match(innocent,/<strong>INNOCENT<\/strong>/);
 const impostor=eliminationMarkup({name:'Bob',role:'Imposteur',impostor:true});
 assert.match(impostor,/IMPOSTEUR DÉMASQUÉ/);assert.match(impostor,/<strong>IMPOSTEUR<\/strong>/);
});
