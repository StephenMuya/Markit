# Deployment Guide

This repository is configured for deployment with a Java backend, Python scraping pipeline, and PostgreSQL.

## Render Blueprint Deployment
1. Push repository changes.
2. Create a new Render Blueprint from `render.yaml`.
3. Configure required environment variables (especially `GEMINI_API_KEY`).
4. Deploy services:
   - Managed PostgreSQL (`markit-db`)
   - Java backend web service (`markit-backend`)
   - Python scraper cron service (`markit-scraper`)

## Required Runtime Variables
- `DB_HOST`
- `DB_PORT`
- `DB_NAME`
- `DB_USER`
- `DB_PASSWORD`
- `GEMINI_API_KEY`
- `MAX_ARTICLES_PER_SOURCE` (optional)

## Local Validation Before Deploy
```bash
# from repository root
pytest -q

cd backend
./gradlew --no-daemon --console=plain test
```

## Operational Notes
- Keep secrets out of source control.
- Monitor scraper cron execution and extraction quality.
- Treat deployment rollouts as product releases tied to TX + NY signal quality.
