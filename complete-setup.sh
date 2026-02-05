#!/bin/bash

echo "🚀 Setup completo del proyecto Angel & Völkers"
echo ""

# Paso 1: Mover archivos existentes
echo "📁 Moviendo archivos..."

if [ -f "src-lib-db.ts" ]; then
  mv src-lib-db.ts src/lib/db.ts
  echo "✓ src/lib/db.ts"
fi

if [ -f "src-lib-redis.ts" ]; then
  mv src-lib-redis.ts src/lib/redis.ts
  echo "✓ src/lib/redis.ts"
fi

if [ -f "src-lib-n8n.ts" ]; then
  mv src-lib-n8n.ts src/lib/n8n.ts
  echo "✓ src/lib/n8n.ts"
fi

if [ -f "src-lib-chatwoot.ts" ]; then
  mv src-lib-chatwoot.ts src/lib/chatwoot.ts
  echo "✓ src/lib/chatwoot.ts"
fi

if [ -f "src-lib-utils.ts" ]; then
  mv src-lib-utils.ts src/lib/utils.ts
  echo "✓ src/lib/utils.ts"
fi

if [ -f "src-layouts-Layout.astro" ]; then
  mv src-layouts-Layout.astro src/layouts/Layout.astro
  echo "✓ src/layouts/Layout.astro"
fi

if [ -f "src-pages-index.astro" ]; then
  mv src-pages-index.astro src/pages/index.astro
  echo "✓ src/pages/index.astro"
fi

if [ -f "src-pages-api-properties.ts" ]; then
  mv src-pages-api-properties.ts src/pages/api/properties.ts
  echo "✓ src/pages/api/properties.ts"
fi

if [ -f "src-pages-api-leads.ts" ]; then
  mv src-pages-api-leads.ts src/pages/api/leads.ts
  echo "✓ src/pages/api/leads.ts"
fi

if [ -f "src-pages-api-webhooks-chatwoot.ts" ]; then
  mv src-pages-api-webhooks-chatwoot.ts src/pages/api/webhooks/chatwoot.ts
  echo "✓ src/pages/api/webhooks/chatwoot.ts"
fi

# Paso 2: Mover archivos auxiliares
if [ -f "prisma-schema.prisma" ]; then
  mv prisma-schema.prisma prisma/schema.prisma
  echo "✓ prisma/schema.prisma"
fi

if [ -f "src-styles-globals.css" ]; then
  mv src-styles-globals.css src/styles/globals.css
  echo "✓ src/styles/globals.css"
fi

echo ""
echo "✅ Estructura corregida!"
echo ""
echo "📝 Próximos pasos:"
echo "1. git add ."
echo "2. git commit -m 'Fix: Correct file structure'"
echo "3. git push origin main"
echo ""
echo "Luego configura en Easypanel con:"
echo "Build: npm install && npx prisma generate && npm run build"
echo "Start: node ./dist/server/entry.mjs"
