// React on contact, never on the release-generated click.
export function bindReflexInput(button,submit){
 const press=e=>{if(button.disabled||e.button!==0||e.isPrimary===false)return;e.preventDefault();submit();};
 const key=e=>{if(button.disabled||e.repeat||![' ','Enter'].includes(e.key))return;e.preventDefault();submit();};
 const click=e=>{e.preventDefault();if(!button.disabled&&e.detail===0&&!e.pointerType)submit();};
 button.onpointerdown=press;button.onkeydown=key;button.onclick=click;
 return()=>{button.onpointerdown=button.onkeydown=button.onclick=null;};
}
