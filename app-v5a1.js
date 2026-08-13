const seed={
students:[
{id:"s1",name:"Sofía Martínez",course:"7.º EGB A",code:"EA-2026-074",tutor:"Anita Parreño"},
{id:"s2",name:"Mateo Gómez",course:"7.º EGB B",code:"EA-2026-081",tutor:"Pablo Vega"},
{id:"s3",name:"Valentina Ruiz",course:"6.º EGB A",code:"EA-2026-052",tutor:"Kelly Monserrate"},
{id:"s4",name:"Daniel Torres",course:"5.º EGB A",code:"EA-2026-033",tutor:"Andrea León"},
{id:"s5",name:"Emma Cedeño",course:"6.º EGB C",code:"EA-2026-061",tutor:"Anita Parreño"}],
guardians:[
{id:"g1",name:"Carolina Pérez",relation:"Madre",email:"carolina.perez@email.com",phone:"0990000001",studentId:"s1"},
{id:"g2",name:"Luis Gómez",relation:"Padre",email:"luis.gomez@email.com",phone:"0990000002",studentId:"s2"},
{id:"g3",name:"Patricia Ruiz",relation:"Madre",email:"patricia.ruiz@email.com",phone:"0990000003",studentId:"s3"},
{id:"g4",name:"Marco Torres",relation:"Padre",email:"marco.torres@email.com",phone:"0990000004",studentId:"s4"},
{id:"g5",name:"Lucía Cedeño",relation:"Madre",email:"lucia.cedeno@email.com",phone:"0990000005",studentId:"s5"}],
teachers:[
{id:"t1",name:"Anita Parreño"},{id:"t2",name:"Pablo Vega"},{id:"t3",name:"Kelly Monserrate"},{id:"t4",name:"Andrea León"}],
meetings:[
{id:"m1",studentId:"s1",guardianId:"g1",teacherId:"t1",title:"Seguimiento académico",reason:"Seguimiento académico y organización escolar",type:"Académica",date:"2026-08-13",startTime:"09:00",modality:"Presencial",status:"prepared"},
{id:"m2",studentId:"s2",guardianId:"g2",teacherId:"t1",title:"Seguimiento conductual",reason:"Seguimiento conductual",type:"Conductual",date:"2026-08-13",startTime:"11:30",modality:"Presencial",status:"scheduled"},
{id:"m3",studentId:"s3",guardianId:"g3",teacherId:"t2",title:"Tutoría",reason:"Acompañamiento de adaptación",type:"Tutoría",date:"2026-08-13",startTime:"14:00",modality:"Online",status:"scheduled"},
{id:"m4",studentId:"s4",guardianId:"g4",teacherId:"t3",title:"Seguimiento",reason:"Revisión de compromisos",type:"Seguimiento",date:"2026-08-14",startTime:"08:30",modality:"Presencial",status:"scheduled"},
{id:"m5",studentId:"s5",guardianId:"g5",teacherId:"t1",title:"Académica",reason:"Organización de tareas",type:"Académica",date:"2026-08-14",startTime:"10:00",modality:"Presencial",status:"review"},
{id:"m6",studentId:"s1",guardianId:"g1",teacherId:"t1",title:"Tutoría",reason:"Seguimiento de acuerdos",type:"Tutoría",date:"2026-06-20",startTime:"09:30",modality:"Presencial",status:"archived"},
{id:"m7",studentId:"s2",guardianId:"g2",teacherId:"t2",title:"DECE",reason:"Reunión autorizada DECE",type:"DECE",date:"2026-06-15",startTime:"12:00",modality:"Presencial",status:"archived"},
{id:"m8",studentId:"s3",guardianId:"g3",teacherId:"t3",title:"Académica",reason:"Seguimiento de rendimiento",type:"Académica",date:"2026-05-12",startTime:"10:30",modality:"Presencial",status:"signed"}],
acts:[
{id:"a1",meetingId:"m6",number:"ACTA-2026-00140",status:"archived",date:"2026-06-20"},
{id:"a2",meetingId:"m7",number:"ACTA-2026-00133",status:"archived",date:"2026-06-15"},
{id:"a3",meetingId:"m8",number:"ACTA-2026-00120",status:"signed",date:"2026-05-12"},
{id:"a4",meetingId:"m5",number:"ACTA-2026-00178",status:"review",date:"2026-08-12"},
{id:"a5",meetingId:"m2",number:"ACTA-2026-00176",status:"review",date:"2026-08-11"},
{id:"a6",meetingId:"m4",number:"ACTA-2026-00165",status:"signed",date:"2026-08-01"}],
commitments:[
{id:"c1",meetingId:"m1",responsibleName:"Sofía Martínez",description:"Revisar agenda diariamente",dueDate:"2026-08-27",status:"pending"},
{id:"c2",meetingId:"m1",responsibleName:"Carolina Pérez",description:"Supervisar agenda en casa",dueDate:"2026-08-27",status:"pending"},
{id:"c3",meetingId:"m1",responsibleName:"Anita Parreño",description:"Revisar avance semanal",dueDate:"2026-08-21",status:"in_progress"},
{id:"c4",meetingId:"m2",responsibleName:"Mateo Gómez",description:"Cumplir rutina de organización",dueDate:"2026-08-25",status:"pending"},
{id:"c5",meetingId:"m3",responsibleName:"Patricia Ruiz",description:"Registrar seguimiento semanal",dueDate:"2026-08-28",status:"pending"},
{id:"c6",meetingId:"m4",responsibleName:"Daniel Torres",description:"Entregar actividad pendiente",dueDate:"2026-08-19",status:"completed"},
{id:"c7",meetingId:"m5",responsibleName:"Emma Cedeño",description:"Usar agenda de tareas",dueDate:"2026-08-24",status:"pending"},
{id:"c8",meetingId:"m6",responsibleName:"Carolina Pérez",description:"Enviar evidencia solicitada",dueDate:"2026-06-25",status:"completed"},
{id:"c9",meetingId:"m7",responsibleName:"Pablo Vega",description:"Coordinar seguimiento autorizado",dueDate:"2026-06-18",status:"completed"},
{id:"c10",meetingId:"m8",responsibleName:"Valentina Ruiz",description:"Cumplir plan de estudio",dueDate:"2026-05-25",status:"completed"}],
followups:[
{id:"f1",studentId:"s1",commitmentId:"c1",date:"2026-08-27",status:"pending"},
{id:"f2",studentId:"s2",commitmentId:"c4",date:"2026-08-25",status:"pending"},
{id:"f3",studentId:"s3",commitmentId:"c5",date:"2026-08-28",status:"pending"},
{id:"f4",studentId:"s4",commitmentId:"c6",date:"2026-08-19",status:"completed"},
{id:"f5",studentId:"s5",commitmentId:"c7",date:"2026-08-24",status:"pending"}],
notifications:Array.from({length:15},(_,i)=>({id:"n"+(i+1),text:[
"Reunión en 30 minutos","Acta pendiente de firma","Compromiso completado","Seguimiento vencido","Nueva reunión detectada en Calendar",
"Runachay sincronizado","Acta archivada","Copia enviada al representante","Seguimiento programado","Revisión del acta al 80%",
"Nueva evidencia agregada","Compromiso detectado por ACTA AI","Reunión preparada","Recordatorio de firma","Auditoría actualizada"][i],read:i>4})),
audit:[
["09:02","Reunión iniciada"],["09:04","Transcripción iniciada"],["09:23","Reunión finalizada"],["09:24","Acta generada"],["09:31","Docente aprobó"],["09:35","Representante firmó"],["09:36","Acta archivada"]]
};

let db=JSON.parse(localStorage.getItem("actaProV5")||"null")||structuredClone(seed);
let currentMeetingId="m1", transcript=[], evidence=[], liveIdx=0, timerInt=null, timerSec=0, paused=false, aiSuggestions=[], currentAct=null, sectionApproval={};
const convo=[
["Carolina Pérez","Madre","Últimamente he notado que Sofía está demorando más tiempo en realizar las tareas."],
["Anita Parreño","Docente","En clase también hemos observado que necesita más tiempo para organizar algunas actividades."],
["Sofía Martínez","Estudiante","A veces me distraigo y después no sé en qué parte iba."],
["Anita Parreño","Docente","Podemos establecer una rutina diaria de organización y revisar la agenda durante las próximas dos semanas."],
["Carolina Pérez","Madre","Yo puedo supervisar la agenda en casa y registrar si cumple la rutina."],
["Anita Parreño","Docente","Sofía es irresponsable con algunas tareas."],
["Carolina Pérez","Madre","El estudiante nunca hace las tareas a tiempo."],
["Anita Parreño","Docente","Revisaremos diariamente la agenda durante dos semanas y haremos seguimiento el 27 de agosto."]
];
function save(){localStorage.setItem("actaProV5",JSON.stringify(db))}
const $=id=>document.getElementById(id);
function toast(t){let e=$("toast");e.textContent=t;e.style.display="block";setTimeout(()=>e.style.display="none",2400)}
function openModal(title,body,primaryText=null,onConfirm=null){$("modalTitle").textContent=title;$("modalBody").innerHTML=body;$("modalWrap").style.display="flex";$("modalPrimary").classList.toggle("hidden",!primaryText);$("modalPrimary").textContent=primaryText||"Confirmar";$("modalPrimary").onclick=()=>{if(onConfirm)onConfirm();closeModal()}}
function closeModal(){$("modalWrap").style.display="none"}$("closeModal").onclick=closeModal;$("modalCancel").onclick=closeModal;
function showView(id){document.querySelectorAll(".view").forEach(v=>v.classList.remove("active"));document.querySelectorAll(".nav").forEach(n=>n.classList.toggle("active",n.dataset.view===id));$(id).classList.add("active");window.scrollTo(0,0);renderAll()}
document.querySelectorAll(".nav").forEach(n=>n.onclick=()=>showView(n.dataset.view));

function login(){ $("landingScreen").classList.add("hidden");$("loginScreen").classList.add("hidden");$("appScreen").classList.remove("hidden");renderAll()}
$("landingLogin").onclick=()=>{$("landingScreen").classList.add("hidden");$("loginScreen").classList.remove("hidden")}
$("landingDemo").onclick=login;$("heroDemo").onclick=login;$("demoLogin").onclick=login;$("loginBtn").onclick=login;$("googleLogin").onclick=()=>{toast("Google OAuth simulado para el MVP");login()};$("backLanding").onclick=()=>{$("loginScreen").classList.add("hidden");$("landingScreen").classList.remove("hidden")}
$("logoutBtn").onclick=()=>{$("appScreen").classList.add("hidden");$("landingScreen").classList.remove("hidden")}
$("roleSelect").onchange=()=>{toast("Vista cambiada a "+$("roleSelect").value);applyRole()}
function applyRole(){const role=$("roleSelect").value;document.querySelectorAll(".nav").forEach(n=>n.style.display="flex");if(role==="DECE"){["analytics","guardians"].forEach(v=>document.querySelector(`.nav[data-view="${v}"]`).style.display="none")}if(role==="Coordinador"){document.querySelector('.nav[data-view="settings"]').style.display="none"}}

function getStudent(id){return db.students.find(x=>x.id===id)} function getGuardian(id){return db.guardians.find(x=>x.id===id)} function getTeacher(id){return db.teachers.find(x=>x.id===id)} function getMeeting(id){return db.meetings.find(x=>x.id===id)}
function initials(name){return name.split(" ").map(x=>x[0]).slice(0,2).join("")}
function statusTag(s){let c={prepared:"green",scheduled:"amber",live:"red",review:"amber",signed:"blue",archived:"green"}[s]||"gray";return `<span class="tag ${c}">${s}</span>`}

function renderDashboard(){
 const today=db.meetings.filter(m=>m.date==="2026-08-13");$("kpiToday").textContent=today.length;$("kpiWeek").textContent=db.meetings.length;$("kpiActs").textContent=db.acts.filter(a=>a.status==="review").length;$("kpiCom").textContent=db.commitments.filter(c=>c.status!=="completed").length;$("kpiFollow").textContent=db.followups.filter(f=>f.status==="pending").length>0?1:0;
 $("todayTimeline").innerHTML=today.map(m=>{let s=getStudent(m.studentId),g=getGuardian(m.guardianId),t=getTeacher(m.teacherId);return `<div class="timeline-row"><div class="time">${m.startTime}</div><div><div class="meeting-title">${m.title}</div><div class="meta">Estudiante: ${s.name} · Representante: ${g.name} · Docente: ${t.name}<br>Motivo: ${m.reason} · ${statusTag(m.status)}</div></div><button class="secondary" onclick="prepareMeeting('${m.id}')">Abrir reunión</button></div>`}).join("");
}
function renderMeetings(){let q=($("meetingSearch")?.value||"").toLowerCase(),f=$("meetingStatusFilter")?.value||"all";$("meetingList").innerHTML=db.meetings.filter(m=>{let s=getStudent(m.studentId),g=getGuardian(m.guardianId);let ok=(s.name+" "+g.name+" "+m.reason).toLowerCase().includes(q);return ok&&(f==="all"||m.status===f)}).map(m=>{let s=getStudent(m.studentId),g=getGuardian(m.guardianId);return `<div class="timeline-row"><div class="time">${m.startTime}</div><div><div class="meeting-title">${s.name} — ${m.title}</div><div class="meta">${m.date} · ${g.name} · ${m.modality} · ${statusTag(m.status)}</div></div><button class="secondary" onclick="prepareMeeting('${m.id}')">${m.status==="archived"?"Ver":"Abrir"}</button></div>`}).join("")}
$("meetingSearch").oninput=renderMeetings;$("meetingStatusFilter").onchange=renderMeetings;

function fillMeetingForm(){
 const opts=(arr,label)=>arr.map(x=>`<option value="${x.id}">${x.name}</option>`).join("");
 $("newStudent").innerHTML=opts(db.students);$("newGuardian").innerHTML=opts(db.guardians);$("newTeacher").innerHTML=opts(db.teachers);
 $("newDate").value="2026-08-15";
 $("newStudent").onchange=()=>{let g=db.guardians.find(x=>x.studentId===$("newStudent").value);if(g)$("newGuardian").value=g.id}
}
$("createMeetingBtn").onclick=()=>{let reason=$("newReason").value.trim();if(!reason){toast("Escribe el motivo de la reunión");return}let id="m"+(db.meetings.length+1);db.meetings.push({id,studentId:$("newStudent").value,guardianId:$("newGuardian").value,teacherId:$("newTeacher").value,title:$("newType").value,reason,type:$("newType").value,date:$("newDate").value,startTime:$("newTime").value,modality:$("newModality").value,status:"scheduled"});save();toast("Reunión creada");showView("meetings")}
