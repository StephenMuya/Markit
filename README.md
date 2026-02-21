# NotionFlow

Automated scraping and deal extraction system for Commercial Real Estate (CRE) news sources with Java Spring Boot backend and PostgreSQL database.

## Overview

NotionFlow is a hybrid Python/Java system that:
1. **Scrapes** articles from 10 major CRE news sources (Python)
2. **Extracts** deal information using Google Gemini AI (Python)
3. **Stores** deals in PostgreSQL database via Java Spring Boot REST API
4. **Provides** REST API for querying deals, firms, and statistics (Java)

## Architecture

- **Backend**: Java Spring Boot 3.2 + PostgreSQL
- **Scraping**: Python with Playwright
- **AI Extraction**: Google Gemini API
- **Database**: PostgreSQL 12+

## Features

- ✅ **10 CRE News Sources**: The Real Deal, Bisnow, GlobeSt, Commercial Observer, CRE Direct, Connect CRE, Propmodo, NAIOP, ULI, Yardi Matrix
- ✅ **PostgreSQL Database**: Production-grade RDBMS with proper foreign keys and indexing
- ✅ **Java Spring Boot API**: RESTful API for all database operations
- ✅ **AI-Powered Extraction**: Google Gemini AI extracts structured deal data
- ✅ **Automatic Deduplication**: Article-level idempotency prevents duplicates
- ✅ **Firm Management**: Automatic firm tracking and relationship management
- ✅ **Configurable Limits**: Control articles per source via environment variables

## Quick Start

### Prerequisites

- **Java 17+** and Maven 3.8+
- **Python 3.8+**
- **PostgreSQL 12+**
- **Google Gemini API key** ([Get one here](https://makersuite.google.com/app/apikey))

### Installation

#### 1. Database Setup

```bash
# Create PostgreSQL database
createdb notionflow

# Or use psql
psql -U postgres
CREATE DATABASE notionflow;
\q
```

#### 2. Backend Setup (Java Spring Boot)

```bash
cd backend

# Build the project
./gradlew build

# Run the application
./gradlew bootRun

# Or run the JAR directly
java -jar build/libs/notionflow-backend-1.0.0.jar
```

The API will be available at `http://localhost:8080`

#### 3. Python Scraper Setup

```bash
# Install Python dependencies
pip install -r requirements.txt

# Install Playwright browsers
python -m playwright install

# Configure environment variables
cp .env.example .env
# Edit .env and add your secrets (GEMINI_API_KEY, DB_PASSWORD, etc.)
```

### Configuration

**All configuration is managed through the `.env` file.** This file contains:
- API keys and secrets
- Database credentials
- Java backend settings
- Python scraper settings

Copy the example file and edit with your values:

```bash
cp .env.example .env
nano .env  # or use your preferred editor
```

**Required variables:**
- `GEMINI_API_KEY` - Your Google Gemini API key ([Get one here](https://makersuite.google.com/app/apikey))
- `DB_PASSWORD` - Your PostgreSQL database password (use a strong password)

**Optional variables:**
- `SERVER_PORT` - Java backend port (default: 8080)
- `MAX_ARTICLES_PER_SOURCE` - Scraping limit per source (default: unlimited)
- `SPRING_JPA_HIBERNATE_DDL_AUTO` - Database schema management (default: update)
- `LOGGING_LEVEL_ROOT` - Application logging level (default: INFO)

See `.env.example` for complete documentation of all available configuration options.

**⚠️ Security Note:** Never commit the `.env` file to version control. It's already in `.gitignore` to prevent accidental commits.

### Running the Pipeline

**Step-by-step execution:**

```bash
cd scraping_system

# Step 1: Scrape articles from all 10 sources
python scraper.py

# Step 2: Extract deals using Gemini AI
python extractor.py

# Step 3: Save deals to PostgreSQL database
python integration.py
```

## API Endpoints

The Java Spring Boot backend provides the following REST endpoints:

### Health Check
```
GET /api/health
```

### Deals
```
GET  /api/deals              - Get all deals
GET  /api/deals/source/{name} - Get deals by source
GET  /api/deals/search?keyword={keyword} - Search deals
POST /api/deals              - Create a new deal
```

### Firms
```
GET  /api/firms              - Get all firms
```

### Statistics
```
GET  /api/stats              - Get database statistics
```

### Example API Usage

```bash
# Get all deals
curl http://localhost:8080/api/deals

# Search for deals
curl "http://localhost:8080/api/deals/search?keyword=Blackstone"

# Get statistics
curl http://localhost:8080/api/stats

# Create a new deal
curl -X POST http://localhost:8080/api/deals \
  -H "Content-Type: application/json" \
  -d '{
    "articleId": "unique-id-123",
    "sourceName": "The Real Deal",
    "sourceUrl": "https://example.com/article",
    "title": "Major CRE Deal",
    "dateScraped": "2024-01-15T10:00:00",
    "equityPartner": "Blackstone",
    "developer": "Related Companies",
    "structure": "Joint Venture",
    "market": "Miami",
    "summary": "Deal summary here",
    "confidence": 0.92
  }'
```

## Database Schema

### Firms Table
```sql
CREATE TABLE firms (
    id SERIAL PRIMARY KEY,
    firm_name TEXT NOT NULL UNIQUE,
    firm_type TEXT NOT NULL,
    website TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Deals Table
```sql
CREATE TABLE deals (
    id SERIAL PRIMARY KEY,
    article_id TEXT NOT NULL UNIQUE,
    source_name TEXT NOT NULL,
    source_url TEXT NOT NULL,
    title TEXT,
    date_scraped TIMESTAMP NOT NULL,
    equity_partner TEXT,
    equity_partner_id INTEGER REFERENCES firms(id),
    developer TEXT,
    developer_id INTEGER REFERENCES firms(id),
    structure TEXT,
    market TEXT,
    summary TEXT,
    confidence REAL,
    content TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## Querying the Database

### Using psql

```bash
psql -U postgres -d notionflow

# View all deals
SELECT * FROM deals ORDER BY date_scraped DESC LIMIT 10;

# Count deals by source
SELECT source_name, COUNT(*) 
FROM deals 
GROUP BY source_name;

# Find high-confidence deals
SELECT title, equity_partner, developer, confidence 
FROM deals 
WHERE confidence > 0.8 
ORDER BY confidence DESC;
```

### Using the REST API

The Java backend provides a cleaner interface for querying data without direct database access.

## Project Structure

```
NotionFlow/
├── backend/                      # Java Spring Boot backend
│   ├── src/main/java/com/notionflow/
│   │   ├── controller/          # REST controllers
│   │   ├── service/             # Business logic
│   │   ├── model/               # JPA entities
│   │   ├── repository/          # Data access layer
│   │   └── NotionFlowApplication.java
│   ├── src/main/resources/
│   │   └── application.properties
│   └── pom.xml                  # Maven configuration
├── scraping_system/             # Python scraping & extraction
│   ├── scraper.py              # Web scraper for 10 sources
│   ├── extractor.py            # AI-powered deal extraction
│   ├── integration.py          # Database integration
│   └── database.py             # PostgreSQL operations
├── docs/                        # Documentation
├── .env.example                 # Environment configuration template
├── requirements.txt             # Python dependencies
└── README.md                    # This file
```

## Development

### Backend Development (Java)

```bash
cd backend

# Run tests
./gradlew test

# Run with dev profile
./gradlew bootRun --args='--spring.profiles.active=dev'

# Package for production
./gradlew build
```

### Frontend/API Testing

The backend includes built-in CORS support for local development. You can connect any frontend framework or use tools like Postman.

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

## Troubleshooting

### Backend Issues

**Port already in use:**
```bash
# Change port in backend/src/main/resources/application.properties
server.port=8081
```

**Database connection error:**
```bash
# Verify PostgreSQL is running
pg_isready

# Check connection details in application.properties
```

### Python Issues

**Playwright Error:**
```bash
python -m playwright install
```

**Gemini API Errors:**
- Check your API key is correct
- Verify you have quota remaining

**Database Connection Error:**
- Ensure PostgreSQL is running
- Verify credentials in .env file

## License

MIT License - see LICENSE file for details

## Contributing

Contributions welcome! Please open an issue or submit a pull request.
