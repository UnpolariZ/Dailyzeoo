import {startBurn,BURN_MS} from './burn.js';
export const INTRO_MS=2800;
export const EXIT_MS=BURN_MS+100;
export function startBrandIntro({eligible=true}={}){
 const root=document.documentElement,overlay=document.querySelector('#brand-intro');if(!overlay||!eligible){root.classList.remove('intro-pending');overlay?.remove();return{ready(){},finish(){}};}
 let done=false,ready=false,elapsed=false,frame,timer,guard,exitTimer,exiting=false,burn=null;const inertNodes=[...document.querySelectorAll('body>header,body>main,body>footer')],prior=inertNodes.map(n=>n.inert);overlay.hidden=false;root.classList.remove('intro-pending');root.classList.add('intro-playing');inertNodes.forEach(n=>n.inert=true);const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;overlay.classList.toggle('intro-reduced',reduced);
 function finish(){if(done)return;done=true;clearTimeout(timer);clearTimeout(guard);clearTimeout(exitTimer);burn?.dispose();cancelAnimationFrame(frame);root.classList.remove('intro-playing','intro-pending','intro-revealing');inertNodes.forEach((n,i)=>n.inert=prior[i]);document.removeEventListener('keydown',key);document.removeEventListener('visibilitychange',visibility);window.removeEventListener('pagehide',finish);overlay.remove();}
 function exit(){if(done||exiting)return;if(reduced){finish();return;}exiting=true;overlay.classList.remove?.('intro-waiting');burn=startBurn(overlay);overlay.classList.add?.('intro-burning');root.classList.add('intro-revealing');exitTimer=setTimeout(finish,EXIT_MS);}
 function key(e){if(e.key==='Escape'){e.preventDefault();finish();}}
 function visibility(){if(document.hidden)finish();}
 overlay.querySelector('#skip-intro').onclick=finish;document.addEventListener('keydown',key);document.addEventListener('visibilitychange',visibility);window.addEventListener('pagehide',finish);
 if(document.hidden){finish();return{ready(){},finish};}
 const canvas=overlay.querySelector('canvas'),ctx=canvas?.getContext('2d');if(ctx&&!reduced){const ratio=Math.min(devicePixelRatio||1,1.5),w=innerWidth,h=innerHeight;canvas.width=w*ratio;canvas.height=h*ratio;ctx.scale(ratio,ratio);const stars=Array.from({length:110},(_,i)=>({angle:i*2.399963,z:(i%37)/37,r:(i%7)/7}));const began=performance.now();function draw(now){if(done)return;const t=(now-began)/1000,burst=1+Math.min(1.2,Math.max(0,t-3.15)*.5);ctx.clearRect(0,0,w,h);for(const s of stars){const depth=(s.z+t*.17)%1,r=depth*depth*Math.max(w,h)*.8*burst,x=w/2+Math.cos(s.angle)*r,y=h*.44+Math.sin(s.angle)*r*.65;ctx.strokeStyle=s.r>.5?'rgba(191,255,120,'+(depth*.65)+')':'rgba(194,165,255,'+(depth*.5)+')';ctx.lineWidth=depth*1.5+.2;ctx.beginPath();ctx.moveTo(x,y);ctx.lineTo(x+Math.cos(s.angle)*(2+depth*14*burst),y+Math.sin(s.angle)*(2+depth*9*burst));ctx.stroke();}frame=requestAnimationFrame(draw);}frame=requestAnimationFrame(draw);}
 timer=setTimeout(()=>{elapsed=true;if(ready)exit();else{overlay.classList.add?.('intro-waiting');overlay.querySelector('.intro-status').textContent='PRÉPARATION DE L’ARCADE…';}},reduced?650:INTRO_MS);guard=setTimeout(finish,8000);
 return{ready(){ready=true;if(elapsed)exit();},finish};
}
