# 🤖 Workflows de n8n con RAG

## Workflows Implementados

### 1. **Chatbot Inmobiliario RAG** (`chatbot-rag.json`)
**Webhook**: `/webhook/chatwoot-rag`

**Funcionalidad**:
- Recibe mensajes de Chatwoot
- Consulta propiedades disponibles en la BD
- Usa GPT-4 con RAG para responder con contexto
- Envía respuesta automática a Chatwoot

**Ejemplo de uso**:
```bash
curl -X POST https://proyecto1-n8n.dj3bvg.easypanel.host/webhook/chatwoot-rag \
  -H "Content-Type: application/json" \
  -d '{
    "conversation_id": "123",
    "message": "Busco un departamento en Providencia de 2 dormitorios"
  }'
```

---

### 2. **Lead Capture Inteligente RAG** (`lead-capture-rag.json`)
**Webhook**: `/webhook/lead-capture-rag`

**Funcionalidad**:
- Analiza el mensaje del lead con IA
- Extrae intención, tipo de propiedad, ubicación, presupuesto
- Calcula score de calidad (0-100)
- Guarda en BD con metadata enriquecida
- Si score >= 70: Crea contacto prioritario en Chatwoot

**Ejemplo de uso**:
```bash
curl -X POST https://proyecto1-n8n.dj3bvg.easypanel.host/webhook/lead-capture-rag \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Juan Pérez",
    "email": "juan@example.com",
    "phone": "+56912345678",
    "message": "Necesito urgente una casa en Las Condes, presupuesto 500M"
  }'
```

---

### 3. **Recomendador de Propiedades RAG** (`property-recommender-rag.json`)
**Webhook**: `/webhook/property-recommender`

**Funcionalidad**:
- Usuario describe lo que busca en lenguaje natural
- IA genera query SQL optimizado
- Busca en BD las mejores coincidencias
- Formatea recomendaciones personalizadas

**Ejemplo de uso**:
```bash
curl -X POST https://proyecto1-n8n.dj3bvg.easypanel.host/webhook/property-recommender \
  -H "Content-Type: application/json" \
  -d '{
    "userQuery": "Quiero algo cerca del metro, máximo 200 millones, que tenga estacionamiento"
  }'
```

---

## 📥 Cómo Importar en n8n

### Opción 1: Interfaz Web
1. Ir a n8n: https://proyecto1-n8n.dj3bvg.easypanel.host
2. Click en **Workflows** → **Import from File**
3. Seleccionar cada archivo JSON
4. Configurar credenciales (ver abajo)
5. Activar workflow

### Opción 2: API (Automático)
```bash
for file in n8n-workflows/*.json; do
  curl -X POST https://proyecto1-n8n.dj3bvg.easypanel.host/api/v1/workflows \
    -H "X-N8N-API-KEY: $N8N_API_KEY" \
    -H "Content-Type: application/json" \
    -d @"$file"
done
```

---

## 🔑 Configuración de Credenciales

### 1. PostgreSQL
- **Name**: `PostgreSQL Angel Volkers`
- **Host**: `agenterag-com_db-angel-volkers`
- **Port**: `5432`
- **Database**: `DB_Angel-volkers`
- **User**: `postgres`
- **Password**: (desde Easypanel)

### 2. OpenAI
- **Name**: `OpenAI`
- **API Key**: Tu OpenAI API Key

### 3. Chatwoot API
- **Name**: `Chatwoot API`
- **Header Name**: `api_access_token`
- **Header Value**: Tu Chatwoot API Key

---

## 🧪 Testing

### Test Chatbot RAG
```bash
curl -X POST https://proyecto1-n8n.dj3bvg.easypanel.host/webhook/chatwoot-rag \
  -d '{"conversation_id":"test","message":"¿Qué propiedades tienen?"}'
```

### Test Lead Capture
```bash
curl -X POST https://proyecto1-n8n.dj3bvg.easypanel.host/webhook/lead-capture-rag \
  -d '{"name":"Test","email":"test@test.com","phone":"+56900000000","message":"Busco departamento"}'
```

### Test Recomendador
```bash
curl -X POST https://proyecto1-n8n.dj3bvg.easypanel.host/webhook/property-recommender \
  -d '{"userQuery":"Departamento 2 dormitorios Santiago centro"}'
```

---

## 🔗 Integración con la App

En tu aplicación, usa el helper de n8n:

```typescript
import { sendToN8N } from './src/lib/n8n';

// Capturar lead con análisis IA
await sendToN8N('lead-capture-rag', {
  name: formData.name,
  email: formData.email,
  phone: formData.phone,
  message: formData.message
});

// Obtener recomendaciones
const recommendations = await sendToN8N('property-recommender', {
  userQuery: 'Casa en Las Condes con jardín'
});
```

---

## 📊 Ventajas del RAG

✅ **Respuestas contextualizadas**: Usa datos reales de tu BD  
✅ **Siempre actualizado**: No necesita reentrenamiento  
✅ **Más preciso**: Combina IA con datos estructurados  
✅ **Escalable**: Funciona con miles de propiedades  
✅ **Multilingüe**: Entiende español chileno y formal  

---

## 🚀 Próximas Mejoras

- [ ] Vector embeddings para búsqueda semántica
- [ ] Historial de conversaciones
- [ ] Análisis de sentimiento
- [ ] Predicción de conversión
- [ ] A/B testing de respuestas
