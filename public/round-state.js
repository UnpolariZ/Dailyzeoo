// Pure shared presentation rules: the host skips the current step, never an unseen next one.
export function skipStep(room,now=Date.now()){
 if(room.phase==='countdown')return 'countdown';if(room.phase==='reveal')return 'reveal';if(room.phase!=='playing')return null;
 const q=room.question;if(room.game==='impostor')return q.stage;
 if(room.game==='memory'&&now<q.watchUntil)return 'watch';
 if(room.game==='reflex'&&now<q.start)return 'signal';return 'round';
}
export const skipLabels={countdown:'Passer le décompte',reveal:'Passer à la suite',clues:'Passer aux votes',ballots:'Clôturer le vote',watch:'Passer l’observation',signal:'Déclencher le signal',round:'Clôturer la manche'};
export function resultText(room){
 if((room.lastGame||room.game)==='impostor'){
  if(['innocents','impostors'].includes(room.outcome?.camp)){
   const names=room.players.filter(p=>room.outcome.winnerIds?.includes(p.id)).map(p=>p.name);
   const roster=names.length>1?names.slice(0,-1).join(', ')+' et '+names.at(-1):names[0];
   return{title:room.outcome.camp==='innocents'?'Les innocents ont gagné !':'Les imposteurs ont gagné !',detail:roster?`${roster} ${names.length>1?'remportent':'remporte'} cette partie.`:'Victoire de ce camp.'};
  }
  return{title:'Partie interrompue',detail:'Aucun camp gagnant pour cette partie.'};
 }
 const sorted=[...room.players].sort((a,b)=>b.score-a.score),winners=sorted.filter(p=>p.score===sorted[0]?.score);
 return{title:winners.length===1?`${winners[0].name}. Bien joué.`:'Égalité. Respect.',detail:winners.length===1?'La couronne est à vous. Pour l’instant.':winners.map(p=>p.name).join(', ')+' se partagent la couronne.'};
}
