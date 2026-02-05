#!/bin/sh

git add .
git commit -m "fix: Corregir Dockerfile para build con Prisma

- Agregar OpenSSL requerido por Prisma
- Organizar estructura de archivos automáticamente
- Separar dependencias de producción y desarrollo
- Agregar .dockerignore para optimizar build
- Corregir formato ENV en Dockerfile"
git push origin main
