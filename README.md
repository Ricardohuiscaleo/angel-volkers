# 🏠 Angel & Völkers - Plataforma Inmobiliaria con Automatizaciones

Plataforma inmobiliaria moderna con automatizaciones n8n, Chatwoot y Redis.

## 🚀 Setup Rápido

### 1. Crear estructura de directorios
```bash
chmod +x setup.sh
./setup.sh
```

### 2. Instalar dependencias
```bash
npm install
```

### 3. Configurar variables de entorno
```bash
cp .env.example .env
# Editar .env con tus credenciales
```

### 4. Setup de base de datos
```bash
npm run db:push
```

### 5. Iniciar desarrollo
```bash
npm run dev
```

## 📦 Stack Tecnológico

- **Frontend**: Astro + React + TailwindCSS
- **Backend**: Node.js + Express
- **Base de datos**: PostgreSQL + Prisma
- **Cache**: Redis
- **Chatbot**: Chatwoot
- **Automatizaciones**: n8n
- **Deploy**: Easypanel

## 🤖 Automatizaciones Implementadas

1. ✅ Captura y calificación de leads
2. ✅ Sistema de alertas de propiedades
3. ✅ Seguimiento automatizado
4. ✅ Gestión de visitas
5. ✅ Sincronización multi-portal
6. ✅ Chatbot con IA + n8n + Chatwoot
7. ✅ Análisis y reportes
8. ✅ Gestión documental
9. ✅ Marketing automatizado
10. ✅ Integración CRM

## 📁 Estructura del Proyecto

```
angel-volkers/
├── src/
│   ├── components/      # Componentes React
│   ├── layouts/         # Layouts de Astro
│   ├── pages/           # Páginas y API routes
│   ├── lib/             # Utilidades y helpers
│   └── styles/          # Estilos globales
├── prisma/              # Esquema de base de datos
├── n8n-workflows/       # Workflows de n8n
├── docker/              # Configuración Docker
└── public/              # Assets estáticos
```

## 🔧 Comandos Disponibles

```bash
npm run dev          # Desarrollo
npm run build        # Build producción
npm run preview      # Preview build
npm run db:push      # Push schema a DB
npm run db:migrate   # Crear migración
npm run db:studio    # Abrir Prisma Studio
```

## 📚 Documentación

- [Planificación completa](./PLANIFICACION.md)
- [Migración a VPS](./MIGRACION-VPS.md)

## 🌐 Deploy en Easypanel

Ver archivo `MIGRACION-VPS.md` para instrucciones detalladas.
