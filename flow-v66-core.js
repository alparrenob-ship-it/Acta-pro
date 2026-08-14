(()=>{
const S=[['Planificar','meetings'],['Sincronizar','dashboard'],['Preparar','live'],['En vivo','live'],['Acta','acts'],['Firma','acts'],['Cierre','archive']];
let step=+(localStorage.getItem('actaProFlow66')||1);
const q=id=>document.getElementById(id);
function show(v){window.showView&&window.showView(v)}
function paint(){
  document.querySelectorAll('.flow66-step').forEach((b,i)=>{
    const n=i+1;
    b.classList.toggle('active',n===step);
    b.classList.toggle('done',n<step);
    const num=b.querySelector('.num'); if(num) num.textContent=n<step?'✓':n;
  });
  const sync=q('sync66'); if(sync) sync.classList.toggle('hidden',step!==2);
}
function set(n){step=Math.max(1,Math.min(7,n));localStorage.setItem('actaProFlow66',step);paint()}
function mount(){
  const top=document.querySelector('.topbar');
  if(!top)return;
  if(!q('flow66')){
    const w=document.createElement('div');
    w.id='flow66';w.className='flow66';
    w.innerHTML=`<div class="flow66-head"><div><strong>Demo ACTA PRO</strong><br><small>Un recorrido simple: agenda → reunión → acta → firma</small></div><button id="flowReset66" class="ghost">Reiniciar</button></div><div class="flow66-steps">${S.map((s,i)=>`<div class="flow66-step"><span class="num">${i+1}</span><b>${s[0]}</b><span></span></div>`).join('')}</div>`;
    top.insertAdjacentElement('afterend',w);
    q('flowReset66').onclick=()=>{set(1);show('meetings')};
  }
  mountSync();paint();
}
function mountSync(){
  const d=q('dashboard'); if(!d||q('sync66'))return;
  const x=document.createElement('div');x.id='sync66';x.className='sync66 hidden';
  x.innerHTML='<span class="eyebrow">PASO 2</span><h3>Sincronizar datos</h3><p>Calendar + Runachay preparan automáticamente la ficha de la reunión.</p><div class="sync66-grid"><div class="sync66-service"><b>📅 Calendar</b><div class="sync66-bar"><div id="cal66"></div></div></div><div class="sync66-service"><b>🔗 Runachay</b><div class="sync66-bar"><div id="run66"></div></div></div></div><button id="syncBtn66" class="primary" style="margin-top:12px">Sincronizar</button> <span id="syncRes66" class="small muted"></span>';
  d.insertBefore(x,d.children[1]||null);
  q('syncBtn66').onclick=()=>{
    q('syncRes66').textContent='Sincronizando…';q('cal66').style.width='45%';q('run66').style.width='30%';
    setTimeout(()=>{q('cal66').style.width='100%';q('run66').style.width='100%';q('syncRes66').textContent='✓ Datos listos';set(3);window.prepareMeeting&&window.prepareMeeting(window.currentMeetingId||'m1')},700)
  };
}
function hooks(){
  const navMap={meetings:1,dashboard:2,live:3,acts:5,archive:7};
  document.querySelectorAll('.nav[data-view]').forEach(b=>{if(!b.dataset.flow66){b.dataset.flow66=1;b.addEventListener('click',()=>{const n=navMap[b.dataset.view];if(n)set(n)})}});
  [['createMeetingBtn',2],['startLiveBtn',4],['finishLiveBtn',5],['goSignBtn',6]].forEach(([id,n])=>{const b=q(id);if(b&&!b.dataset.flow66){b.dataset.flow66=1;b.addEventListener('click',()=>setTimeout(()=>set(n),150))}});
  const sim=q('simulateConversation');if(sim){sim.textContent='🎙 Cargar conversación demo';sim.title='Genera una conversación de ejemplo para la demostración'}
}
function boot(){mount();hooks();setInterval(hooks,1200)}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot);else boot();
window.ACTAFlow66={set,steps:S,go:n=>{set(n);show(S[n-1]?.[1]||'dashboard')}};
})();