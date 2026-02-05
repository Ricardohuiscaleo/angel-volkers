# Arquitectura n8n Optimizada - Angel & Völkers

## 📋 Workflows Activos

### 1. **chatwoot-main.json** (Principal)
**Webhook:** `/webhook/chatwoot`
**Función:** Recibe mensajes de Chatwoot, clasifica intención, ejecuta acciones y responde

**Flujo:**
```
Chatwoot → Filtrar incoming → Clasificar con AI → Etiquetar → Switch → Acción → Responder
```

**Intenciones clasificadas:**
- `BUSQUEDA_PROPIEDAD`: Llama a property-recommender
- `CONSULTA_PROPIEDAD`: Llama a property-recommender
- `AGENDAR_VISITA`: Respuesta automática + notificación
- `LEAD_CALIFICADO`: Guarda en BD + crea contacto
- `CONSULTA_GENERAL`: Responde con AI
- `SPAM`: Ignora

**Etiquetas automáticas en Chatwoot:**
- Intención: `BUSQUEDA_PROPIEDAD`, `LEAD_CALIFICADO`, etc.
- Score: `score_70`, `score_80`, `score_90`
- Urgencia: `baja`, `media`, `alta`

---

### 2. **property-recommender-rag.json**
**Webhook:** `/webhook/property-recommender`
**Función:** Búsqueda inteligente de propiedades con SQL generado por AI

**Entrada:**
```json
{
  "userQuery": "Busco departamento 2 dormitorios en Providencia"
}
```

**Salida:**
```json
{
  "success": true,
  "recommendations": "Texto personalizado...",
  "properties": [...],
  "count": 5
}
```

---

### 3. **lead-capture-rag.json** (Deprecado - integrado en main)
### 4. **chatbot-rag.json** (Deprecado - integrado en main)
### 5. **rag-orchestrator.json** (Deprecado - reemplazado por chatwoot-main)

---

## 🔧 Configuración

### Variables de Entorno (.env)
```bash
# PostgreSQL
DATABASE_URL="postgresql://user:pass@host:5432/db"

# Chatwoot
CHATWOOT_URL="https://chatwoot.agenterag.com"
CHATWOOT_ACCOUNT_ID="1"
CHATWOOT_API_KEY="tu_api_key"

# n8n
N8N_WEBHOOK_URL="https://proyecto1-n8n.dj3bvg.easypanel.host"

# OpenAI
OPENAI_API_KEY="sk-..."
```

### Credenciales en n8n

1. **PostgreSQL** (nombre: "PostgreSQL Angel Volkers")
   - Host: agenterag-com_db-angel-volkers
   - Port: 5432
   - Database: DB_Angel-volkers
   - User: postgres
   - Password: [tu password]

2. **Chatwoot API** (nombre: "Chatwoot API")
   - Tipo: Header Auth
   - Header: `api_access_token`
   - Value: `QE7uYVApKM2H5M13X4yc4B1B`

3. **OpenAI** (nombre: "OpenAI")
   - API Key: [tu key]

---

## 📱 Configurar Chatwoot

### 1. Crear Webhook en Chatwoot
```
Settings → Integrations → Webhooks → Add Webhook

URL: https://proyecto1-n8n.dj3bvg.easypanel.host/webhook/chatwoot
Events: message_created
```

### 2. Crear Etiquetas (Labels)
```
BUSQUEDA_PROPIEDAD
CONSULTA_PROPIEDAD
AGENDAR_VISITA
LEAD_CALIFICADO
CONSULTA_GENERAL
SPAM
score_50, score_60, score_70, score_80, score_90, score_100
baja, media, alta
```

### 3. Instalar Widget en Web
```html
<script>
  (function(d,t) {
    var BASE_URL="https://chatwoot.agenterag.com";
    var g=d.createElement(t),s=d.getElementsByTagName(t)[0];
    g.src=BASE_URL+"/packs/js/sdk.js";
    g.defer = true;
    g.async = true;
    s.parentNode.insertBefore(g,s);
    g.onload=function(){
      window.chatwootSDK.run({
        websiteToken: 'TU_WEBSITE_TOKEN',
        baseUrl: BASE_URL
      })
    }
  })(document,"script");
</script>
```

---

## 🚀 Despliegue

### 1. Importar workflows en n8n
```bash
# Accede a n8n: https://proyecto1-n8n.dj3bvg.easypanel.host
# Workflows → Import from File
# Importa: chatwoot-main.json, property-recommender-rag.json
```

### 2. Configurar credenciales
- PostgreSQL
- Chatwoot API
- OpenAI

### 3. Activar workflows
- ✅ chatwoot-main
- ✅ property-recommender-rag

### 4. Probar
```bash
# Test desde Chatwoot
# Envía mensaje: "Busco casa en Las Condes"
# Verifica: Etiquetas automáticas + Respuesta AI
```

---

## 📊 Monitoreo

### Ver ejecuciones en n8n
```
Executions → Filtrar por workflow
```

### Ver conversaciones clasificadas en Chatwoot
```
Conversations → Filtrar por etiqueta
```

### Ver leads en BD
```sql
SELECT * FROM "Lead" ORDER BY score DESC, "createdAt" DESC;
```

---

## 🎯 Próximos Pasos

1. ✅ Workflow principal con clasificación
2. ✅ Búsqueda de propiedades
3. ⏳ Agendamiento de visitas (calendario)
4. ⏳ Notificaciones a agentes (email/SMS)
5. ⏳ Dashboard de leads
6. ⏳ Integración con portales inmobiliarios
