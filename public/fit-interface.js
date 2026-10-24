// Fit natural content inside the available card. It cannot overlap its neighbours or scroll.
export function fittedScale(width,height,naturalHeight){return width>0&&height>0&&naturalHeight>0?Math.min(1,height/naturalHeight):1;}
export function fitInterface(container,inner){
 if(!container||!inner)return{update(){},dispose(){}};let frame,disposed=false;
 function fit(){frame=null;if(disposed||!container.isConnected)return;const w=container.clientWidth,h=container.clientHeight;if(!w||!h)return;inner.style.transform='none';inner.style.width='100%';let scale=fittedScale(w,h,inner.scrollHeight);for(let i=0;i<3&&scale<1;i++){inner.style.width=(100/scale)+'%';scale=Math.min(scale,h/Math.max(1,inner.scrollHeight));}inner.style.width=(100/scale)+'%';inner.style.transform=`scale(${scale})`;inner.dataset.fitScale=String(scale);}
 function update(){if(!disposed&&!frame)frame=requestAnimationFrame(fit);}
 const resize=typeof ResizeObserver!=='undefined'?new ResizeObserver(update):null;resize?.observe(container);const mutation=typeof MutationObserver!=='undefined'?new MutationObserver(update):null;mutation?.observe(inner,{childList:true,subtree:true,characterData:true});window.addEventListener('resize',update);update();return{update,dispose(){disposed=true;cancelAnimationFrame(frame);resize?.disconnect();mutation?.disconnect();window.removeEventListener('resize',update);}};
}
