#!/bin/bash
git add .
git commit -m "fix: Corregir import de PropertyCard con extensión .tsx"
git push origin main
curl -X POST http://76.13.126.63:3000/api/deploy/3164660f2b95aadbe651572a03863d06fb0c99b6c3a0c1e3
echo "✅ Deploy triggeado"
