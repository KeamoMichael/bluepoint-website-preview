(() => {
const toggle=document.querySelector('.mobile-menu-toggle');
const menu=document.querySelector('.mobile-navigation');
function close(){menu.hidden=true;toggle.setAttribute('aria-expanded','false');toggle.textContent='Menu';}
toggle.addEventListener('click',()=>{const open=toggle.getAttribute('aria-expanded')!=='true';menu.hidden=!open;toggle.setAttribute('aria-expanded',String(open));toggle.textContent=open?'Close':'Menu';});
menu.querySelectorAll('a').forEach(link=>link.addEventListener('click',close));
document.addEventListener('keydown',event=>{if(event.key==='Escape'&&!menu.hidden){close();toggle.focus();}});
window.matchMedia('(min-width:761px)').addEventListener('change',event=>{if(event.matches)close();});
})();
