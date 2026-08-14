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

/* ACTA PRO v7.0 · Revisión del lenguaje antes de la aprobación */
(()=>{
  const esc=s=>String(s??'').replace(/[&<>"']/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[m]));
  const plain=s=>String(s||'').replace(/<br\s*\/?>/gi,' ').replace(/<[^>]+>/g,' ').replace(/\s+/g,' ').trim();
  const decisions=new Map();

  const rules=[
    {level:'danger',re:/\b(irresponsable|flojo|floja|desinteresado|desinteresada|problemático|problemática|despreocupado|despreocupada|manipulador|manipuladora)\b/i,
      reason:'Juicio de valor o etiqueta personal. Conviene describir hechos observables y verificables.',
      suggest:t=>t
        .replace(/\bes irresponsable\b/ig,'presenta entregas incompletas o fuera del plazo establecido')
        .replace(/\bes floj[oa]\b/ig,'requiere acompañamiento para completar las actividades asignadas')
        .replace(/\bno muestra interés\b/ig,'ha presentado baja participación en las actividades observadas')
        .replace(/\bse muestra despreocupad[oa]\b/ig,'indicó que desconocía parte de la información registrada')
        .replace(/\bes problemátic[oa]\b/ig,'ha presentado situaciones que requieren seguimiento')},
    {level:'danger',re:/\b(nunca cumple|nunca hace|jamás cumple|siempre incumple)\b/i,
      reason:'Generalización absoluta. Debe reemplazarse por hechos, fechas o registros concretos.',
      suggest:t=>t.replace(/nunca cumple/ig,'se han registrado incumplimientos en las actividades señaladas').replace(/nunca hace/ig,'se registran actividades pendientes de entrega').replace(/jamás cumple/ig,'se han registrado incumplimientos en los periodos revisados').replace(/siempre incumple/ig,'presenta incumplimientos recurrentes según los registros revisados')},
    {level:'review',re:/\b(siempre|nunca|jamás|todos|ninguno|obviamente|claramente)\b/i,
      reason:'Expresión absoluta o interpretativa. Se recomienda precisar frecuencia, evidencia o periodo.',
      suggest:t=>t.replace(/\bsiempre\b/ig,'de manera recurrente').replace(/\bnunca\b/ig,'no se ha evidenciado en los registros revisados').replace(/\bjamás\b/ig,'no se ha evidenciado en el periodo revisado').replace(/\bobviamente\b/ig,'de acuerdo con la información disponible').replace(/\bclaramente\b/ig,'según los registros revisados')},
    {level:'review',re:/\b(no le importa|no quiere aprender|no le interesa|mala actitud|mal comportamiento)\b/i,
      reason:'Atribuye intención o valoración. Es preferible describir la conducta observada.',
      suggest:t=>t.replace(/no le importa/ig,'no ha evidenciado cumplimiento en los registros revisados').replace(/no quiere aprender/ig,'requiere mayor participación en las actividades de aprendizaje').replace(/no le interesa/ig,'ha mostrado baja participación en las actividades observadas').replace(/mala actitud/ig,'conductas observadas que requieren seguimiento').replace(/mal comportamiento/ig,'situaciones de convivencia registradas durante el periodo')}
  ];

  function fragments(){
    if(!window.currentAct?.sections)return[];
    const out=[];
    Object.entries(window.currentAct.sections).forEach(([section,html])=>{
      const text=plain(html);
      text.split(/(?<=[.!?])\s+|\s*;\s*/).map(x=>x.trim()).filter(x=>x.length>18).forEach((text,i)=>out.push({section,text,index:i}));
    });
    return out;
  }

  function analyze(){
    const all=fragments(), flagged=[];
    all.forEach(f=>{
      const rule=rules.find(r=>r.re.test(f.text));
      if(rule){
        const key=f.section+'|'+f.text;
        flagged.push({...f,key,level:rule.level,reason:rule.reason,suggestion:rule.suggest(f.text),decision:decisions.get(key)||'pending'});
      }
    });
    return {all,flagged};
  }

  function replaceInSection(item,newText){
    if(!window.currentAct?.sections?.[item.section])return;
    const original=window.currentAct.sections[item.section];
    const escaped=item.text.replace(/[.*+?^${}()|[\]\\]/g,'\\$&');
    const re=new RegExp(escaped,'i');
    if(re.test(plain(original))){
      const textOnly=plain(original).replace(re,newText);
      window.currentAct.sections[item.section]=textOnly;
    }else{
      window.currentAct.sections[item.section]=plain(original).replace(item.text,newText);
    }
    decisions.set(item.key,'applied');
    if(typeof window.renderAct==='function')window.renderAct();
    setTimeout(mountLanguageReview,30);
  }

  window.ACTALanguageApply=(idx)=>{
    const a=analyze(),item=a.flagged[idx]; if(!item)return;
    replaceInSection(item,item.suggestion);
    window.toast&&window.toast('Sugerencia aplicada. El acta fue actualizada.');
  };
  window.ACTALanguageKeep=(idx)=>{
    const a=analyze(),item=a.flagged[idx]; if(!item)return;
    decisions.set(item.key,'kept');
    mountLanguageReview();
    window.toast&&window.toast('Se mantiene la redacción original por decisión humana.');
  };
  window.ACTALanguageRecheck=()=>{mountLanguageReview(true);window.toast&&window.toast('Revisión de lenguaje actualizada.');};

  function injectStyles(){
    if(document.getElementById('languageReviewStyle70'))return;
    const st=document.createElement('style');st.id='languageReviewStyle70';st.textContent=`
      #languageReview70{margin-bottom:16px;padding-bottom:14px;border-bottom:1px solid #e4e9f1}
      .lr70-title{display:flex;justify-content:space-between;gap:10px;align-items:flex-start;margin-bottom:8px}
      .lr70-title h3{margin:0;font-size:18px}.lr70-meta{font-size:10px;letter-spacing:.08em;text-transform:uppercase;color:#718096}
      .lr70-counts{display:grid;grid-template-columns:repeat(3,1fr);gap:6px;margin:10px 0 12px}
      .lr70-count{padding:8px 6px;border-radius:11px;text-align:center;font-size:12px;font-weight:700}
      .lr70-ok{background:#e7f8f1;color:#087b55}.lr70-review{background:#fff4d9;color:#996511}.lr70-danger{background:#fde8e7;color:#a33830}
      .lr70-card{border:1px solid #e1e6ee;border-left:4px solid #d8a225;border-radius:12px;padding:11px;margin:9px 0;background:#fff}
      .lr70-card.danger{border-left-color:#c9473d}.lr70-card.resolved{opacity:.68;border-left-color:#15a779}
      .lr70-badge{display:inline-block;padding:4px 8px;border-radius:999px;font-size:11px;font-weight:700;margin-bottom:7px;background:#fff2d8;color:#8b6116}
      .lr70-card.danger .lr70-badge{background:#fde8e7;color:#aa352d}.lr70-original{font-family:Georgia,serif;font-size:14px;line-height:1.45;margin:5px 0}
      .lr70-reason{font-size:12px;color:#667085;line-height:1.4}.lr70-suggestion{background:#edf8ef;border:1px solid #d1ead6;border-radius:9px;padding:9px;margin:8px 0;font-size:12px;line-height:1.4}
      .lr70-actions{display:flex;gap:6px;flex-wrap:wrap}.lr70-actions button{font-size:12px;padding:7px 9px}
      .lr70-alert{background:#fff4ea;border:1px solid #f2d1ad;border-radius:10px;padding:10px;color:#9a4b18;font-size:12px;line-height:1.4;margin:10px 0}
      .lr70-clear{background:#eaf8f3;border:1px solid #bfe5d5;border-radius:10px;padding:11px;color:#087b55;font-size:12px;line-height:1.4}
      .lr70-note{font-size:11px;color:#778196;margin:8px 0}.lr70-recheck{width:100%;margin-top:8px}
      @media(max-width:900px){.lr70-counts{grid-template-columns:1fr}.lr70-title{display:block}}
    `;document.head.appendChild(st);
  }

  function mountLanguageReview(){
    injectStyles();
    const aside=document.querySelector('#actWorkspace aside.panel');
    if(!aside||!window.currentAct)return;
    let host=document.getElementById('languageReview70');
    if(!host){host=document.createElement('div');host.id='languageReview70';aside.insertBefore(host,aside.firstChild)}
    const {all,flagged}=analyze();
    const unresolved=flagged.filter(x=>x.decision==='pending');
    const danger=flagged.filter(x=>x.level==='danger'&&x.decision==='pending').length;
    const review=flagged.filter(x=>x.level==='review'&&x.decision==='pending').length;
    const adequate=Math.max(0,all.length-flagged.length)+flagged.filter(x=>x.decision!=='pending').length;
    const cards=flagged.length?flagged.map((x,i)=>`<div class="lr70-card ${x.level==='danger'?'danger':''} ${x.decision!=='pending'?'resolved':''}">
      <span class="lr70-badge">${x.decision!=='pending'?'✓ Resuelto':x.level==='danger'?'● No recomendado':'● Revisar'}</span>
      <div class="lr70-original">“${esc(x.text)}”</div>
      <div class="lr70-reason">${esc(x.reason)}</div>
      ${x.decision==='pending'?`<div class="lr70-suggestion"><b>REDACCIÓN SUGERIDA</b><br>${esc(x.suggestion)}</div><div class="lr70-actions"><button class="primary" onclick="ACTALanguageApply(${i})">Aplicar sugerencia</button><button class="secondary" onclick="ACTALanguageKeep(${i})">Mantener original</button></div>`:`<div class="lr70-note">Decisión registrada: ${x.decision==='applied'?'sugerencia aplicada':'se mantiene el original'}.</div>`}
    </div>`).join(''):`<div class="lr70-clear"><b>✓ Lenguaje adecuado</b><br>No se detectaron expresiones subjetivas, acusatorias o absolutas que requieran revisión.</div>`;
    host.innerHTML=`<div class="lr70-title"><div><h3>Revisión de lenguaje</h3><div class="lr70-meta">La IA solo sugiere · decisión humana</div></div><span class="tag blue">Antes de aprobar</span></div>
      <div class="lr70-counts"><div class="lr70-count lr70-ok">${adequate}<br><span style="font-weight:500">adecuados</span></div><div class="lr70-count lr70-review">${review}<br><span style="font-weight:500">a revisar</span></div><div class="lr70-count lr70-danger">${danger}<br><span style="font-weight:500">no recomendados</span></div></div>
      ${cards}
      ${unresolved.length?`<div class="lr70-alert"><b>${unresolved.length} fragmento(s) pendiente(s) de decisión.</b><br>Revísalos antes de aprobar el acta. La IA propone; el docente decide.</div>`:''}
      <button class="secondary lr70-recheck" onclick="ACTALanguageRecheck()">↻ Reanalizar lenguaje</button>`;
    const approve=document.getElementById('approveWhole68');
    const sign=document.getElementById('goSignBtn');
    if(approve){approve.disabled=unresolved.length>0;approve.title=unresolved.length?'Resuelve la revisión de lenguaje antes de aprobar':''}
    if(sign&&unresolved.length>0)sign.disabled=true;
  }

  const oldRender=window.renderAct;
  if(typeof oldRender==='function'){
    window.renderAct=function(){const r=oldRender.apply(this,arguments);setTimeout(mountLanguageReview,20);return r};
  }
  const obs=new MutationObserver(()=>{if(document.querySelector('#acts.view.active')||document.querySelector('#actWorkspace'))mountLanguageReview()});
  if(document.body)obs.observe(document.body,{childList:true,subtree:true});
  setInterval(mountLanguageReview,1200);
})();