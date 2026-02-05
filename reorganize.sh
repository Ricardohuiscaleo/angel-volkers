#!/bin/sh

# Crear estructura
mkdir -p src/lib src/layouts src/pages/api/webhooks src/styles n8n-workflows

# Mover archivos lib
for file in src-lib-*.ts; do
  [ -f "$file" ] && cp "$file" "src/lib/$(echo $file | sed 's/src-lib-//')"
done

# Mover layouts
for file in src-layouts-*.astro; do
  [ -f "$file" ] && cp "$file" "src/layouts/$(echo $file | sed 's/src-layouts-//')"
done

# Mover pages
[ -f "src-pages-index.astro" ] && cp src-pages-index.astro src/pages/index.astro
[ -f "src-pages-api-properties.ts" ] && cp src-pages-api-properties.ts src/pages/api/properties.ts
[ -f "src-pages-api-leads.ts" ] && cp src-pages-api-leads.ts src/pages/api/leads.ts
[ -f "src-pages-api-webhooks-chatwoot.ts" ] && cp src-pages-api-webhooks-chatwoot.ts src/pages/api/webhooks/chatwoot.ts

# Mover styles
[ -f "src-styles-globals.css" ] && cp src-styles-globals.css src/styles/globals.css

# Mover workflows
for file in n8n-workflows-*.json; do
  [ -f "$file" ] && cp "$file" "n8n-workflows/$(echo $file | sed 's/n8n-workflows-//')"
done
[ -f "n8n-workflows-README.md" ] && cp n8n-workflows-README.md n8n-workflows/README.md

# Eliminar archivos con prefijos
rm -f src-* n8n-workflows-*

echo "✅ Estructura reorganizada"
