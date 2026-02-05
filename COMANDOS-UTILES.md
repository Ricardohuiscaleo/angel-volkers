# 🛠️ Comandos Útiles - Angel & Völkers

## 📦 NPM Scripts

```bash
# Desarrollo
npm run dev                 # Iniciar servidor de desarrollo
npm run build              # Build para producción
npm run preview            # Preview del build

# Base de datos
npm run db:generate        # Generar Prisma Client
npm run db:push           # Push schema a DB (desarrollo)
npm run db:migrate        # Crear migración (producción)
npm run db:studio         # Abrir Prisma Studio
```

## 🐳 Docker Commands

```bash
# Iniciar todos los servicios
docker-compose up -d

# Ver logs
docker-compose logs -f

# Detener servicios
docker-compose down

# Rebuild
docker-compose up -d --build

# Ver servicios corriendo
docker-compose ps

# Ejecutar comando en contenedor
docker-compose exec app npm run db:push
```

## 🗄️ PostgreSQL Commands

```bash
# Conectar a PostgreSQL
docker-compose exec postgres psql -U angelvolkers

# Backup de base de datos
docker-compose exec postgres pg_dump -U angelvolkers angelvolkers > backup.sql

# Restaurar backup
docker-compose exec -T postgres psql -U angelvolkers angelvolkers < backup.sql

# Ver tablas
\dt

# Describir tabla
\d properties

# Salir
\q
```

## 🔴 Redis Commands

```bash
# Conectar a Redis
docker-compose exec redis redis-cli

# Ver todas las keys
KEYS *

# Ver valor de una key
GET properties:list

# Eliminar key
DEL properties:list

# Eliminar todas las keys (¡CUIDADO!)
FLUSHALL

# Ver info de Redis
INFO

# Salir
exit
```

## 🔧 Prisma Commands

```bash
# Generar cliente
npx prisma generate

# Push schema (desarrollo)
npx prisma db push

# Crear migración
npx prisma migrate dev --name init

# Aplicar migraciones (producción)
npx prisma migrate deploy

# Reset database (¡CUIDADO!)
npx prisma migrate reset

# Abrir Prisma Studio
npx prisma studio

# Formatear schema
npx prisma format

# Validar schema
npx prisma validate
```

## 🧪 Testing API

### Test Properties API
```bash
# GET todas las propiedades
curl http://localhost:3000/api/properties

# GET con filtros
curl "http://localhost:3000/api/properties?type=casa&city=Santiago"

# POST nueva propiedad
curl -X POST http://localhost:3000/api/properties \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Casa en Las Condes",
    "description": "Hermosa casa con jardín",
    "price": 250000000,
    "type": "casa",
    "operation": "venta",
    "bedrooms": 4,
    "bathrooms": 3,
    "area": 200,
    "address": "Av. Las Condes 1234",
    "city": "Santiago",
    "region": "Metropolitana"
  }'
```

### Test Leads API
```bash
# POST nuevo lead
curl -X POST http://localhost:3000/api/leads \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Juan Pérez",
    "email": "juan@example.com",
    "phone": "+56912345678",
    "message": "Me interesa una casa en Las Condes"
  }'
```

### Test Chatwoot Webhook
```bash
curl -X POST http://localhost:3000/api/webhooks/chatwoot \
  -H "Content-Type: application/json" \
  -d '{
    "event": "message_created",
    "conversation": {
      "id": 1,
      "contact_id": 1
    },
    "message": {
      "content": "Quiero agendar una visita",
      "message_type": "incoming"
    }
  }'
```

## 🔍 Debugging

```bash
# Ver logs de la aplicación
docker-compose logs -f app

# Ver logs de PostgreSQL
docker-compose logs -f postgres

# Ver logs de Redis
docker-compose logs -f redis

# Ver logs de n8n (si está en Docker)
docker logs -f n8n

# Ver logs de Chatwoot (si está en Docker)
docker logs -f chatwoot
```

## 🧹 Limpieza

```bash
# Limpiar node_modules
rm -rf node_modules
npm install

# Limpiar build
rm -rf dist .astro

# Limpiar Docker
docker-compose down -v  # Elimina volúmenes también
docker system prune -a  # Limpia todo Docker

# Limpiar cache de Redis
docker-compose exec redis redis-cli FLUSHALL
```

## 📊 Monitoreo

```bash
# Ver uso de recursos
docker stats

# Ver espacio en disco
df -h

# Ver memoria
free -h

# Ver procesos
top

# Ver conexiones de red
netstat -tulpn
```

## 🚀 Deployment

```bash
# Build para producción
npm run build

# Test del build
npm run preview

# Deploy con Docker
docker-compose -f docker-compose.prod.yml up -d

# Ver status
docker-compose ps

# Ver logs de producción
docker-compose logs -f --tail=100
```

## 🔐 Seguridad

```bash
# Generar secret key
openssl rand -base64 32

# Ver puertos abiertos
sudo netstat -tulpn | grep LISTEN

# Verificar SSL
curl -I https://tudominio.com

# Test de seguridad
npm audit

# Fix vulnerabilidades
npm audit fix
```

## 📝 Git Commands

```bash
# Inicializar repo
git init
git add .
git commit -m "Initial commit"

# Crear branch
git checkout -b feature/nueva-funcionalidad

# Push a GitHub
git remote add origin https://github.com/tu-usuario/angel-volkers.git
git push -u origin main

# Ver cambios
git status
git diff

# Revertir cambios
git checkout -- archivo.ts
```

## 🎨 Desarrollo Frontend

```bash
# Instalar shadcn/ui component
npx shadcn-ui@latest add button

# Generar tipos de TypeScript
npm run astro check

# Formatear código (si tienes Prettier)
npx prettier --write "src/**/*.{ts,tsx,astro}"

# Lint (si tienes ESLint)
npx eslint "src/**/*.{ts,tsx}"
```

## 🤖 n8n Commands

```bash
# Exportar workflow
curl -X GET http://localhost:5678/api/v1/workflows/1 \
  -H "X-N8N-API-KEY: tu-api-key" > workflow.json

# Importar workflow
curl -X POST http://localhost:5678/api/v1/workflows \
  -H "X-N8N-API-KEY: tu-api-key" \
  -H "Content-Type: application/json" \
  -d @workflow.json

# Activar workflow
curl -X PATCH http://localhost:5678/api/v1/workflows/1 \
  -H "X-N8N-API-KEY: tu-api-key" \
  -H "Content-Type: application/json" \
  -d '{"active": true}'
```

## 💬 Chatwoot Commands

```bash
# Crear contacto
curl -X POST https://chatwoot.tudominio.com/api/v1/accounts/1/contacts \
  -H "api_access_token: tu-api-key" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Juan Pérez",
    "email": "juan@example.com",
    "phone_number": "+56912345678"
  }'

# Enviar mensaje
curl -X POST https://chatwoot.tudominio.com/api/v1/accounts/1/conversations/1/messages \
  -H "api_access_token: tu-api-key" \
  -H "Content-Type: application/json" \
  -d '{
    "content": "Hola, ¿en qué puedo ayudarte?",
    "message_type": "outgoing"
  }'
```

## 📈 Performance

```bash
# Analizar bundle size
npm run build
du -sh dist/*

# Test de carga con Apache Bench
ab -n 1000 -c 10 http://localhost:3000/

# Test de carga con wrk
wrk -t12 -c400 -d30s http://localhost:3000/

# Lighthouse audit
npx lighthouse http://localhost:3000 --view
```

## 🔄 Backup & Restore

```bash
# Backup completo
./scripts/backup.sh

# Backup solo DB
docker-compose exec postgres pg_dump -U angelvolkers angelvolkers > backup-$(date +%Y%m%d).sql

# Backup Redis
docker-compose exec redis redis-cli SAVE
docker cp redis:/data/dump.rdb ./backup-redis-$(date +%Y%m%d).rdb

# Restore DB
docker-compose exec -T postgres psql -U angelvolkers angelvolkers < backup-20240101.sql

# Restore Redis
docker cp backup-redis-20240101.rdb redis:/data/dump.rdb
docker-compose restart redis
```

## 🎯 Shortcuts Útiles

```bash
# Alias útiles (agregar a ~/.bashrc o ~/.zshrc)
alias av-dev="cd ~/Angel_Volkers && npm run dev"
alias av-logs="cd ~/Angel_Volkers && docker-compose logs -f"
alias av-db="cd ~/Angel_Volkers && npm run db:studio"
alias av-build="cd ~/Angel_Volkers && npm run build"
alias av-deploy="cd ~/Angel_Volkers && git push && ssh vps 'cd /app && git pull && docker-compose up -d --build'"
```

---

**Guarda este archivo como referencia rápida** 📚
