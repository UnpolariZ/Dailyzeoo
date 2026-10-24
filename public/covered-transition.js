// Change the scene only after the curtain fully covers the previous view.
export function createCoveredTransition({cover,swap,reveal,finish,coverMs=220,revealMs=400}){
 let active=false,coveredTimer,revealTimer;
 function cancel(){clearTimeout(coveredTimer);clearTimeout(revealTimer);if(!active)return;active=false;finish();}
 return{get active(){return active;},start(){if(active)return;active=true;cover();coveredTimer=setTimeout(()=>{try{swap();reveal();revealTimer=setTimeout(cancel,revealMs);}catch(error){cancel();throw error;}},coverMs);},cancel};
}
