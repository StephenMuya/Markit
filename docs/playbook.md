# System Playbook: Audio Capture & Article Scraping

## 1. System Overview
This project consists of two automated pipelines:
1.  **Audio Capture**: Fireflies.ai -> Make.com -> Notion.
2.  **Article Scraping**: Python Scraper -> OpenAI -> Notion.

## 2. Configuration (`.env`)
Ensure your `.env` file in the root directory has the following:
```bash
NOTION_API_KEY=secret_...
NOTION_PAGE_ID=... (Parent page for DB creation)
OPENAI_API_KEY=sk-...
# Phase 2 IDs (After running setup_phase2.js)
FIRMS_DB_ID=...
EQUITY_DB_ID=...
```

## 3. Audio Capture System
### Setup
1.  Run `node notion_setup/setup_databases.js`.
2.  Copy the Database IDs output to your Make.com scenario "Notion" modules.
3.  Deploy the Make.com scenario as described in `docs/make_scenario_flow.md`.

### Operation
- **Automatic**: Scheduled calls recorded by Fireflies will trigger the webhook.
- **Manual**: Upload recording to Fireflies to trigger.
- **Review**: Check "Needs Review" DB in Notion for low-confidence matches.

### Troubleshooting
- **No Entry in Notion**: Check Make.com "History" for errors. If "Duplicate", checking Idempotency logic worked.
- **Bad Match**: Adjust threshold in `matchParticipants` logic (or Make.com function).

## 4. Article Scraping System
### Setup
1.  Run `node notion_setup/setup_phase2.js` to create "Firms" and "Equity" DBs.
2.  Add IDs to `.env`.
3.  Install specific dependencies: `playwright install` (if not already done).

### Operation
Run the scraper manually or schedule via Cron/Task Scheduler:
```bash
python scraping_system/scraper.py
python scraping_system/extractor.py
python scraping_system/integration.py
```
*Tip: Combine these into a single `run.bat` or `run.sh` script.*

### Troubleshooting
- **Playwright Error**: Run `python -m playwright install`.
- **Selector Error**: Websites change layouts. Update selectors in `scraper.py`.
- **OpenAI Error**: Check API quota.

## 5. Maintenance
See `maintenance.md` for monthly tasks.
