#!/bin/bash

# Script para hacer push a GitHub
# Ejecuta: bash push-to-github.sh

echo "🚀 Preparando push a GitHub..."

# Agregar todos los archivos
git add .

# Commit
git commit -m "feat: Complete Angel & Völkers project with n8n automations"

# Push
git push origin main

echo "✅ Push completado!"
echo ""
echo "Ahora ve a Easypanel y configura:"
echo ""
echo "Repository: https://github.com/Ricardohuiscaleo/angel-volkers.git"
echo "Branch: main"
echo ""
echo "Build Command:"
echo "bash setup.sh && npm install && npx prisma generate && npm run build"
echo ""
echo "Start Command:"
echo "node ./dist/server/entry.mjs"
echo ""
echo "Port: 3000"
