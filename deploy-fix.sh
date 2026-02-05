#!/bin/bash

echo "🔧 Commiteando fixes de TypeScript..."

git add .
git commit -m "fix: Corregir errores TypeScript para build en Easypanel

- PropertyCard: Fix import path y validación undefined
- scrape-engelvolkers: Tipo explícito y substring()
- seed-properties: Reemplazar substr() deprecated
- API seed: Reemplazar substr() deprecated
- .dockerignore: Excluir archivos innecesarios"

echo "📤 Pusheando a GitHub..."
git push origin main

echo "✅ Cambios pusheados. Ahora ve a Easypanel y haz click en 'Deploy' manualmente."
