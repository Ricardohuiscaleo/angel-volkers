#!/bin/sh

echo "🚀 Push rápido..."

git add .
git commit -m "fix: Simplificar Dockerfile sin package-lock"
git push origin main

echo "✅ Listo. Rebuild en Easypanel"
