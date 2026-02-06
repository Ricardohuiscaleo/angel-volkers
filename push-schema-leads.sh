#!/bin/bash

echo "📦 Agregando schema-leads.prisma al repositorio..."

git add prisma/schema-leads.prisma
git commit -m "feat: Add schema-leads.prisma for deployment"
git push origin main

echo "✅ Schema subido! Easypanel lo detectará en el próximo build"
echo ""
echo "🔄 Reinicia el servicio en Easypanel para aplicar cambios"
