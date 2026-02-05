#!/bin/bash

echo "🔧 Organizando estructura del proyecto..."

# Crear directorios necesarios
mkdir -p src/lib src/layouts src/pages/api/webhooks src/styles

# Mover archivos lib
if ls src-lib-*.ts 1> /dev/null 2>&1; then
  for file in src-lib-*.ts; do
    newname=$(echo "$file" | sed 's/src-lib-//')
    mv "$file" "src/lib/$newname"
    echo "✅ Movido: $file → src/lib/$newname"
  done
fi

# Mover layouts
if ls src-layouts-*.astro 1> /dev/null 2>&1; then
  for file in src-layouts-*.astro; do
    newname=$(echo "$file" | sed 's/src-layouts-//')
    mv "$file" "src/layouts/$newname"
    echo "✅ Movido: $file → src/layouts/$newname"
  done
fi

# Mover página index
if [ -f "src-pages-index.astro" ]; then
  mv src-pages-index.astro src/pages/index.astro
  echo "✅ Movido: src-pages-index.astro → src/pages/index.astro"
fi

# Mover archivos API
if ls src-pages-api-*.ts 1> /dev/null 2>&1; then
  for file in src-pages-api-*.ts; do
    if [[ "$file" == *"webhooks-chatwoot"* ]]; then
      mv "$file" "src/pages/api/webhooks/chatwoot.ts"
      echo "✅ Movido: $file → src/pages/api/webhooks/chatwoot.ts"
    else
      newname=$(echo "$file" | sed 's/src-pages-api-//')
      mv "$file" "src/pages/api/$newname"
      echo "✅ Movido: $file → src/pages/api/$newname"
    fi
  done
fi

# Mover estilos
if [ -f "src-styles-globals.css" ]; then
  mv src-styles-globals.css src/styles/globals.css
  echo "✅ Movido: src-styles-globals.css → src/styles/globals.css"
fi

# Crear directorio n8n-workflows si no existe
mkdir -p n8n-workflows

# Mover workflows n8n
if ls n8n-workflows-*.json 1> /dev/null 2>&1; then
  for file in n8n-workflows-*.json; do
    newname=$(echo "$file" | sed 's/n8n-workflows-//')
    mv "$file" "n8n-workflows/$newname"
    echo "✅ Movido: $file → n8n-workflows/$newname"
  done
fi

if [ -f "n8n-workflows-README.md" ]; then
  mv n8n-workflows-README.md n8n-workflows/README.md
  echo "✅ Movido: n8n-workflows-README.md → n8n-workflows/README.md"
fi

echo ""
echo "✨ Estructura organizada correctamente!"
echo ""
echo "📁 Estructura actual:"
tree -L 3 -I 'node_modules|dist' || ls -R src/ n8n-workflows/ 2>/dev/null

echo ""
echo "🚀 Próximos pasos:"
echo "1. npm install"
echo "2. cp .env.example .env (y configurar variables)"
echo "3. npm run db:generate"
echo "4. npm run db:push"
echo "5. npm run dev"
