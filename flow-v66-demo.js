(()=>{
let running=false,step=1;
const q=id=>document.getElementById(id);
const labels=['Planificar','Sincronizar','Preparar','En vivo','Generar acta','Firmar','Cerrar'];
function refresh(){
  const b=q('globalDemo');
  if(!b)return;
  b.textContent=running?`Siguiente · ${step}/7`:'▶ Iniciar demo';
  b.classList.toggle('primary',running);b.classList.toggle('secondary',!running);
}
function start(){running=true;step=1;window.ACTAFlow66?.go(1);refresh();window.toast&&window.toast('Demo iniciada: selecciona una reunión y avanza con un solo botón.')}
function next(){
  if(!running){start();return}
  if(step>=7){running=false;step=1;window.ACTAFlow66?.go(1);refresh();window.toast&&window.toast('Demo finalizada.');return}
  step+=1;window.ACTAFlow66?.go(step);refresh();
  if(step===2) setTimeout(()=>q('syncBtn66')?.click(),250);
  if(step===3) window.prepareMeeting&&window.prepareMeeting(window.currentMeetingId||'m1');
}
function mount(){
  const b=q('globalDemo'); if(b&&!b.dataset.demoSimple){b.dataset.demoSimple=1;b.onclick=next;refresh()}
  const landing=q('landingDemo'); if(landing&&!landing.dataset.demoSimple){landing.dataset.demoSimple=1;landing.onclick=()=>{q('demoLogin')?.click();setTimeout(start,250)}}
  const hero=q('heroDemo'); if(hero&&!hero.dataset.demoSimple){hero.dataset.demoSimple=1;hero.onclick=()=>{q('demoLogin')?.click();setTimeout(start,250)}}
}
function boot(){mount();setInterval(mount,1200)}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot);else boot();
window.ACTADemo66={start,next,stop:()=>{running=false;step=1;refresh()}};
})();