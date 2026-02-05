# Technology Stack

## Programming Languages
- **TypeScript 5.3.3**: Primary language for type-safe development
- **JavaScript (ES Modules)**: Module system and runtime
- **SQL**: Database queries via Prisma ORM

## Frontend Technologies

### Framework & Build Tools
- **Astro 4.2.1**: Meta-framework for content-focused websites
  - Hybrid rendering mode (static + SSR)
  - Node adapter in standalone mode
  - Server port: 3000
- **React 18.2.0**: UI component library
- **React DOM 18.2.0**: React renderer

### Styling & UI
- **TailwindCSS 3.4.1**: Utility-first CSS framework
  - Custom configuration via `tailwind.config.mjs`
  - Base styles disabled (custom implementation)
- **tailwindcss-animate 1.0.7**: Animation utilities
- **tailwind-merge 2.2.0**: Class name merging utility
- **class-variance-authority 0.7.0**: Variant-based component styling
- **clsx 2.1.0**: Conditional class names

### UI Component Libraries
- **Radix UI**: Accessible component primitives
  - Dialog, Dropdown Menu, Label, Select, Slider, Slot, Tabs, Toast
- **Lucide React 0.309.0**: Icon library
- **Framer Motion 11.0.3**: Animation library

### Forms & Validation
- **React Hook Form 7.49.3**: Form state management
- **Zod 3.22.4**: Schema validation

## Backend Technologies

### Runtime & Server
- **Node.js**: JavaScript runtime
- **Express 4.18.2**: Web application framework
- **@astrojs/node 8.2.0**: Astro Node.js adapter

### Database & ORM
- **PostgreSQL**: Primary relational database
- **Prisma 5.8.1**: Database toolkit and ORM
  - Client: @prisma/client 5.8.1
  - Schema-first development
  - Type-safe database client
  - Migration system

### Caching
- **Redis**: In-memory data store
- **ioredis 5.3.2**: Redis client for Node.js

### External Integrations
- **Chatwoot**: Customer messaging platform (API integration)
- **n8n**: Workflow automation (webhook integration)

## Development Tools

### Build & Development
- **tsx 4.21.0**: TypeScript execution and REPL
- **@astrojs/check 0.3.4**: Astro type checking

### Type Definitions
- **@types/node 20.11.5**: Node.js type definitions
- **@types/react 18.2.48**: React type definitions
- **@types/react-dom 18.2.18**: React DOM type definitions
- **@types/express 4.17.21**: Express type definitions

### Utilities
- **Cheerio 1.2.0**: HTML parsing and scraping

## Development Commands

### Core Commands
```bash
npm run dev          # Start development server (astro dev)
npm run start        # Alias for dev
npm run build        # Type check and build for production
npm run preview      # Preview production build
```

### Database Commands
```bash
npm run db:generate  # Generate Prisma client
npm run db:push      # Push schema to database (no migration)
npm run db:migrate   # Create and apply migration
npm run db:studio    # Open Prisma Studio GUI
```

### Utility Commands
```bash
npm run scrape       # Run property scraper (tsx scrape-engelvolkers.ts)
npm run seed         # Seed database with properties (tsx seed-properties.ts)
```

## Configuration Files

### TypeScript
- **tsconfig.json**: TypeScript compiler configuration
- **src/env.d.ts**: Environment type definitions

### Astro
- **astro.config.mjs**: Astro framework configuration
  - React integration
  - Tailwind integration (base styles disabled)
  - Hybrid output mode
  - Node adapter (standalone)
  - Server config (port 3000, host enabled)

### Styling
- **tailwind.config.mjs**: TailwindCSS configuration
- **src/styles/globals.css**: Global CSS styles

### Database
- **prisma/schema.prisma**: Database schema definition
  - PostgreSQL provider
  - Models: Property, User, Agent, Lead, Visit, Favorite, SavedSearch, Notification

### Environment
- **.env**: Environment variables (not in version control)
- **.env.example**: Environment variable template
  - DATABASE_URL
  - REDIS_URL
  - CHATWOOT_API_KEY
  - N8N_WEBHOOK_URL

## Deployment

### Platform
- **Easypanel**: Primary deployment platform (VPS management)

### Containerization
- **Docker**: Container runtime
- **docker-compose.yml**: Multi-service orchestration
- **Dockerfile**: Application container definition
- **.dockerignore**: Docker build exclusions

### Deployment Scripts
- **deploy-now.sh**: Quick deployment script
- **deploy-fix.sh**: Deployment troubleshooting
- **quick-deploy.sh**: Rapid deployment
- **push-to-github.sh**: Git push automation
- **commit-push.sh**: Commit and push automation

## Package Management
- **npm**: Package manager (package-lock.json present)
- **ES Modules**: Module system (type: "module" in package.json)

## Version Control
- **Git**: Version control system
- **.gitignore**: Git exclusions
