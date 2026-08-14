(()=>{
let r=null,active=false,paused=false,restart=false,lastFinal='',lastFinalAt=0;
const q=id=>document.getElementById(id);
const Ctor=()=>window.SpeechRecognition||window.webkitSpeechRecognition||null;
const DOMAIN_WORDS=[
 'acta','reunión','representante','estudiante','docente','tutoría','académico','académica','rendimiento','seguimiento','compromiso','acuerdo','evidencia','calificación','asignatura','curso','paralelo','agenda','actividad','tarea','evaluación','institucional','DECE','Runachay','Eight Academy','Ciencias Naturales','Matemáticas','Emprendimiento'
];
const REPLACEMENTS=[
 [/\bde se\b/gi,'DECE'],[/\bdese\b/gi,'DECE'],[/\bruna chai\b/gi,'Runachay'],[/\bruna chay\b/gi,'Runachay'],[/\brunachai\b/gi,'Runachay'],
 [/\beit academy\b/gi,'Eight Academy'],[/\beight academi\b/gi,'Eight Academy'],[/\bactapro\b/gi,'ACTA PRO'],[/\bacta pro\b/gi,'ACTA PRO'],
 [/\bciencias natural(es)?\b/gi,'Ciencias Naturales'],[/\bmatematica\b/gi,'Matemáticas'],[/\bmatematicas\b/gi,'Matemáticas']
];
function status(t){if(q('speechStatus67'))q('speechStatus67').textContent=t}
function interim(t){let b=q('interim67'),x=q('interimText67');if(!b||!x)return;x.textContent=t;b.classList.toggle('show',!!t)}
function normalize(t){
 let s=String(t||'').replace(/\s+/g,' ').trim();
 REPLACEMENTS.forEach(([re,v])=>s=s.replace(re,v));
 s=s.replace(/\b(e g b)\b/gi,'EGB').replace(/\b(ia)\b/g,'IA');
 if(s)s=s.charAt(0).toUpperCase()+s.slice(1);
 return s;
}
function domainScore(text,confidence=0){
 const low=String(text||'').toLowerCase();
 let score=(Number(confidence)||0)*5;
 DOMAIN_WORDS.forEach(w=>{if(low.includes(w.toLowerCase()))score+=2});
 if(/[áéíóúñ]/i.test(text))score+=.25;
 if(/\b(acta|reuni[oó]n|docente|estudiante|representante|acad[eé]mic|compromiso|seguimiento)\b/i.test(text))score+=1;
 return score;
}
function bestAlternative(result){
 let best='';let bestScore=-Infinity;
 for(let i=0;i<result.length;i++){
   const alt=result[i],txt=normalize(alt.transcript||''),score=domainScore(txt,alt.confidence);
   if(score>bestScore){bestScore=score;best=txt}
 }
 return best||normalize(result[0]?.transcript||'');
}
function pushText(t){
 const clean=normalize(t);if(!clean)return;
 const now=Date.now();
 if(clean.toLowerCase()===lastFinal.toLowerCase()&&now-lastFinalAt<2500)return;
 lastFinal=clean;lastFinalAt=now;
 let input=q('manualText'),btn=q('manualAdd');
 if(input&&btn){input.value=clean;btn.click();status('Intervención añadida con corrección de vocabulario institucional.')}}
function mount(){
 let p=q('transcriptPanel');if(!p||q('speechControl67'))return;
 let c=document.createElement('div');c.id='speechControl67';c.className='speech-control';
 c.innerHTML=`<div class="speech-left"><span id="speechDot67" class="speech-dot"></span><div><b>Transcripción por micrófono</b><div id="speechStatus67" class="speech-status">Lista para escuchar.</div></div></div><div class="speech-actions"><span id="speechSupport67" class="speech-support">Comprobando…</span><button id="startSpeech67" class="primary mic-main">🎙 Iniciar micrófono</button><button id="pauseSpeech67" class="secondary" disabled>Pausar</button></div>`;
 p.insertAdjacentElement('beforebegin',c);
 let i=document.createElement('div');i.id='interim67';i.className='interim-box';i.innerHTML='<b>Escuchando:</b> <span id="interimText67"></span>';p.insertAdjacentElement('beforebegin',i);
 let sim=q('simulateConversation');if(sim){sim.textContent='Cargar conversación demo';sim.classList.remove('primary');sim.classList.add('secondary')}
 q('startSpeech67').onclick=toggle;q('pauseSpeech67').onclick=pauseToggle;support();
}
function support(){let b=q('speechSupport67');if(!b)return;if(!window.isSecureContext){b.textContent='Requiere HTTPS';b.className='speech-support bad';return}if(!Ctor()){b.textContent='Audio no compatible';b.className='speech-support bad';q('startSpeech67').disabled=true;return}b.textContent='Español Ecuador · optimizado';b.className='speech-support ok'}
async function permission(){
 if(!navigator.mediaDevices?.getUserMedia)return true;
 try{let s=await navigator.mediaDevices.getUserMedia({audio:{echoCancellation:true,noiseSuppression:true,autoGainControl:true,channelCount:1}});s.getTracks().forEach(t=>t.stop());return true}
 catch(e){status('No se concedió acceso al micrófono.');window.toast?.('Debes permitir el micrófono para transcribir.');return false}
}
async function toggle(){if(active){stop();return}if(await permission())start()}
function make(){
 let C=Ctor();if(!C)return null;let x=new C();
 x.lang='es-EC';x.continuous=true;x.interimResults=true;x.maxAlternatives=5;
 x.onstart=()=>{active=true;paused=false;restart=true;q('speechDot67')?.classList.add('live');q('startSpeech67').textContent='⏹ Detener micrófono';q('startSpeech67').classList.add('live');q('pauseSpeech67').disabled=false;status('Escuchando en español de Ecuador. Habla cerca del micrófono y deja pausas breves entre ideas.')};
 x.onresult=e=>{
   let temp='';
   for(let j=e.resultIndex;j<e.results.length;j++){
     const result=e.results[j];
     const t=bestAlternative(result);
     if(result.isFinal){if(t)pushText(t)}else temp+=(temp?' ':'')+t;
   }
   interim(normalize(temp));
 };
 x.onerror=e=>{let m={"not-allowed":'Permiso de micrófono denegado.',"audio-capture":'No se encontró un micrófono.',network:'Error de red en reconocimiento.',"no-speech":'No se detectó voz. Acércate al micrófono y vuelve a hablar.',aborted:'Reconocimiento detenido.'};status(m[e.error]||('Error: '+e.error));if(['not-allowed','audio-capture'].includes(e.error)){restart=false;active=false;paint()}};
 x.onend=()=>{if(restart&&active&&!paused){setTimeout(()=>{try{x.start()}catch(_){ }},450)}else if(!paused)paint()};
 return x;
}
function start(){lastFinal='';lastFinalAt=0;r=make();try{r?.start()}catch(e){status('No se pudo iniciar el micrófono.')}}
function stop(){restart=false;active=false;paused=false;try{r?.stop()}catch(e){}paint();interim('')}
function pauseToggle(){if(!active)return;if(!paused){paused=true;restart=false;try{r?.stop()}catch(e){}q('pauseSpeech67').textContent='Reanudar';q('speechDot67')?.classList.remove('live');status('Transcripción pausada.')}else{paused=false;restart=true;r=make();try{r?.start()}catch(e){}q('pauseSpeech67').textContent='Pausar'}}
function paint(){q('speechDot67')?.classList.remove('live');if(q('startSpeech67')){q('startSpeech67').textContent='🎙 Iniciar micrófono';q('startSpeech67').classList.remove('live')}if(q('pauseSpeech67'))q('pauseSpeech67').disabled=true;status('Micrófono detenido. La transcripción permanece guardada.')}
window.ACTASpeechStop=stop;
document.addEventListener('DOMContentLoaded',mount);setTimeout(mount,600);
})();