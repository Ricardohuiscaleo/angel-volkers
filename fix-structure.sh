#!/bin/bash

echo "🔧 Arreglando estructura del proyecto..."

# Crear directorios
/bin/mkdir -p src/lib src/layouts src/pages/api/webhooks src/styles prisma

# Mover archivos lib
/bin/mv src-lib-db.ts src/lib/db.ts 2>/dev/null
/bin/mv src-lib-redis.ts src/lib/redis.ts 2>/dev/null
/bin/mv src-lib-n8n.ts src/lib/n8n.ts 2>/dev/null
/bin/mv src-lib-chatwoot.ts src/lib/chatwoot.ts 2>/dev/null
/bin/mv src-lib-utils.ts src/lib/utils.ts 2>/dev/null

# Mover layouts
/bin/mv src-layouts-Layout.astro src/layouts/Layout.astro 2>/dev/null

# Mover pages
/bin/mv src-pages-index.astro src/pages/index.astro 2>/dev/null
/bin/mv src-pages-api-properties.ts src/pages/api/properties.ts 2>/dev/null
/bin/mv src-pages-api-leads.ts src/pages/api/leads.ts 2>/dev/null
/bin/mv src-pages-api-webhooks-chatwoot.ts src/pages/api/webhooks/chatwoot.ts 2>/dev/null

echo "✅ Archivos movidos"
echo ""
echo "⚠️  IMPORTANTE: Aún necesitas crear estos archivos:"
echo "   - prisma/schema.prisma (ver SETUP-MANUAL.md)"
echo "   - src/styles/globals.css (ver SETUP-MANUAL.md)"
echo ""
echo "Después ejecuta:"
echo "   /usr/bin/git add ."
echo "   /usr/bin/git commit -m 'Fix: Move files to correct structure'"
echo "   /usr/bin/git push origin main"
