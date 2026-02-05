# 🚀 INSTRUCCIONES FINALES - Push a GitHub

## Ejecuta estos comandos en tu terminal:

```bash
cd /Users/ricardohuiscaleollafquen/Angel_Volkers

git add .
git commit -m "feat: Complete Angel & Völkers project with n8n automations"
git push origin main
```

## Luego en Easypanel:

**Repository:** `https://github.com/Ricardohuiscaleo/angel-volkers.git`

**Branch:** `main`

**Build Command:**
```bash
bash setup.sh && npm install && npx prisma generate && npm run build
```

**Start Command:**
```bash
node ./dist/server/entry.mjs
```

**Port:** `3000`

**Environment Variables:**
```env
NODE_ENV=production
DATABASE_URL=postgresql://angelvolkers:PASSWORD@postgres:5432/angelvolkers
REDIS_URL=redis://redis:6379
PUBLIC_SITE_URL=https://tu-dominio.com
```

---

**El proyecto está listo. Solo falta que hagas el push manualmente.**
