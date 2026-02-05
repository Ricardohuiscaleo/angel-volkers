#!/bin/sh
git add .
git commit -m "fix: Redis lazy connect para build"
git push origin main
echo "✅ Push OK"
