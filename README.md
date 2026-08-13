# ACTA PRO — MVP v2

## Estado actual

Esta versión inicia la conexión directa **Google Calendar → ACTA PRO**, sin n8n.

### Ya preparado
- Interfaz navegable.
- Login OAuth de Google Calendar.
- Lectura de eventos del calendario principal.
- Filtro de reuniones `[ACTA PRO]`.
- Preparación automática de la ficha de reunión.
- Extracción de datos desde la descripción del evento.
- Selección de participantes.
- Modo demo si aún no existe Client ID.

### Próxima fase
- Micrófono y Speech-to-Text.
- Separación de hablantes.
- Generación de acta con IA.
- Firma.
- Google Drive.
- Gmail.
- Repositorio real.
- Runachay API.

## Formato recomendado del evento

Título:

`[ACTA PRO] Juan Pérez - Seguimiento académico`

Descripción:

```text
Estudiante: Juan Pérez
Representante: María López
Correo: maria.lopez@email.com
Curso: 7.º EGB A
Motivo: Seguimiento académico
```

## Configurar Google Calendar

1. Crea un proyecto en Google Cloud.
2. Habilita Google Calendar API.
3. Configura OAuth Consent Screen.
4. Crea un OAuth Client ID tipo Web application.
5. Añade el dominio donde alojarás ACTA PRO a Authorized JavaScript origins.
6. Copia el Client ID.
7. Sustituye el placeholder de `config.js`.

**No pongas Client Secret en este proyecto frontend.**
