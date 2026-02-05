# 🤖 Workflows de n8n

## Workflows Incluidos

### 1. Lead Capture & Qualification (`lead-capture.json`)
**Descripción**: Captura y califica leads automáticamente

**Trigger**: Webhook POST `/webhook/lead-capture`

**Flujo**:
1. Recibe datos del lead
2. Evalúa score de calidad
3. Si score >= 70: Envía notificación prioritaria a agentes
4. Envía email de confirmación al lead
5. Registra en CRM

**Variables necesarias**:
- `SMTP_HOST`
- `SMTP_USER`
- `SMTP_PASS`

---

### 2. Chatwoot AI Assistant (`chatwoot-ai.json`)
**Descripción**: Asistente con IA para responder consultas en Chatwoot

**Trigger**: Webhook POST `/webhook/chatwoot-message`

**Flujo**:
1. Recibe mensaje de Chatwoot
2. Procesa con OpenAI GPT-4
3. Genera respuesta inteligente
4. Detecta intención de agendar visita
5. Si es visita: Asigna a agente humano
6. Envía respuesta a Chatwoot

**Variables necesarias**:
- `OPENAI_API_KEY`
- `CHATWOOT_URL`
- `CHATWOOT_API_KEY`
- `CHATWOOT_ACCOUNT_ID`

---

### 3. Property Alerts (Próximamente)
**Descripción**: Notifica a usuarios cuando hay propiedades que coinciden con sus búsquedas guardadas

---

### 4. Visit Management (Próximamente)
**Descripción**: Gestiona agendamiento de visitas con recordatorios automáticos

---

## Cómo Importar en n8n

### Opción 1: Interfaz Web
1. Ir a n8n dashboard
2. Click en "Workflows" → "Import from File"
3. Seleccionar archivo JSON
4. Configurar credenciales
5. Activar workflow

### Opción 2: CLI
```bash
# Copiar archivos al contenedor de n8n
docker cp lead-capture.json n8n:/home/node/.n8n/workflows/

# Reiniciar n8n
docker restart n8n
```

## Configuración de Credenciales

### OpenAI
1. Settings → Credentials → Add Credential
2. Tipo: OpenAI
3. API Key: `sk-...`

### Chatwoot
1. Settings → Credentials → Add Credential
2. Tipo: HTTP Header Auth
3. Name: `api_access_token`
4. Value: Tu API key de Chatwoot

### SMTP
1. Settings → Credentials → Add Credential
2. Tipo: SMTP
3. Configurar host, puerto, usuario y contraseña

## Testing de Webhooks

### Test Lead Capture
```bash
curl -X POST https://n8n.tudominio.com/webhook/lead-capture \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Juan Pérez",
    "email": "juan@example.com",
    "phone": "+56912345678",
    "message": "Interesado en departamento",
    "score": 80
  }'
```

### Test Chatwoot AI
```bash
curl -X POST https://n8n.tudominio.com/webhook/chatwoot-message \
  -H "Content-Type: application/json" \
  -d '{
    "conversationId": "123",
    "contactId": "456",
    "message": "Quiero agendar una visita"
  }'
```

## Monitoreo

### Ver Ejecuciones
1. Ir a workflow
2. Tab "Executions"
3. Ver logs y resultados

### Alertas de Errores
Configurar en Settings → Workflows → Error Workflow
- Enviar email cuando falla
- Notificar en Slack
- Registrar en logs

## Mejores Prácticas

1. **Siempre usar Try-Catch**: Envolver nodos críticos
2. **Timeouts**: Configurar timeouts apropiados
3. **Rate Limiting**: Controlar frecuencia de ejecuciones
4. **Logs**: Agregar nodos de log para debugging
5. **Testing**: Probar en ambiente de desarrollo primero

## Troubleshooting

### Webhook no responde
- Verificar que el workflow esté activo
- Revisar URL del webhook
- Verificar firewall/proxy

### Error de credenciales
- Verificar que las credenciales estén configuradas
- Revisar permisos de API keys
- Verificar expiración de tokens

### OpenAI timeout
- Aumentar timeout del nodo
- Usar modelo más rápido (gpt-3.5-turbo)
- Implementar retry logic

## Próximas Automatizaciones

- [ ] Sincronización con portales inmobiliarios
- [ ] Reportes automáticos semanales
- [ ] Seguimiento de leads fríos
- [ ] Análisis de sentimiento en conversaciones
- [ ] Predicción de conversión con ML
