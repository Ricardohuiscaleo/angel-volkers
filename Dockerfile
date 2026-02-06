FROM node:20-alpine AS base
# Build version: 2026-02-05-v2

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

# Generar Prisma Client
RUN npx prisma generate
RUN npx prisma generate --schema=./prisma/schema-leads.prisma || true

# Build de Astro
RUN npm run build

# Imagen de producción
FROM base AS runner
RUN apk add --no-cache openssl3 libssl3
WORKDIR /app

ENV NODE_ENV=production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 astro

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/prisma ./prisma

# Script de inicio
RUN echo '#!/bin/sh' > /app/start.sh && \
    echo 'npx prisma db push --skip-generate || true' >> /app/start.sh && \
    echo 'node ./dist/server/entry.mjs' >> /app/start.sh && \
    chmod +x /app/start.sh

RUN chown -R astro:nodejs /app

USER astro

EXPOSE 3000

ENV HOST=0.0.0.0
ENV PORT=3000

CMD ["/app/start.sh"]
