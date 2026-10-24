// Only this time-budgeted mask crosses the wire. Guesses never reveal letters.
export function drawingMask(q,now=Date.now()){
 const chars=[...q.correct],positions=chars.flatMap((c,i)=>/[A-Z]/.test(c)?[i]:[]),budget=Math.floor(positions.length/4),progress=Math.max(0,Math.min(1,(now-q.start)/Math.max(1,q.deadline-q.start))),count=Math.min(budget,Math.floor(progress*(budget+1))),seed=chars.reduce((s,c)=>s+c.charCodeAt(0),0);
 positions.sort((a,b)=>Math.sin((a+1)*127.1+seed)*43758%1-Math.sin((b+1)*127.1+seed)*43758%1);const visible=new Set(positions.slice(0,count));return chars.map((c,i)=>!/[A-Z]/.test(c)||visible.has(i)?c:'_');
}
