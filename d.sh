#!/bin/bash
git add .
git commit -m "fix: Usar HTML inline en lugar de componente React"
git push origin main
curl -X POST http://76.13.126.63:3000/api/deploy/3164660f2b95aadbe651572a03863d06fb0c99b6c3a0c1e3
