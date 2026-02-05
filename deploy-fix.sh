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

echo "🚀 Triggeando deploy en Easypanel..."
curl -X POST http://76.13.126.63:3000/api/deploy/3164660f2b95aadbe651572a03863d06fb0c99b6c3a0c1e3

echo ""
echo "✅ Deploy iniciado. Revisa el progreso en Easypanel."
