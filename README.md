# NotionFlow

Automated scraping and deal extraction system for Commercial Real Estate (CRE) news sources.

## Overview

NotionFlow is a Python-based system that:
1. **Scrapes** articles from 10 major CRE news sources
2. **Extracts** deal information using Google Gemini AI
3. **Stores** deals in a local SQLite database with automatic deduplication

## Features

- ✅ **10 CRE News Sources**: The Real Deal, Bisnow, GlobeSt, Commercial Observer, CRE Direct, Connect CRE, Propmodo, NAIOP, ULI, Yardi Matrix
- ✅ **SQLite Database**: Fast, local storage with no API rate limits
- ✅ **AI-Powered Extraction**: Google Gemini AI extracts structured deal data
- ✅ **Automatic Deduplication**: Article-level idempotency prevents duplicates
- ✅ **Firm Management**: Automatic firm tracking and relationship management
- ✅ **Configurable Limits**: Control articles per source via environment variables
- ✅ **Query Utilities**: Built-in CLI tools for database queries

## Quick Start

### Prerequisites

- Python 3.8+
- Google Gemini API key ([Get one here](https://makersuite.google.com/app/apikey))

### Installation

```bash
# Clone the repository
git clone https://github.com/StephenMuya/NotionFlow.git
cd NotionFlow

# Install Python dependencies
pip install -r requirements.txt

# Install Playwright browsers
python -m playwright install

# Configure environment variables
cp .env.example .env
# Edit .env and add your GEMINI_API_KEY
```

### Running the Pipeline

**Option 1: Run all steps at once (Recommended)**
```bash
# Linux/Mac
./run.sh

# Windows
run.bat
```

**Option 2: Run steps individually**
```bash
cd scraping_system

# Step 1: Scrape articles
python scraper.py

# Step 2: Extract deals using AI
python extractor.py

# Step 3: Save to database
python integration.py
```

## Configuration

Edit `.env` file to configure the system:

```bash
# Required: Your Gemini API key
GEMINI_API_KEY=your_api_key_here

# Optional: Database path (default: ./data/notionflow.db)
SQLITE_DB_PATH=./data/notionflow.db

# Optional: Limit articles per source (default: unlimited)
# Set to a number like 10, 50, or 100 for testing
MAX_ARTICLES_PER_SOURCE=
```

## Database Schema

### Firms Table
- `id` - Primary key
- `firm_name` - Unique firm name
- `firm_type` - Type (Equity Partner, Developer, etc.)
- `website` - Firm website
- `created_at` - Timestamp

### Deals Table
- `id` - Primary key
- `article_id` - Unique hash for idempotency
- `source_name` - News source
- `source_url` - Article URL
- `title` - Article title
- `date_scraped` - When scraped
- `equity_partner` - Equity partner name
- `equity_partner_id` - Foreign key to firms
- `developer` - Developer name
- `developer_id` - Foreign key to firms
- `structure` - Deal structure
- `market` - Geographic market
- `summary` - Deal summary
- `confidence` - AI confidence score (0-1)
- `content` - Full article content
- `created_at` - Timestamp

## Querying the Database

### Using the CLI Tool

```bash
cd scraping_system

# Show statistics
python query_db.py stats

# List recent deals
python query_db.py recent 10

# List all firms
python query_db.py firms

# Search for deals
python query_db.py search "Blackstone"

# List deals from specific source
python query_db.py source "The Real Deal"
```

### Using SQLite directly

```bash
sqlite3 ./data/notionflow.db

# View all deals
SELECT * FROM deals ORDER BY date_scraped DESC LIMIT 10;

# Count deals by source
SELECT source_name, COUNT(*) as count 
FROM deals 
GROUP BY source_name;

# Find high-confidence deals
SELECT title, equity_partner, developer, confidence 
FROM deals 
WHERE confidence > 0.8 
ORDER BY confidence DESC;
```

### Using Python

```python
from scraping_system.database import Database

db = Database()

# Get statistics
stats = db.get_stats()
print(f"Total deals: {stats['total_deals']}")

# Get recent deals
deals = db.get_all_deals(limit=10)
for deal in deals:
    print(deal['title'])

# Get deals by source
trd_deals = db.get_deals_by_source("The Real Deal")

db.close()
```

## Scraped Sources

1. **The Real Deal** (therealdeal.com) - National CRE news
2. **Bisnow** (bisnow.com) - 27+ markets, daily newsletters
3. **GlobeSt.com** (globest.com) - National news and analysis
4. **Commercial Observer** (commercialobserver.com) - Finance, tech, investment
5. **CRE Direct** (crenews.com) - CMBS, lending, capital markets
6. **Connect CRE** (connect.media) - Daily news, property sectors
7. **Propmodo** (propmodo.com) - Technology and innovation
8. **NAIOP** (naiop.org) - CRE Development Association
9. **Urban Land Institute** (urbanland.uli.org) - Land use, development
10. **Yardi Matrix** (yardimatrix.com) - Market intelligence

## Project Structure

```
NotionFlow/
├── scraping_system/
│   ├── scraper.py          # Web scraper for all sources
│   ├── extractor.py        # AI-powered deal extraction
│   ├── integration.py      # SQLite database integration
│   ├── database.py         # Database schema and operations
│   └── query_db.py         # Database query utility
├── data/
│   └── notionflow.db       # SQLite database (created automatically)
├── docs/
│   └── playbook.md         # Detailed documentation
├── run.sh                  # Linux/Mac pipeline script
├── run.bat                 # Windows pipeline script
├── requirements.txt        # Python dependencies
└── .env.example           # Environment configuration template
```

## Development

### Adding a New Source

1. Add a new scraper method to `scraping_system/scraper.py`:
```python
async def scrape_new_source(self):
    """Scrape New Source CRE news."""
    print("Scraping New Source...")
    articles = []
    # ... scraping logic ...
    return articles
```

2. Add the method to `scrape_all_sources()`:
```python
sources = [
    # ... existing sources ...
    self.scrape_new_source(),
]
```

### Testing

```bash
# Test database operations
python scraping_system/database.py

# Test with limited articles
export MAX_ARTICLES_PER_SOURCE=5
python scraping_system/scraper.py
```

## Migration from Notion

If you're migrating from the previous Notion-based version:

1. The database schema matches the Notion structure
2. Firm deduplication works the same way
3. Article IDs ensure no duplicates when migrating data
4. The extraction logic remains unchanged

## Troubleshooting

### Playwright Error
```bash
python -m playwright install
```

### Gemini API Errors
- Check your API key is correct
- Verify you have quota remaining
- The system retries on rate limits (429 errors)

### Database Locked
- Ensure no other process is accessing the database
- Close any SQLite browser tools

### Scraping Failures
- Some sites may block automated access
- Sites may have changed their structure (update selectors)
- Use `MAX_ARTICLES_PER_SOURCE` to test with fewer articles

## License

MIT License - see LICENSE file for details

## Contributing

Contributions welcome! Please open an issue or submit a pull request.

## Support

For issues or questions:
- Open a GitHub issue
- Check the [documentation](docs/playbook.md)
- Review error messages and logs
