// Hold, never toggle: releasing, leaving the window or changing tabs hides the secret.
export function bindHoldReveal(button,{doc=document,win=window}={}){
 let pointer=null,key=null;const listeners=[];
 const on=(node,type,fn)=>{node.addEventListener(type,fn);listeners.push(()=>node.removeEventListener(type,fn));};
 function hide(){pointer=null;key=null;button.classList.remove('is-revealed');}
 on(button,'pointerdown',e=>{if(e.button!==0||button.disabled)return;e.preventDefault();pointer=e.pointerId;button.classList.add('is-revealed');try{button.setPointerCapture(e.pointerId);}catch{}});
 on(win,'pointerup',e=>{if(e.pointerId===pointer)hide();});on(win,'pointercancel',hide);on(button,'lostpointercapture',hide);
 on(button,'keydown',e=>{if(button.disabled||![' ','Enter'].includes(e.key))return;e.preventDefault();key=e.key;button.classList.add('is-revealed');});
 on(win,'keyup',e=>{if(e.key===key)hide();});on(button,'blur',hide);on(win,'blur',hide);on(doc,'visibilitychange',hide);on(button,'contextmenu',e=>e.preventDefault());
 return()=>{hide();listeners.forEach(remove=>remove());};
}
