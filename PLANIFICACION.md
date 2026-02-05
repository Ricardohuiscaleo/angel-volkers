# 🏠 Proyecto Angel & Völkers - Automatización Inmobiliaria

## 📋 Resumen del Proyecto
Recrear una plataforma inmobiliaria moderna con automatizaciones n8n, mejorando la UX/UI original de Engel & Völkers.

## 🎯 Objetivos
1. Crear sitio web inmobiliario con mejor UX/UI
2. Implementar múltiples automatizaciones con n8n
3. Integrar chatbot inteligente
4. Preparar para deployment en VPS

## 🛠️ Stack Tecnológico

### Frontend
- **Framework**: Astro 4.x (SSR + SSG híbrido)
- **UI**: React + TailwindCSS + shadcn/ui
- **Animaciones**: Framer Motion
- **Formularios**: React Hook Form + Zod

### Backend
- **Runtime**: Node.js 20.x
- **API**: Express.js o Fastify
- **Base de datos**: PostgreSQL (mejor para datos relacionales complejos)
- **ORM**: Prisma
- **Cache**: Redis ✅ (ya disponible)
- **Deploy**: Easypanel ✅ (ya configurado)

### Chatbot
- **Plataforma**: Chatwoot ✅ (ya disponible)
- **IA**: OpenAI API / Anthropic Claude integrado con Chatwoot
- **Integración**: Widget nativo + API de Chatwoot
- **Canales**: Web, WhatsApp, Email, Telegram

### Automatizaciones n8n
- **Plataforma**: n8n self-hosted en VPS
- **Webhooks**: Para triggers externos
- **Integraciones**: Email, WhatsApp, CRM, etc.

## 🤖 Automatizaciones Propuestas (n8n)

### 1. **Captura y Calificación de Leads**
- Formulario web → n8n webhook
- Validación y scoring automático
- Asignación inteligente a agentes
- Notificación multi-canal (Email, WhatsApp, Slack)

### 2. **Sistema de Alertas de Propiedades**
- Usuario guarda búsqueda
- n8n monitorea nuevas propiedades
- Envío automático de matches
- Personalización por preferencias

### 3. **Seguimiento Automatizado**
- Lead entra → secuencia de emails
- Recordatorios de visitas
- Follow-ups programados
- Reactivación de leads fríos

### 4. **Gestión de Visitas**
- Solicitud de visita → calendario
- Confirmación automática
- Recordatorios 24h y 2h antes
- Feedback post-visita

### 5. **Sincronización Multi-Portal**
- Nueva propiedad → publicación automática
- Portales: Yapo, Portal Inmobiliario, etc.
- Actualización de precios sincronizada
- Gestión de disponibilidad

### 6. **Chatbot con IA + n8n + Chatwoot**
- Chatwoot recibe mensaje → webhook a n8n
- n8n procesa con IA (OpenAI/Claude)
- Respuestas automáticas inteligentes
- Consultas complejas → asignación a agente en Chatwoot
- Recopilación de datos del cliente
- Agendamiento de citas automático
- Historial unificado en Chatwoot

### 7. **Análisis y Reportes**
- Métricas diarias automáticas
- Reporte semanal a gerencia
- Alertas de KPIs críticos
- Dashboard en tiempo real

### 8. **Gestión Documental**
- Subida de documentos → OCR
- Extracción de datos clave
- Almacenamiento organizado
- Notificaciones de vencimientos

### 9. **Marketing Automatizado**
- Segmentación de audiencia
- Campañas por email/WhatsApp
- A/B testing automático
- Retargeting inteligente

### 10. **Integración CRM**
- Sincronización bidireccional
- Actualización de estados
- Historial unificado
- Scoring predictivo

## 📁 Estructura del Proyecto

```
angel-volkers/
├── .env.example
├── .gitignore
├── package.json
├── astro.config.mjs
├── tailwind.config.mjs
├── tsconfig.json
├── prisma/
│   ├── schema.prisma
│   └── migrations/
├── src/
│   ├── components/
│   │   ├── ui/              # shadcn components
│   │   ├── PropertyCard.tsx
│   │   ├── SearchFilters.tsx
│   │   ├── Chatbot.tsx
│   │   └── ContactForm.tsx
│   ├── layouts/
│   │   └── Layout.astro
│   ├── pages/
│   │   ├── index.astro
│   │   ├── propiedades/
│   │   │   ├── index.astro
│   │   │   └── [id].astro
│   │   ├── api/
│   │   │   ├── properties.ts
│   │   │   ├── leads.ts
│   │   │   └── webhooks/
│   │   │       └── n8n.ts
│   │   └── contacto.astro
│   ├── lib/
│   │   ├── db.ts
│   │   ├── n8n.ts
│   │   └── utils.ts
│   └── styles/
│       └── global.css
├── n8n-workflows/
│   ├── lead-capture.json
│   ├── property-alerts.json
│   ├── visit-management.json
│   └── README.md
└── docker/
    ├── docker-compose.yml
    └── nginx.conf
```

## 🗄️ Esquema de Base de Datos (PostgreSQL)

### Tablas Principales
- **properties**: Propiedades inmobiliarias
- **users**: Usuarios/clientes
- **agents**: Agentes inmobiliarios
- **leads**: Leads capturados (sincronizado con Chatwoot)
- **visits**: Visitas programadas
- **saved_searches**: Búsquedas guardadas
- **favorites**: Propiedades favoritas
- **notifications**: Notificaciones

### Redis Cache Strategy
- **properties:list**: Listado de propiedades (TTL: 5min)
- **properties:{id}**: Detalle de propiedad (TTL: 15min)
- **search:{hash}**: Resultados de búsqueda (TTL: 10min)
- **user:{id}:favorites**: Favoritos del usuario (TTL: 1h)
- **stats:daily**: Estadísticas diarias (TTL: 1h)

## 🚀 Plan de Implementación

### Fase 1: Setup Inicial (Hoy)
- [x] Planificación
- [ ] Inicializar proyecto Astro
- [ ] Configurar TailwindCSS + shadcn/ui
- [ ] Setup PostgreSQL + Prisma
- [ ] Crear esquema de base de datos

### Fase 2: Frontend Base
- [ ] Layout principal
- [ ] Página de inicio
- [ ] Listado de propiedades
- [ ] Detalle de propiedad
- [ ] Formularios de contacto

### Fase 3: Backend & APIs
- [ ] API de propiedades
- [ ] API de leads
- [ ] Webhooks para n8n
- [ ] Autenticación básica

### Fase 4: Chatbot
- [ ] Integrar widget de chat
- [ ] Conectar con n8n
- [ ] Respuestas automáticas
- [ ] Escalamiento a agente

### Fase 5: Automatizaciones n8n
- [ ] Workflow de captura de leads
- [ ] Workflow de alertas
- [ ] Workflow de seguimiento
- [ ] Workflow de visitas

### Fase 6: Deployment
- [ ] Configurar VPS
- [ ] Docker Compose setup
- [ ] Nginx reverse proxy
- [ ] SSL con Let's Encrypt
- [ ] Variables de entorno
- [ ] CI/CD básico

## 🔐 Variables de Entorno

```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/angelvolkers"

# Redis
REDIS_URL="redis://localhost:6379"
REDIS_PASSWORD="tu-password"

# n8n
N8N_WEBHOOK_URL="https://n8n.tudominio.com/webhook"
N8N_API_KEY="tu-api-key"

# Chatwoot
CHATWOOT_URL="https://chatwoot.tudominio.com"
CHATWOOT_API_KEY="tu-chatwoot-api-key"
CHATWOOT_ACCOUNT_ID="1"
CHATWOOT_INBOX_ID="1"
CHATWOOT_WEBSITE_TOKEN="tu-website-token"

# OpenAI (Chatbot IA)
OPENAI_API_KEY="sk-..."

# Email
SMTP_HOST="smtp.gmail.com"
SMTP_PORT=587
SMTP_USER="tu-email@gmail.com"
SMTP_PASS="tu-password"

# WhatsApp (vía Chatwoot)
WHATSAPP_PHONE_NUMBER="+56..."

# App
PUBLIC_SITE_URL="https://tudominio.com"
NODE_ENV="production"

# Easypanel
EASYPANEL_PROJECT_NAME="angel-volkers"
```

## 📊 Métricas de Éxito
- Tiempo de respuesta < 2s
- Tasa de conversión de leads > 15%
- Automatización de 80% de tareas repetitivas
- Satisfacción del usuario > 4.5/5

## 🎨 Mejoras UX/UI sobre el Original
1. **Búsqueda más intuitiva** con filtros visuales
2. **Comparador de propiedades** lado a lado
3. **Tour virtual 360°** integrado
4. **Calculadora de hipoteca** en tiempo real
5. **Mapa interactivo** con clusters
6. **Modo oscuro**
7. **Animaciones suaves** y microinteracciones
8. **Carga progresiva** de imágenes
9. **Chatbot proactivo** con IA
10. **Notificaciones push** de nuevas propiedades

## 📝 Notas Adicionales
- Usar TypeScript en todo el proyecto
- Implementar SEO optimization
- Accesibilidad WCAG 2.1 AA
- Performance: Lighthouse score > 90
- Mobile-first approach
- Progressive Web App (PWA)

---

**Fecha de inicio**: Hoy
**Deadline**: Mañana (demo funcional)
**Prioridad**: Alta
