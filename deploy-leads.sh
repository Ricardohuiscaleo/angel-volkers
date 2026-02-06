#!/bin/bash

echo "🚀 Desplegando admin con gestión de leads..."

# Build
echo "📦 Building..."
npm run build

# Commit and push
echo "📤 Pushing to GitHub..."
git add .
git commit -m "feat: Admin con sidebar y gestión de leads separada"
git push origin main

echo "✅ Desplegado! Easypanel detectará los cambios automáticamente"
echo ""
echo "📋 Siguiente paso:"
echo "1. Ve a Easypanel > proyecto1 > Variables de entorno"
echo "2. Agrega: LEADS_DATABASE_URL=postgresql://postgres:c3f73915dc31dc0d5d95@agenterag-com_leads-db-angel-volkers:5432/leads-db-angel-volkers"
echo "3. Reinicia el servicio"
echo "4. Accede a: https://tu-dominio.com/admin-properties y /admin-leads"
