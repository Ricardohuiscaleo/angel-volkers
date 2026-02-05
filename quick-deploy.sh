#!/bin/bash
set -e

echo "📝 Commiteando cambios..."
git add .
git commit -m "feat: Agregar páginas de propiedades y contacto" || echo "No hay cambios para commitear"

echo "📤 Pusheando a GitHub..."
git push origin main

echo "🚀 Triggeando deploy en Easypanel..."
curl -X POST http://76.13.126.63:3000/api/deploy/3164660f2b95aadbe651572a03863d06fb0c99b6c3a0c1e3

echo ""
echo "✅ Deploy iniciado exitosamente"
