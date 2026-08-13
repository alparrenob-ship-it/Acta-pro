function renderAnalytics(){
  const meetingsEl=$("chartMeetings"), reasonsEl=$("chartReasons");
  if(meetingsEl){const vals=[14,18,16,22,25,19,14,20];meetingsEl.innerHTML=vals.map(v=>`<div class="bar" style="height:${v*5}px"><b>${v}</b></div>`).join("");}
  if(reasonsEl){const vals=[28,22,18,16,12,9];reasonsEl.innerHTML=vals.map(v=>`<div class="bar" style="height:${v*5}px;background:#dff1eb"><b>${v}</b></div>`).join("");}
}

function renderArchive(){
  const list=$("archiveList"); if(!list) return;
  const q=($("archiveSearch")?.value||"").toLowerCase();
  const f=$("archiveStatus")?.value||"all";
  list.innerHTML=db.acts.filter(a=>f==="all"||a.status===f).filter(a=>{
    const m=getMeeting(a.meetingId); if(!m) return false;
    const s=getStudent(m.studentId), g=getGuardian(m.guardianId);
    return `${s?.name||""} ${g?.name||""} ${m.type||""} ${a.number||""}`.toLowerCase().includes(q);
  }).map(a=>{
    const m=getMeeting(a.meetingId),s=getStudent(m.studentId);
    return `<div class="repo-row"><div><b>${s?.name||"Estudiante"}</b><div class="small muted">${a.date} · ${m.type} · ${a.number}</div></div><div class="repo-actions">${statusTag(a.status)}<button class="secondary" onclick="viewArchive('${a.id}')">Ver</button></div></div>`;
  }).join("")||`<div class="panel muted small">No se encontraron actas con esos filtros.</div>`;
}
window.viewArchive=id=>{
  const a=db.acts.find(x=>x.id===id); if(!a) return;
  const m=getMeeting(a.meetingId),s=getStudent(m.studentId),g=getGuardian(m.guardianId);
  openModal(a.number,`<p><b>${s?.name||"Estudiante"}</b><br>${m?.reason||""}<br>${a.date}</p><p>Representante: ${g?.name||"—"}<br>Estado: ${a.status}</p>`);
};

function renderNotifications(){
  const list=$("notificationList"); if(!list) return;
  list.innerHTML=db.notifications.map(n=>`<div class="notif" style="${n.read?"opacity:.55":""}"><div class="nicon">🔔</div><div><b>${n.text}</b><div class="small muted">${n.read?"Leída":"Nueva"}</div></div></div>`).join("");
}

function renderAudit(){
  const el=$("auditTimeline"); if(!el) return;
  el.innerHTML=db.audit.map(a=>`<div class="audit-row"><time>${a[0]}</time><div>${a[1]}</div></div>`).join("");
}

function bindSecondaryUX(){
  if($("archiveSearch")) $("archiveSearch").oninput=renderArchive;
  if($("archiveStatus")) $("archiveStatus").onchange=renderArchive;
  if($("exportArchive")) $("exportArchive").onclick=()=>{
    const blob=new Blob([JSON.stringify(db.acts,null,2)],{type:"application/json"});
    const a=document.createElement("a"); a.href=URL.createObjectURL(blob); a.download="acta-pro-archivo.json"; a.click(); URL.revokeObjectURL(a.href); toast("Archivo exportado");
  };
  if($("markAllRead")) $("markAllRead").onclick=()=>{db.notifications.forEach(n=>n.read=true);save();renderNotifications();toast("Notificaciones marcadas como leídas")};
  const sync=()=>{const el=$("syncResult"); if(el) el.textContent="Buscando nuevas reuniones…"; setTimeout(()=>{if(el) el.textContent="2 reuniones nuevas encontradas.";toast("Calendario sincronizado")},1100)};
  if($("syncCalendar")) $("syncCalendar").onclick=sync;
  if($("syncCalendar2")) $("syncCalendar2").onclick=sync;
  if($("globalDemo")) $("globalDemo").onclick=()=>{currentMeetingId="m1";prepareMeeting("m1");toast("Demo guiada iniciada")};
}

function renderAll(){
  renderDashboard();renderMeetings();fillMeetingForm();renderCommitments();renderFollowups();renderStudents();renderGuardians();renderAnalytics();renderArchive();renderNotifications();renderAudit();applyRole();
}
bindSecondaryUX();
renderAll();