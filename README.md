# ACTA PRO — MVP funcional

> **De una reunión a una evidencia institucional, en tiempo real.**

ACTA PRO es un prototipo web funcional orientado a instituciones educativas. Su propósito es ayudar al docente a gestionar reuniones con representantes, estudiantes y personal institucional sin perder el foco de la conversación, convirtiendo cada encuentro en un acta estructurada, revisable, firmada y trazable.

**Estado actual:** MVP funcional desplegado en GitHub Pages.

**Demo pública:** https://alparrenob-ship-it.github.io/Acta-pro/

---

## 1. Problema que resuelve

Durante una reunión escolar el docente debe, al mismo tiempo:

- escuchar;
- orientar;
- responder;
- registrar información;
- identificar quién dijo qué;
- redactar de manera objetiva;
- establecer acuerdos;
- documentar compromisos;
- generar evidencia institucional;
- realizar seguimiento posterior.

Esto puede provocar omisiones, interrupciones, registros incompletos y una carga administrativa importante.

ACTA PRO busca reducir esa doble tarea.

---

## 2. Propuesta de valor

ACTA PRO transforma el proceso de una reunión en un flujo digital completo:

**Planificar → Sincronizar → Preparar → Reunión en vivo → Acta → Firma → Cierre**

La plataforma acompaña al docente antes, durante y después de la reunión.

### Principio central

> **La IA propone. El docente revisa y decide.**

ACTA PRO es un sistema de asistencia documental, no un sistema autónomo de decisión institucional.

---

## 3. Flujo funcional actual

### 1. Planificar

El usuario puede:

- consultar reuniones;
- crear una nueva reunión;
- definir estudiante;
- representante;
- docente;
- fecha;
- hora;
- tipo de reunión;
- modalidad;
- motivo.

### 2. Sincronizar

El prototipo simula integración con:

- Google Calendar;
- Runachay.

La demo representa la detección automática de reuniones y la precarga de datos institucionales.

### 3. Preparar

Antes de iniciar la reunión se muestran:

- estudiante;
- representante;
- docente;
- curso;
- motivo;
- fecha;
- hora;
- modalidad.

También se seleccionan los participantes presentes:

- madre;
- padre;
- estudiante;
- docente;
- coordinador;
- DECE;
- otro.

El sistema incluye confirmación de consentimiento antes de comenzar el registro.

### 4. Reunión en vivo

La sala inteligente permite:

- iniciar la reunión;
- mostrar cronómetro;
- visualizar participante activo;
- simular conversación;
- agregar intervenciones manuales;
- organizar la transcripción por hablante;
- registrar evidencias;
- detectar posibles acuerdos y compromisos;
- visualizar sugerencias de ACTA AI.

Cuando el navegador lo permite, el prototipo incluye soporte de micrófono y funcionalidades experimentales de voz.

### 5. ACTA AI

Durante la reunión, ACTA AI puede sugerir:

- tema detectado;
- situación identificada;
- lenguaje subjetivo;
- afirmaciones que requieren evidencia;
- acuerdos potenciales;
- compromisos.

Ejemplo:

**Original:** “Sofía es irresponsable.”

**Sugerencia:** “Se han identificado entregas incompletas o fuera del plazo establecido durante las últimas semanas.”

La plataforma no reemplaza automáticamente el texto. El docente puede:

- aceptar;
- editar;
- descartar;
- mantener su propia redacción.

---

## 4. Generación del acta

Al finalizar la reunión, ACTA PRO organiza la información y genera un acta preliminar.

El documento incluye:

- información general;
- antecedentes y motivo;
- desarrollo de la reunión;
- evidencias mencionadas;
- acuerdos y compromisos;
- observaciones finales.

Cada sección puede ser revisada y editada antes de aprobar el documento.

La filosofía del sistema es:

> **IA asistida · Decisión humana · Evidencia trazable**

---

## 5. Revisión humana

Antes de firmar, el docente puede:

- editar directamente el acta;
- comparar el acta con la conversación original;
- revisar el contenido completo;
- aprobar el documento.

El sistema mantiene una separación clara entre:

**Conversación original**

y

**Acta institucional redactada**

para reforzar la trazabilidad.

---

## 6. Firma digital

ACTA PRO incluye un módulo de firma mediante canvas táctil o mouse.

Actualmente se contempla firma de:

- docente;
- representante.

Las firmas dibujadas se convierten en imágenes y se almacenan junto con el acta final dentro del MVP.

Después de ambas confirmaciones, el acta se marca como firmada y archivada.

---

## 7. Acta final institucional

Una de las últimas mejoras incorporadas es la generación de una **vista final del acta con formato institucional**, inspirada en el formato físico utilizado por Eight Academy.

La versión final contiene:

- encabezado institucional;
- Unidad Educativa Particular “Eight Academy”;
- año lectivo;
- título “Acta reunión representantes”;
- fecha;
- hora;
- nombre del estudiante;
- grado;
- paralelo;
- nombres de asistentes;
- motivo de la reunión;
- acuerdos y compromisos;
- nombres y cargos de firmantes;
- firmas digitales capturadas;
- número único del acta.

Desde la pantalla de cierre se puede seleccionar:

- **Ver acta final**;
- **Descargar PDF**;
- **Enviar por correo** — simulación MVP;
- **Crear seguimiento**;
- **Volver al inicio**.

---

## 8. Archivo digital

Las actas completadas se almacenan dentro del archivo digital del prototipo.

El usuario puede buscar por:

- estudiante;
- representante;
- tipo;
- fecha;
- estado;
- número de acta.

Cada registro permite:

- **Ver acta**;
- **Descargar PDF**.

Para las nuevas actas generadas después de la actualización de firma persistente, la vista archivada conserva también las firmas digitales.

---

## 9. Compromisos y seguimientos

ACTA PRO permite registrar compromisos con:

- responsable;
- descripción;
- fecha límite;
- estado.

Estados contemplados:

- pendiente;
- en progreso;
- completado;
- vencido.

El módulo de seguimiento permite registrar avances posteriores vinculados a los acuerdos definidos durante una reunión.

---

## 10. Historial institucional

El prototipo incluye vistas para:

- estudiantes;
- representantes;
- reuniones;
- actas;
- compromisos;
- seguimientos;
- archivo;
- notificaciones;
- auditoría.

El perfil del estudiante puede mostrar:

- cantidad de reuniones;
- actas asociadas;
- compromisos abiertos;
- seguimientos pendientes;
- línea de tiempo de encuentros.

---

## 11. Analítica

El dashboard institucional incluye indicadores demostrativos como:

- reuniones realizadas;
- actas completadas;
- tiempo promedio de generación;
- compromisos registrados;
- porcentaje de cumplimiento;
- reuniones por mes;
- motivos de reunión.

**ACTA PRO no realiza diagnósticos psicológicos automáticos de estudiantes.**

---

## 12. Roles contemplados

### Docente

Puede gestionar reuniones, revisar actas, aprobar contenido, firmar y consultar seguimientos.

### Coordinador

Conceptualmente puede revisar reuniones, actas, seguimientos e indicadores de su área.

### DECE

Está pensado para visualizar únicamente información autorizada y seguimientos relevantes.

### Administrador

Está contemplado para configuración, permisos, auditoría y gestión institucional.

---

## 13. Privacidad y gobernanza

ACTA PRO se diseña bajo los siguientes principios:

- privacidad por diseño;
- acceso restringido;
- mínimo privilegio;
- consentimiento informado;
- revisión humana;
- trazabilidad;
- auditoría;
- protección de información institucional.

La interfaz comunica estos principios mediante estados como:

- 🔒 Privado;
- 👁 Acceso restringido;
- 📋 Auditoría activa.

---

## 14. Arquitectura conceptual

El ecosistema proyectado de ACTA PRO contempla:

```text
Runachay
   ↓
Google Calendar
   ↓
ACTA PRO
   ↓
Preparación de reunión
   ↓
Transcripción / identificación de hablantes
   ↓
ACTA AI
   ↓
Revisión humana
   ↓
Firma
   ↓
Acta final
   ↓
PDF / Archivo / Correo
   ↓
Seguimiento
```

---

## 15. Integraciones proyectadas

El MVP está preparado conceptualmente para evolucionar hacia integraciones reales con:

- Google Calendar API;
- Runachay API;
- Speech-to-Text;
- Speaker Diarization;
- OpenAI API;
- Google Drive;
- Gmail;
- Supabase o Firebase;
- n8n;
- generación PDF;
- firma digital institucional.

Actualmente varias de estas integraciones funcionan mediante datos simulados o lógica demostrativa.

---

## 16. Automatización futura con n8n

Flujo proyectado:

```text
Google Calendar
      ↓
Detectar reunión
      ↓
Consultar datos institucionales
      ↓
Preparar ACTA PRO
      ↓
Registrar reunión
      ↓
Procesar conversación
      ↓
Generar acta
      ↓
Revisión humana
      ↓
Firma
      ↓
PDF
      ↓
Google Drive
      ↓
Correo
      ↓
Seguimiento
```

---

## 17. Estructura funcional de datos

El diseño del sistema contempla entidades como:

- User;
- Teacher;
- Student;
- Guardian;
- Meeting;
- Participant;
- Transcript;
- TranscriptSegment;
- Evidence;
- Agreement;
- Commitment;
- Act;
- Signature;
- Notification;
- FollowUp;
- AuditLog.

---

## 18. Stack actual del prototipo

La versión desplegada actualmente funciona como aplicación web estática con:

- HTML;
- CSS;
- JavaScript;
- localStorage;
- datos mock;
- GitHub Pages.

El código se encuentra modularizado en archivos de interfaz, flujo, voz y lógica complementaria.

El roadmap técnico contempla una migración posterior hacia una arquitectura más escalable con React / Next.js / TypeScript y backend persistente.

---

## 19. Archivos principales del MVP

```text
index.html
styles-v5.css
app-v5a1.js
app-v5a2.js
app-v5b1.js
init-v5.js
flow-v66-core.js
flow-v66-demo.js
flow-v66.css
speech-v67a.js
speech-v67.css
simple-v68.css
README.md
```

Algunos archivos representan iteraciones previas del prototipo y permanecen en el repositorio como evidencia de evolución.

---

## 20. Demo ejecutiva

El flujo de demostración fue simplificado para que pueda explicarse en aproximadamente 2–3 minutos.

La barra superior muestra únicamente:

**Planificar → Sincronizar → Preparar → En vivo → Acta → Firma → Cierre**

La interfaz evita duplicar el flujo y prioriza la acción actual del usuario.

Objetivo de la demo:

> que un directivo pueda entender ACTA PRO sin necesidad de recibir una explicación técnica extensa.

---

## 21. Caso demostrativo

El MVP contiene datos ficticios para realizar una demostración completa.

Ejemplo de flujo:

1. seleccionar una reunión;
2. sincronizar información;
3. preparar participantes;
4. confirmar consentimiento;
5. iniciar reunión;
6. simular conversación;
7. observar análisis de ACTA AI;
8. registrar compromisos;
9. finalizar reunión;
10. generar acta;
11. editar y aprobar;
12. firmar;
13. visualizar acta final;
14. descargar PDF;
15. consultar el archivo digital.

---

## 22. Estado actual del MVP

### Implementado

- Landing page.
- Login demo.
- Dashboard.
- Gestión de reuniones.
- Nueva reunión.
- Simulación Calendar.
- Simulación Runachay.
- Preparación de participantes.
- Consentimiento.
- Sala de reunión.
- Transcripción demo.
- Identificación de hablantes en la simulación.
- ACTA AI.
- Alertas de lenguaje subjetivo.
- Solicitud de evidencia.
- Detección de acuerdos.
- Evidencias.
- Compromisos.
- Generación de acta.
- Revisión humana.
- Comparación con transcripción original.
- Firma táctil.
- Persistencia de firmas en nuevas actas.
- Acta final institucional.
- Vista de acta final.
- Descarga / impresión como PDF.
- Archivo digital.
- Seguimientos.
- Notificaciones.
- Analítica demo.
- Auditoría.
- GitHub Pages.

### Simulado / pendiente de integración real

- autenticación institucional;
- Google OAuth real;
- Google Calendar API;
- Runachay API;
- reconocimiento robusto de voz;
- diarización real de hablantes;
- análisis IA con API productiva;
- envío real por Gmail;
- almacenamiento real en Drive;
- base de datos multiusuario;
- firma con validez jurídica avanzada;
- automatización productiva con n8n.

---

## 23. Roadmap

### Fase 1 — MVP demostrativo

✅ Flujo funcional completo.

### Fase 2 — Integraciones reales

- Calendar;
- Runachay;
- IA;
- voz;
- correo;
- Drive.

### Fase 3 — Backend institucional

- autenticación;
- roles;
- base de datos;
- control de permisos;
- auditoría persistente.

### Fase 4 — Inteligencia institucional

- indicadores de seguimiento;
- trazabilidad longitudinal;
- alertas de compromisos;
- analítica operativa;
- ecosistema de evidencia institucional.

---

## 24. Visión

ACTA PRO no busca únicamente generar documentos.

La visión es construir un **ecosistema de evidencia institucional**, donde cada reunión se convierta en información útil para acompañar al estudiante, fortalecer la relación entre familia, docente e institución y mantener trazabilidad sobre los acuerdos establecidos.

### Principios de marca

**Lo que se conversa, se escucha.**

**Lo que se acuerda, se evidencia.**

**Lo que se registra, se protege.**

---

## 25. Mensaje de cierre

> **Menos tiempo documentando. Más tiempo conectando.**

ACTA PRO convierte una tarea administrativa en un proceso inteligente, verificable y centrado en las personas.
