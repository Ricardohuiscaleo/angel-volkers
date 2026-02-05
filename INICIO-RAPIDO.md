# 🚀 Inicio Rápido - Angel & Völkers

## ✅ Lo que ya tienes creado

### Archivos de Configuración
- ✅ `package.json` - Dependencias del proyecto
- ✅ `astro.config.mjs` - Configuración de Astro
- ✅ `tailwind.config.mjs` - Configuración de TailwindCSS
- ✅ `tsconfig.json` - Configuración de TypeScript
- ✅ `.env.example` - Variables de entorno
- ✅ `.gitignore` - Archivos ignorados
- ✅ `docker-compose.yml` - Orquestación de servicios
- ✅ `Dockerfile` - Imagen de la aplicación

### Código Fuente (archivos con prefijo src-)
Los archivos que empiezan con `src-` deben moverse a sus ubicaciones correctas:
- `src-lib-db.ts` → `src/lib/db.ts`
- `src-lib-redis.ts` → `src/lib/redis.ts`
- `src-lib-n8n.ts` → `src/lib/n8n.ts`
- `src-lib-chatwoot.ts` → `src/lib/chatwoot.ts`
- `src-lib-utils.ts` → `src/lib/utils.ts`
- `src-layouts-Layout.astro` → `src/layouts/Layout.astro`
- `src-pages-index.astro` → `src/pages/index.astro`
- `src-pages-api-properties.ts` → `src/pages/api/properties.ts`
- `src-pages-api-leads.ts` → `src/pages/api/leads.ts`
- `src-pages-api-webhooks-chatwoot.ts` → `src/pages/api/webhooks/chatwoot.ts`

### Workflows n8n
- ✅ `n8n-workflows-lead-capture.json`
- ✅ `n8n-workflows-chatwoot-ai.json`
- ✅ `n8n-workflows-README.md`

### Documentación
- ✅ `PLANIFICACION.md` - Plan completo del proyecto
- ✅ `MIGRACION-VPS.md` - Guía de deployment
- ✅ `AUTOMATIZACIONES-DETALLE.md` - Detalle de automatizaciones
- ✅ `README.md` - Documentación principal
- ✅ `SETUP-MANUAL.md` - Instrucciones de setup manual

---

## 📋 Pasos para Iniciar

### 1. Crear estructura de directorios
```bash
chmod +x setup.sh
./setup.sh
```

### 2. Mover archivos a sus ubicaciones
```bash
# Crear directorios si no existen
mkdir -p src/lib src/layouts src/pages/api/webhooks src/styles

# Mover archivos lib
mv src-lib-*.ts src/lib/
rename 's/src-lib-//' src/lib/*

# Mover layouts
mv src-layouts-*.astro src/layouts/
rename 's/src-layouts-//' src/layouts/*

# Mover pages
mv src-pages-index.astro src/pages/index.astro
mv src-pages-api-*.ts src/pages/api/
rename 's/src-pages-api-//' src/pages/api/*
mv src/pages/api/webhooks-chatwoot.ts src/pages/api/webhooks/chatwoot.ts

# Mover workflows
mkdir -p n8n-workflows
mv n8n-workflows-*.json n8n-workflows/
mv n8n-workflows-README.md n8n-workflows/README.md
```

### 3. Crear archivos faltantes

#### prisma/schema.prisma
Ver contenido en `SETUP-MANUAL.md`

#### src/styles/globals.css
Ver contenido en `SETUP-MANUAL.md`

### 4. Instalar dependencias
```bash
npm install
```

### 5. Configurar variables de entorno
```bash
cp .env.example .env
# Editar .env con tus credenciales reales
```

### 6. Setup de base de datos
```bash
# Generar Prisma Client
npm run db:generate

# Crear tablas en la base de datos
npm run db:push

# (Opcional) Abrir Prisma Studio para ver la DB
npm run db:studio
```

### 7. Iniciar en desarrollo
```bash
npm run dev
```

La aplicación estará disponible en `http://localhost:3000`

---

## 🎨 Próximos Pasos

### Crear datos de prueba
```bash
# Conectar a Prisma Studio
npm run db:studio

# O crear un seed script
```

### Importar workflows en n8n
1. Ir a tu instancia de n8n
2. Importar `n8n-workflows/lead-capture.json`
3. Importar `n8n-workflows/chatwoot-ai.json`
4. Configurar credenciales (OpenAI, SMTP, Chatwoot)
5. Activar workflows

### Configurar Chatwoot
1. Crear Website Inbox
2. Copiar Website Token
3. Agregar a `.env` como `PUBLIC_CHATWOOT_WEBSITE_TOKEN`
4. Configurar webhook a n8n

### Configurar Easypanel (Deployment)
1. Crear nuevo proyecto
2. Conectar repositorio Git
3. Configurar variables de entorno
4. Deploy automático

---

## 🧪 Testing

### Test API de propiedades
```bash
curl http://localhost:3000/api/properties
```

### Test API de leads
```bash
curl -X POST http://localhost:3000/api/leads \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "phone": "+56912345678",
    "message": "Interesado en propiedades"
  }'
```

### Test webhook de Chatwoot
```bash
curl -X POST http://localhost:3000/api/webhooks/chatwoot \
  -H "Content-Type: application/json" \
  -d '{
    "event": "message_created",
    "conversation": {"id": 1, "contact_id": 1},
    "message": {"content": "Hola", "message_type": "incoming"}
  }'
```

---

## 📦 Build para Producción

```bash
# Build
npm run build

# Preview del build
npm run preview

# O con Docker
docker-compose up -d
```

---

## 🎯 Checklist para la Demo

- [ ] Página de inicio funcional
- [ ] Listado de propiedades (aunque sea con datos mock)
- [ ] Formulario de contacto que envía a n8n
- [ ] Chatwoot widget visible y funcional
- [ ] Al menos 1 workflow de n8n funcionando
- [ ] Redis cache operativo
- [ ] Base de datos conectada
- [ ] Documentación completa

---

## 💡 Tips para la Presentación

### Destacar
1. **Stack moderno**: Astro + React + TailwindCSS
2. **Automatizaciones reales**: n8n workflows funcionales
3. **Escalabilidad**: Redis cache + PostgreSQL
4. **Atención 24/7**: Chatwoot + IA
5. **Deploy ready**: Docker + Easypanel

### Demostrar
1. Captura de lead → Notificación automática
2. Chat con bot → Respuesta inteligente
3. Cache de Redis → Performance
4. Workflows de n8n → Automatización visual
5. Arquitectura escalable → Diagrama

### Proponer
1. 10+ automatizaciones detalladas
2. Integración con portales inmobiliarios
3. Sistema de alertas personalizado
4. Reportes automáticos
5. CRM integrado

---

## 🆘 Troubleshooting Rápido

### Error: Cannot find module '@prisma/client'
```bash
npm run db:generate
```

### Error: Redis connection refused
```bash
# Verificar que Redis esté corriendo
docker ps | grep redis
# O iniciar Redis local
redis-server
```

### Error: Database connection
```bash
# Verificar DATABASE_URL en .env
# Verificar que PostgreSQL esté corriendo
```

### Chatwoot widget no aparece
```bash
# Verificar PUBLIC_CHATWOOT_WEBSITE_TOKEN en .env
# Verificar que la URL de Chatwoot sea correcta
```

---

## 📞 Recursos Adicionales

- [Documentación de Astro](https://docs.astro.build)
- [Documentación de n8n](https://docs.n8n.io)
- [Documentación de Chatwoot](https://www.chatwoot.com/docs)
- [Documentación de Prisma](https://www.prisma.io/docs)

---

**¡Éxito en tu demo! 🚀**
