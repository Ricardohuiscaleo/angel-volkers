# 🚀 Guía Easypanel - Angel & Völkers

## Paso 1: Crear App en Easypanel

### Configuración Básica
```
Name: angel-volkers
Type: App
Source: GitHub (o Git)
```

### Conectar Repositorio
1. Conecta tu cuenta de GitHub
2. Selecciona el repositorio `Angel_Volkers`
3. Branch: `main`

## Paso 2: Configuración de Build

### Build Settings
```
Build Command: npm install && npm run db:generate && npm run build
Start Command: node ./dist/server/entry.mjs
Port: 3000
```

### Dockerfile (Alternativa)
Si prefieres usar Docker, Easypanel detectará automáticamente el `Dockerfile` que ya tienes.

## Paso 3: Variables de Entorno

En Easypanel → Tu App → Environment Variables, agrega:

```env
# Base de datos (conectar con servicio PostgreSQL de Easypanel)
DATABASE_URL=postgresql://angelvolkers:TU_PASSWORD@postgres:5432/angelvolkers

# Redis (conectar con servicio Redis de Easypanel)
REDIS_URL=redis://redis:6379
REDIS_PASSWORD=

# n8n (si lo tienes en Easypanel)
N8N_WEBHOOK_URL=https://n8n.tudominio.com/webhook
N8N_API_KEY=tu-api-key

# Chatwoot (si lo tienes en Easypanel)
CHATWOOT_URL=https://chatwoot.tudominio.com
CHATWOOT_API_KEY=tu-api-key
CHATWOOT_ACCOUNT_ID=1
CHATWOOT_INBOX_ID=1
PUBLIC_CHATWOOT_WEBSITE_TOKEN=tu-website-token

# OpenAI
OPENAI_API_KEY=sk-...

# Email (opcional)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=tu-email@gmail.com
SMTP_PASS=tu-password

# App
PUBLIC_SITE_URL=https://angel-volkers.tudominio.com
NODE_ENV=production
```

## Paso 4: Crear Servicios Necesarios

### PostgreSQL
1. En Easypanel → Services → Add Service
2. Selecciona: PostgreSQL
3. Configuración:
   ```
   Name: postgres
   Database: angelvolkers
   User: angelvolkers
   Password: [genera uno seguro]
   ```
4. Copia la URL de conexión y úsala en `DATABASE_URL`

### Redis
1. En Easypanel → Services → Add Service
2. Selecciona: Redis
3. Configuración:
   ```
   Name: redis
   Password: [opcional]
   ```
4. Usa `redis://redis:6379` en `REDIS_URL`

## Paso 5: Configurar Dominio

### En Easypanel
1. Ve a tu app → Domains
2. Agrega tu dominio: `angel-volkers.tudominio.com`
3. Easypanel configurará SSL automáticamente

### En tu proveedor de DNS
Agrega un registro A o CNAME:
```
Type: A
Name: angel-volkers
Value: [IP de tu VPS]
```

## Paso 6: Migrar Base de Datos

### Desde tu local
```bash
# Instalar dependencias
npm install

# Generar Prisma Client
npm run db:generate

# Conectar a la DB de Easypanel y crear tablas
DATABASE_URL="postgresql://angelvolkers:PASSWORD@tu-vps-ip:5432/angelvolkers" npm run db:push
```

### Desde Easypanel Terminal
1. Ve a tu app → Terminal
2. Ejecuta:
```bash
npm run db:push
```

## Paso 7: Deploy

1. Haz commit y push de tu código a GitHub
2. Easypanel detectará el cambio y hará deploy automáticamente
3. O haz deploy manual: App → Deploy → Deploy Now

## Paso 8: Verificar Deployment

### Logs
1. Ve a tu app → Logs
2. Verifica que no haya errores
3. Busca: "Server running on port 3000"

### Acceder a la app
Visita: `https://angel-volkers.tudominio.com`

## Paso 9: Configurar n8n (si lo tienes)

### Si n8n está en Easypanel
1. Importa los workflows desde `n8n-workflows/`
2. Configura las credenciales (OpenAI, SMTP, Chatwoot)
3. Activa los workflows

### Webhooks
Los webhooks de tu app estarán en:
```
https://angel-volkers.tudominio.com/api/webhooks/chatwoot
```

## Paso 10: Configurar Chatwoot (si lo tienes)

### Crear Inbox
1. Chatwoot → Settings → Inboxes → Add Inbox
2. Tipo: Website
3. Website URL: `https://angel-volkers.tudominio.com`
4. Copia el Website Token
5. Agrégalo a las variables de entorno como `PUBLIC_CHATWOOT_WEBSITE_TOKEN`

### Configurar Webhook
1. Chatwoot → Settings → Integrations → Webhooks
2. URL: `https://n8n.tudominio.com/webhook/chatwoot`
3. Eventos: `message_created`, `conversation_created`

## 🎯 Checklist de Deployment

- [ ] App creada en Easypanel
- [ ] Repositorio conectado
- [ ] Build command configurado
- [ ] Variables de entorno agregadas
- [ ] PostgreSQL creado y conectado
- [ ] Redis creado y conectado
- [ ] Dominio configurado
- [ ] SSL activo (automático)
- [ ] Base de datos migrada
- [ ] Deploy exitoso
- [ ] App accesible en el dominio
- [ ] Logs sin errores

## 🔧 Comandos Útiles en Easypanel Terminal

```bash
# Ver logs en tiempo real
npm run dev

# Verificar conexión a DB
npx prisma db push

# Ver tablas creadas
npx prisma studio

# Reiniciar app
# (Usa el botón Restart en Easypanel)
```

## 🆘 Troubleshooting

### Error: Cannot connect to database
- Verifica que el servicio PostgreSQL esté corriendo
- Verifica la `DATABASE_URL` en variables de entorno
- Verifica que la base de datos `angelvolkers` exista

### Error: Redis connection refused
- Verifica que el servicio Redis esté corriendo
- Verifica la `REDIS_URL` en variables de entorno

### Error: Build failed
- Revisa los logs de build
- Verifica que `package.json` esté correcto
- Verifica que todas las dependencias estén instaladas

### App no carga
- Verifica los logs de la app
- Verifica que el puerto sea 3000
- Verifica que el dominio esté configurado correctamente

## 📊 Monitoreo en Easypanel

Easypanel incluye:
- ✅ Logs en tiempo real
- ✅ Métricas de CPU y memoria
- ✅ Reinicio automático si falla
- ✅ SSL automático
- ✅ Backups (si está configurado)

## 🚀 Próximos Pasos

1. **Agregar datos de prueba**: Usa Prisma Studio para agregar propiedades
2. **Configurar n8n**: Importa los workflows
3. **Configurar Chatwoot**: Conecta el widget
4. **Testing**: Prueba todas las funcionalidades
5. **Optimización**: Ajusta cache y performance

## 💡 Tips

- **Auto-deploy**: Easypanel hace deploy automático en cada push a GitHub
- **Rollback**: Puedes volver a versiones anteriores fácilmente
- **Escalado**: Aumenta recursos desde el dashboard
- **Backups**: Configura backups automáticos de PostgreSQL

---

**¡Tu app está lista para producción! 🎉**
