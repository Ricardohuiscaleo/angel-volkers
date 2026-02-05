# 🚀 Migración a VPS con Easypanel

## Requisitos Previos

- VPS con Ubuntu 20.04+ (mínimo 2GB RAM)
- Easypanel instalado
- PostgreSQL configurado
- Redis configurado
- n8n instalado
- Chatwoot instalado
- Dominio configurado

## 1. Preparar el Proyecto

### Build de producción
```bash
npm run build
```

### Variables de entorno en Easypanel
```env
DATABASE_URL=postgresql://user:pass@postgres:5432/angelvolkers
REDIS_URL=redis://redis:6379
N8N_WEBHOOK_URL=https://n8n.tudominio.com/webhook
CHATWOOT_URL=https://chatwoot.tudominio.com
PUBLIC_SITE_URL=https://tudominio.com
NODE_ENV=production
```

## 2. Configurar en Easypanel

### Crear nueva aplicación
1. Ir a Easypanel Dashboard
2. Crear nuevo proyecto: `angel-volkers`
3. Tipo: Node.js Application
4. Puerto: 3000

### Configuración de Build
```yaml
Build Command: npm run build
Start Command: node ./dist/server/entry.mjs
```

### Servicios necesarios
- PostgreSQL (crear base de datos `angelvolkers`)
- Redis (ya disponible)
- Nginx Proxy Manager (para SSL)

## 3. Configurar PostgreSQL

```bash
# Conectar a PostgreSQL
psql -U postgres

# Crear base de datos
CREATE DATABASE angelvolkers;

# Crear usuario
CREATE USER angelvolkers_user WITH PASSWORD 'tu_password_seguro';

# Dar permisos
GRANT ALL PRIVILEGES ON DATABASE angelvolkers TO angelvolkers_user;
```

## 4. Migrar Base de Datos

```bash
# Desde tu local, conectar a VPS
DATABASE_URL="postgresql://user:pass@tu-vps-ip:5432/angelvolkers" npm run db:push
```

## 5. Configurar n8n

### Workflows a importar
1. `n8n-workflows/lead-capture.json`
2. `n8n-workflows/property-alerts.json`
3. `n8n-workflows/visit-management.json`
4. `n8n-workflows/chatwoot-integration.json`

### Configurar webhooks en n8n
- URL base: `https://n8n.tudominio.com/webhook/`
- Crear webhook para cada automatización

## 6. Configurar Chatwoot

### Crear Inbox
1. Ir a Settings → Inboxes
2. Crear nuevo Website Inbox
3. Copiar Website Token
4. Agregar a variables de entorno: `PUBLIC_CHATWOOT_WEBSITE_TOKEN`

### Configurar Webhooks
1. Settings → Integrations → Webhooks
2. URL: `https://n8n.tudominio.com/webhook/chatwoot`
3. Eventos: `message_created`, `conversation_created`

## 7. Configurar Nginx

### Archivo de configuración
```nginx
server {
    listen 80;
    server_name tudominio.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }
}
```

### SSL con Let's Encrypt
```bash
certbot --nginx -d tudominio.com
```

## 8. Configurar Redis Cache

### Estrategia de cache
- Propiedades: 5 minutos
- Búsquedas: 10 minutos
- Favoritos: 1 hora
- Estadísticas: 1 hora

## 9. Monitoreo

### PM2 (si no usas Easypanel)
```bash
npm install -g pm2
pm2 start dist/server/entry.mjs --name angel-volkers
pm2 save
pm2 startup
```

### Logs
```bash
pm2 logs angel-volkers
```

## 10. Backup Automático

### Script de backup (cron diario)
```bash
#!/bin/bash
DATE=$(date +%Y%m%d_%H%M%S)
pg_dump angelvolkers > /backups/db_$DATE.sql
find /backups -name "db_*.sql" -mtime +7 -delete
```

### Crontab
```bash
0 2 * * * /path/to/backup.sh
```

## 11. Optimizaciones

### Compresión Gzip
```nginx
gzip on;
gzip_types text/plain text/css application/json application/javascript;
```

### Cache de assets estáticos
```nginx
location ~* \.(jpg|jpeg|png|gif|ico|css|js)$ {
    expires 1y;
    add_header Cache-Control "public, immutable";
}
```

## 12. Seguridad

### Firewall
```bash
ufw allow 22
ufw allow 80
ufw allow 443
ufw enable
```

### Fail2ban
```bash
apt install fail2ban
systemctl enable fail2ban
```

## 13. Testing Post-Deploy

- [ ] Página principal carga correctamente
- [ ] Listado de propiedades funciona
- [ ] Formulario de contacto envía a n8n
- [ ] Chatwoot widget aparece
- [ ] Redis cache funciona
- [ ] Base de datos conecta
- [ ] SSL activo
- [ ] Webhooks de n8n responden

## 🎯 Checklist Final

- [ ] DNS apuntando al VPS
- [ ] SSL configurado
- [ ] Base de datos migrada
- [ ] Variables de entorno configuradas
- [ ] n8n workflows importados
- [ ] Chatwoot configurado
- [ ] Redis funcionando
- [ ] Backups automáticos
- [ ] Monitoreo activo
- [ ] Logs configurados

## 📊 Métricas a Monitorear

- Tiempo de respuesta < 2s
- Uptime > 99.9%
- Uso de memoria < 80%
- Uso de CPU < 70%
- Espacio en disco > 20% libre

## 🆘 Troubleshooting

### Error de conexión a DB
```bash
# Verificar que PostgreSQL está corriendo
systemctl status postgresql

# Verificar conexión
psql -U angelvolkers_user -d angelvolkers
```

### Error de Redis
```bash
# Verificar Redis
redis-cli ping
# Debe responder: PONG
```

### Error 502 Bad Gateway
```bash
# Verificar que la app está corriendo
pm2 status
# o en Easypanel verificar logs
```

## 📞 Soporte

Para problemas específicos, revisar:
- Logs de Easypanel
- Logs de n8n
- Logs de Chatwoot
- Logs de Nginx
