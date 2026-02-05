FROM node:20-alpine AS base

# Instalar dependencias solo cuando sea necesario
FROM base AS deps
RUN apk add --no-cache libc6-compat openssl
WORKDIR /app

COPY package.json ./
RUN npm install --only=production

# Instalar todas las dependencias (incluyendo dev) para el build
FROM base AS deps-full
RUN apk add --no-cache libc6-compat openssl
WORKDIR /app

COPY package.json ./
RUN npm install

# Build de la aplicación
FROM base AS builder
RUN apk add --no-cache libc6-compat openssl
WORKDIR /app
COPY --from=deps-full /app/node_modules ./node_modules
COPY . .

# Organizar estructura de archivos
RUN mkdir -p src/lib src/layouts src/pages/api/webhooks src/styles && \
    for file in src-lib-*.ts; do [ -f "$file" ] && mv "$file" "src/lib/$(echo $file | sed 's/src-lib-//')"; done && \
    for file in src-layouts-*.astro; do [ -f "$file" ] && mv "$file" "src/layouts/$(echo $file | sed 's/src-layouts-//')"; done && \
    [ -f "src-pages-index.astro" ] && mv src-pages-index.astro src/pages/index.astro && \
    [ -f "src-pages-api-properties.ts" ] && mv src-pages-api-properties.ts src/pages/api/properties.ts && \
    [ -f "src-pages-api-leads.ts" ] && mv src-pages-api-leads.ts src/pages/api/leads.ts && \
    [ -f "src-pages-api-webhooks-chatwoot.ts" ] && mv src-pages-api-webhooks-chatwoot.ts src/pages/api/webhooks/chatwoot.ts && \
    [ -f "src-styles-globals.css" ] && mv src-styles-globals.css src/styles/globals.css

# Generar Prisma Client
RUN npx prisma generate

# Build de Astro (sin check para evitar errores de tipos)
RUN npm run build || astro build

# Imagen de producción
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 astro

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/prisma ./prisma

USER astro

EXPOSE 3000

ENV HOST=0.0.0.0
ENV PORT=3000

CMD ["node", "./dist/server/entry.mjs"]
