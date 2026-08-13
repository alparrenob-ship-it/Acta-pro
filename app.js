const cfg = window.ACTA_PRO_CONFIG || {};
let tokenClient = null;
let accessToken = null;
let selectedEvent = null;

const $ = (id) => document.getElementById(id);
document.querySelectorAll('.nav').forEach(btn => btn.addEventListener('click', () => show(btn.dataset.view)));

function show(id){
  document.querySelectorAll('.view').forEach(v=>v.classList.remove('active'));
  document.querySelectorAll('.nav').forEach(v=>v.classList.toggle('active',v.dataset.view===id));
  $(id).classList.add('active');
}

function toast(msg){
  const el=$('toast'); el.textContent=msg; el.style.display='block';
  setTimeout(()=>el.style.display='none',2500);
}

function clientConfigured(){
  return cfg.GOOGLE_CLIENT_ID && !cfg.GOOGLE_CLIENT_ID.startsWith('YOUR_');
}

function initGoogle(){
  if(!clientConfigured()){
    $('calendarSetup').innerHTML = 'Falta configurar <strong>GOOGLE_CLIENT_ID</strong> en <code>config.js</code>. Mientras tanto puedes usar el modo demo.';
    return;
  }
  if(!window.google?.accounts?.oauth2){ setTimeout(initGoogle,500); return; }
  tokenClient = google.accounts.oauth2.initTokenClient({
    client_id: cfg.GOOGLE_CLIENT_ID,
    scope: cfg.CALENDAR_SCOPE,
    callback: async (response) => {
      if(response.error){ toast('No se pudo conectar Google'); return; }
      accessToken = response.access_token;
      $('googleStatus').textContent='Google Calendar conectado';
      toast('Google Calendar conectado');
      await loadCalendarEvents();
      show('calendar');
    }
  });
}

$('connectGoogle').addEventListener('click', ()=>{
  if(!clientConfigured()){
    toast('Primero configura GOOGLE_CLIENT_ID o usa datos demo');
    show('calendar');
    return;
  }
  if(!tokenClient){ initGoogle(); setTimeout(()=>tokenClient?.requestAccessToken(),600); return; }
  tokenClient.requestAccessToken();
});

$('refreshCalendar').addEventListener('click', ()=> accessToken ? loadCalendarEvents() : toast('Conecta Google Calendar primero'));

async function loadCalendarEvents(){
  const now = new Date();
  const max = new Date(now.getTime() + 1000*60*60*24*90);
  const url = new URL('https://www.googleapis.com/calendar/v3/calendars/primary/events');
  url.searchParams.set('timeMin', now.toISOString());
  url.searchParams.set('timeMax', max.toISOString());
  url.searchParams.set('singleEvents','true');
  url.searchParams.set('orderBy','startTime');
  url.searchParams.set('maxResults','50');
  url.searchParams.set('q','ACTA PRO');

  const res = await fetch(url, {headers:{Authorization:`Bearer ${accessToken}`}});
  if(!res.ok){ toast('Error leyendo Calendar'); return; }
  const data = await res.json();
  const events=(data.items||[]).filter(e => (e.summary||'').toUpperCase().includes('ACTA PRO'));
  renderEvents(events);
}

function renderEvents(events){
  $('metricMeetings').textContent=events.length;
  const list=$('eventsList'); list.innerHTML='';
  if(!events.length){
    list.innerHTML='<div class="panel">No encontramos reuniones con [ACTA PRO] en los próximos 90 días.</div>';
    $('metricNext').textContent='—'; $('metricNextName').textContent='Sin reuniones';
    return;
  }

  const first=events[0], dt=new Date(first.start?.dateTime||first.start?.date);
  $('metricNext').textContent=dt.toLocaleTimeString('es-EC',{hour:'2-digit',minute:'2-digit'});
  $('metricNextName').textContent=first.summary||'Reunión';

  events.forEach(ev=>{
    const date=new Date(ev.start?.dateTime||ev.start?.date);
    const card=document.createElement('div'); card.className='event';
    card.innerHTML=`<div><strong>${ev.summary||'Reunión'}</strong><small>${date.toLocaleString('es-EC')}</small></div><button class="primary">Preparar acta</button>`;
    card.querySelector('button').onclick=()=>selectEvent(ev);
    list.appendChild(card);
  });
}

function parseDescription(desc=''){
  const get=(key)=>{
    const m=desc.match(new RegExp(`^${key}\\s*:\\s*(.+)$`,'im'));
    return m ? m[1].trim() : '';
  };
  return {
    student:get('Estudiante'),
    representative:get('Representante'),
    email:get('Correo'),
    course:get('Curso'),
    reason:get('Motivo')
  };
}

function selectEvent(ev){
  selectedEvent=ev;
  const d=parseDescription(ev.description||'');
  $('studentName').value=d.student || (ev.summary||'').replace(/\[ACTA PRO\]/i,'').split('-')[0].trim();
  $('representativeName').value=d.representative;
  $('representativeEmail').value=d.email;
  $('course').value=d.course;
  $('meetingReason').value=d.reason || ((ev.summary||'').split('-')[1]||'').trim();
  $('meetingEmpty').classList.add('hidden');
  $('meetingCard').classList.remove('hidden');
  $('liveMeeting').classList.add('hidden');
  show('meeting');
}

$('startMeeting').addEventListener('click',()=>{
  $('meetingCard').classList.add('hidden');
  $('liveMeeting').classList.remove('hidden');
  toast('Reunión iniciada');
});

$('finishMeeting').addEventListener('click',()=>{
  toast('Demostración finalizada. Próxima fase: transcripción real.');
});

$('demoMode').addEventListener('click',()=>{
  const demo=[{
    id:'demo-1',
    summary:'[ACTA PRO] Juan Pérez - Seguimiento académico',
    description:'Estudiante: Juan Pérez\nRepresentante: María López\nCorreo: maria.lopez@example.com\nCurso: 7.º EGB A\nMotivo: Seguimiento académico',
    start:{dateTime:new Date(Date.now()+3600000).toISOString()}
  }];
  renderEvents(demo);
  $('calendarSetup').textContent='Modo demo activo. Estos datos simulan la respuesta de Google Calendar.';
  show('calendar');
});

initGoogle();
