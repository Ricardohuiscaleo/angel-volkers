#!/bin/bash
set -e

MSG="${1:-Update: cambios automáticos}"
BRANCH=$(git branch --show-current)

echo "📝 Commiteando cambios..."
/usr/bin/git add .
/usr/bin/git commit -m "$MSG" || echo "No hay cambios para commitear"

echo "📤 Pusheando a GitHub ($BRANCH)..."
/usr/bin/git push origin $BRANCH

echo "🚀 Triggeando deploy en Easypanel..."
curl -X POST http://76.13.126.63:3000/api/deploy/3164660f2b95aadbe651572a03863d06fb0c99b6c3a0c1e3

echo ""
echo "✅ Deploy iniciado exitosamente"
