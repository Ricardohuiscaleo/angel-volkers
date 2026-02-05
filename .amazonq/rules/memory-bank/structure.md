# Project Structure

## Directory Organization

```
angel-volkers/
├── src/                      # Source code
│   ├── components/           # React components (UI elements)
│   ├── layouts/              # Astro layout templates
│   ├── pages/                # Astro pages and API routes
│   │   ├── api/              # Backend API endpoints
│   │   │   ├── webhooks/     # Webhook handlers (Chatwoot)
│   │   │   ├── leads.ts      # Lead management API
│   │   │   ├── properties.ts # Property CRUD API
│   │   │   └── seed.ts       # Database seeding
│   │   ├── index.astro       # Homepage
│   │   ├── propiedades.astro # Properties listing page
│   │   └── contacto.astro    # Contact page
│   ├── lib/                  # Shared utilities and integrations
│   │   ├── db.ts             # Prisma database client
│   │   ├── redis.ts          # Redis cache client
│   │   ├── chatwoot.ts       # Chatwoot API integration
│   │   ├── n8n.ts            # n8n workflow integration
│   │   └── utils.ts          # Helper functions
│   ├── styles/               # Global CSS styles
│   └── env.d.ts              # TypeScript environment definitions
├── prisma/                   # Database schema and migrations
│   └── schema.prisma         # Prisma schema definition
├── n8n-workflows/            # Automation workflow definitions
│   ├── lead-capture.json     # Lead capture workflow
│   ├── chatwoot-ai.json      # AI chatbot workflow
│   └── README.md             # Workflow documentation
├── docker/                   # Docker configuration (if exists)
├── public/                   # Static assets
├── .amazonq/                 # Amazon Q configuration
│   └── rules/                # Project rules and memory bank
├── PropertyCard.tsx          # Standalone property card component
├── scrape-engelvolkers.ts    # Property scraping utility
├── seed-properties.ts        # Database seeding script
└── Configuration files       # Root-level configs
```

## Core Components

### Frontend Layer (Astro + React)
- **Astro Pages**: Server-rendered pages with hybrid rendering mode
- **React Components**: Interactive UI elements (property cards, forms, dialogs)
- **Layouts**: Reusable page templates with common structure
- **Styling**: TailwindCSS with custom design system

### Backend Layer (API Routes)
- **API Endpoints**: RESTful APIs built with Astro API routes
- **Webhooks**: Event handlers for external service integrations
- **Database Access**: Prisma ORM for type-safe database operations
- **Caching**: Redis for performance optimization

### Data Layer
- **PostgreSQL**: Primary relational database
- **Prisma Schema**: Defines data models and relationships
  - Property, User, Agent, Lead, Visit, Favorite, SavedSearch, Notification
- **Redis**: Caching layer for frequently accessed data

### Integration Layer
- **Chatwoot**: Customer messaging and AI chatbot
- **n8n**: Workflow automation engine
- **External APIs**: Property portals, CRM systems

## Architectural Patterns

### Hybrid Rendering (Astro)
- Static pages for content-heavy routes
- Server-side rendering for dynamic data
- Client-side hydration for interactive components

### API-First Design
- RESTful endpoints in `/src/pages/api/`
- Separation of concerns between frontend and backend
- Type-safe API contracts with TypeScript

### Database-First Approach
- Prisma schema as single source of truth
- Type generation from schema
- Migration-based schema evolution

### Event-Driven Architecture
- Webhook handlers for external events
- n8n workflows for async processing
- Redis pub/sub for real-time updates (potential)

### Component Composition
- Radix UI primitives for accessible components
- Tailwind for utility-first styling
- Framer Motion for animations
- React Hook Form for form management

## Key Relationships

### Data Flow
1. User interacts with Astro pages
2. Pages fetch data via API routes
3. API routes query PostgreSQL via Prisma
4. Redis caches frequently accessed data
5. Webhooks trigger n8n workflows
6. n8n workflows update database and external services

### Service Integration
- **Chatwoot ↔ n8n**: AI chatbot responses and lead capture
- **n8n ↔ Database**: Automated data updates and workflows
- **API ↔ Redis**: Cache invalidation and data retrieval
- **Frontend ↔ API**: RESTful communication

## Deployment Architecture
- **Easypanel**: Primary deployment platform
- **Docker**: Containerized application
- **Node.js**: Standalone server mode
- **Environment Variables**: Configuration management
