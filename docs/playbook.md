# System Playbook: Audio Capture & Article Scraping

## 1. System Overview
This project consists of two automated pipelines:
1.  **Audio Capture**: Fireflies.ai -> Make.com -> Notion.
2.  **Article Scraping**: Python Scraper -> Gemini AI -> SQLite Database.

## 2. Configuration (`.env`)
Ensure your `.env` file in the root directory has the following:
```bash
# Required for deal extraction
GEMINI_API_KEY=your_gemini_api_key_here

# Optional: SQLite database path (default: ./data/notionflow.db)
SQLITE_DB_PATH=./data/notionflow.db

# Optional: Limit articles per source (default: unlimited)
MAX_ARTICLES_PER_SOURCE=100

# Legacy Notion configuration (no longer needed)
# NOTION_API_KEY=secret_...
# FIRMS_DB_ID=...
# EQUITY_DB_ID=...
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

### Overview
The scraping system now uses **SQLite** instead of Notion for data storage, providing:
- No API rate limits
- Faster queries
- Local database control
- Automatic idempotency checking

### Scraped Sources (10 total)
1. **The Real Deal** - https://therealdeal.com
2. **Bisnow** - https://www.bisnow.com
3. **GlobeSt.com** - https://www.globest.com
4. **Commercial Observer** - https://commercialobserver.com
5. **CRE Direct** - https://www.crenews.com
6. **Connect CRE** - https://www.connect.media
7. **Propmodo** - https://www.propmodo.com
8. **NAIOP** - https://www.naiop.org
9. **Urban Land Institute (ULI)** - https://urbanland.uli.org
10. **Yardi Matrix** - https://www.yardimatrix.com

### Setup
1.  Install Python dependencies: `pip install -r requirements.txt`
2.  Install Playwright browsers: `python -m playwright install`
3.  Configure your `.env` file with `GEMINI_API_KEY`
4.  The SQLite database will be created automatically on first run

### Operation
Run the complete scraping pipeline:
```bash
# Scrape articles from all 10 sources
python scraping_system/scraper.py

# Extract deals using Gemini AI
python scraping_system/extractor.py

# Save deals to SQLite database
python scraping_system/integration.py
```

*Tip: Combine these into a single `run.sh` or `run.bat` script for automation.*

### Database Schema
The SQLite database contains two main tables:

**firms table:**
- id (primary key)
- firm_name (unique)
- firm_type (Equity Partner, Developer, etc.)
- website
- created_at

**deals table:**
- id (primary key)
- article_id (unique, for idempotency)
- source_name
- source_url
- title
- date_scraped
- equity_partner
- equity_partner_id (foreign key to firms)
- developer
- developer_id (foreign key to firms)
- structure
- market
- summary
- confidence
- content
- created_at

### Querying the Database
You can query the SQLite database directly using the `sqlite3` command-line tool or any SQLite client:

```bash
# Open the database
sqlite3 ./data/notionflow.db

# View all deals
SELECT * FROM deals ORDER BY date_scraped DESC LIMIT 10;

# View all firms
SELECT * FROM firms ORDER BY firm_name;

# Count deals by source
SELECT source_name, COUNT(*) as count 
FROM deals 
GROUP BY source_name 
ORDER BY count DESC;

# Find deals by equity partner
SELECT * FROM deals WHERE equity_partner LIKE '%Blackstone%';

# Get recent high-confidence deals
SELECT source_name, title, confidence, market 
FROM deals 
WHERE confidence > 0.8 
ORDER BY date_scraped DESC 
LIMIT 20;
```

Or use Python:
```python
from scraping_system.database import Database

db = Database()
stats = db.get_stats()
print(stats)

deals = db.get_all_deals(limit=10)
for deal in deals:
    print(deal['title'], deal['source_name'])

db.close()
```

### Troubleshooting
- **Playwright Error**: Run `python -m playwright install`.
- **Selector Error**: Websites change layouts. Update selectors in `scraper.py`.
- **Gemini API Error**: Check API key and quota.
- **Database Locked**: Ensure no other process is accessing the database.

### Configuration Options

**MAX_ARTICLES_PER_SOURCE**: 
- Default: Unlimited (scrapes all available articles)
- Set to a number (e.g., 10, 50, 100) to limit articles per source
- Useful for testing or quick runs

**SQLITE_DB_PATH**:
- Default: `./data/notionflow.db`
- Change to use a different database location

## 5. Maintenance
See `maintenance.md` for monthly tasks.
