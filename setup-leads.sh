#!/bin/bash

# Generate Prisma client for leads database
echo "🔧 Generando cliente Prisma para leads..."
npx prisma generate --schema=./prisma/schema-leads.prisma

# Push schema to leads database
echo "📤 Aplicando schema a base de datos de leads..."
npx prisma db push --schema=./prisma/schema-leads.prisma

echo "✅ Setup de leads completado"
