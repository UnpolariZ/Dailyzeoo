// Shared semantics for the round verdict; a positive partial score is not an exact answer.
export function roundOutcome(room,viewer){
 const q=room.question;if(room.phase!=='reveal'||!q)return null;
 if(q.cancelled)return{kind:'neutral',label:'Manche annulée',detail:'Aucun point attribué.'};
 const v=q.verdict;if(!v)return null;if(v.kind==='neutral')return{kind:'neutral',label:'Le débat continue',detail:q.reveal};
 const labels={success:'Bonne réponse !',failure:viewer?.answer?'Réponse incorrecte':'Pas de réponse correcte',partial:'Résultat partiel'};
 if(room.game==='reflex')return{...v,label:v.kind==='success'?'Meilleur temps !':v.falseStart?'Faux départ !':v.reactionMs!==undefined?'Un autre joueur a été plus rapide':'Pas de clic à temps',detail:`${v.reactionMs!==undefined?'Votre temps : '+v.reactionMs+' ms · ':''}${v.bestMs!==undefined?'Record de la manche : '+v.bestMs+' ms · ':''}+${viewer?.delta||0} points`};
 if(room.game==='memory')return{...v,label:v.kind==='success'?'Combinaison correcte !':'Combinaison incorrecte',detail:`${v.matches} / ${q.length} positions correctes · +${viewer?.delta||0} points`};
 if(room.game==='estimate')return{...v,label:v.kind==='success'?'Estimation exacte !':'Votre estimation',detail:`${v.submission??'Aucune réponse'} · cible : ${q.reveal} · +${viewer?.delta||0} points`};
 if(room.game==='impostor')return{...v,label:v.kind==='success'?'Votre camp gagne !':'Votre camp a perdu',detail:`+${viewer?.delta||0} points`};
 return{...v,label:labels[v.kind],detail:`${v.submission!==undefined?'Votre réponse : '+v.submission+' · ':''}+${viewer?.delta||0} points`};
}
