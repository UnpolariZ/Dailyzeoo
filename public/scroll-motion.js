// Accumulate wheel input in a destination rather than restarting native smooth scrolls.
export function createScrollMotion({read,write,max,reduced=false,request=fn=>requestAnimationFrame(fn),cancel=id=>cancelAnimationFrame(id)}){
 let target=read(),frame=null,last=null,direction=0;
 const clamp=n=>Math.max(0,Math.min(max(),n));
 function stop(){if(frame!==null)cancel(frame);frame=null;last=null;direction=0;target=read();}
 function tick(now){const dt=last===null?16:Math.min(50,Math.max(1,now-last));last=now;target=clamp(target);const current=read(),distance=target-current;if(Math.abs(distance)<.5){write(target);frame=null;last=null;direction=0;return;}write(current+distance*(1-Math.exp(-dt/65)));frame=request(tick);}
 function to(value){target=clamp(value);if(reduced){write(target);return;}if(frame===null){last=null;frame=request(tick);}}
 return{add(delta){if(!Number.isFinite(delta)||!delta)return;const nextDirection=Math.sign(delta);if(frame===null||direction&&nextDirection!==direction)target=read();direction=nextDirection;to(target+delta);},to,stop,get active(){return frame!==null;}};
}
