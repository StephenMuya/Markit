# System Playbook: NotionFlow CRE Scraping System

## 1. System Overview
NotionFlow is a commercial real estate deal scraping and extraction system with two main components:
1. **Java Spring Boot Backend**: RESTful API with PostgreSQL database
2. **Python Scraper**: Web scraping + AI extraction pipeline

## 2. Architecture

### Backend (Java Spring Boot)
- REST API for all database operations
- JPA/Hibernate for ORM
- PostgreSQL for data storage
- Automatic schema management

### Scraping System (Python)
- Playwright-based web scraping for 10 CRE news sources
- Google Gemini AI for deal extraction
- PostgreSQL integration for data persistence

## 3. Configuration

**All configuration is centralized in the `.env` file** at the project root. This file contains all secrets, credentials, and configurable parameters for both the Java backend and Python scraper.

### Setting Up Configuration

1. **Copy the example file:**
   ```bash
   cp .env.example .env
   ```

2. **Edit `.env` with your values:**
   ```bash
   nano .env  # or use your preferred editor
   ```

3. **Required variables:**
   - `GEMINI_API_KEY` - Your Google Gemini API key
   - `DB_PASSWORD` - Your PostgreSQL password (must be set, no default)

### Configuration Variables

The `.env` file includes comprehensive documentation for all variables:

**API Keys & Secrets:**
- `GEMINI_API_KEY` - Required for AI-powered extraction

**Database Configuration:**
- `DB_HOST` - PostgreSQL host (default: localhost)
- `DB_PORT` - PostgreSQL port (default: 5432)
- `DB_NAME` - Database name (default: notionflow)
- `DB_USER` - Database user (default: postgres)
- `DB_PASSWORD` - Database password (REQUIRED, no default)

**Java Backend Settings:**
- `SERVER_PORT` - Backend API port (default: 8080)
- `SPRING_JPA_HIBERNATE_DDL_AUTO` - Schema management (default: update)
- `SPRING_JPA_SHOW_SQL` - SQL logging (default: false)
- `LOGGING_LEVEL_ROOT` - Root logging level (default: INFO)
- `LOGGING_LEVEL_NOTIONFLOW` - App logging level (default: DEBUG)

**Python Scraper Settings:**
- `MAX_ARTICLES_PER_SOURCE` - Scraping limit (default: unlimited)

See `.env.example` for complete documentation and all available options.

**⚠️ Security Note:** The `.env` file contains sensitive credentials and should never be committed to version control. It's already in `.gitignore`.

## 4. Setup Instructions

### Prerequisites
- Java 17+
- Maven 3.8+
- Python 3.8+
- PostgreSQL 12+
- Google Gemini API key

### Database Setup
```bash
# Create database
createdb notionflow

# Or using psql
psql -U postgres
CREATE DATABASE notionflow;
\q
```

### Backend Setup
```bash
cd backend

# Build
mvn clean install

# Run
mvn spring-boot:run

# Or with JAR
java -jar target/notionflow-backend-1.0.0.jar
```

### Python Setup
```bash
# Install dependencies
pip install -r requirements.txt

# Install browsers
python -m playwright install

# Configure .env file
cp .env.example .env
# Edit .env with your credentials
```

## 5. Operation

### Running the Scraping Pipeline

**Manual execution:**
```bash
cd scraping_system

# Step 1: Scrape articles
python scraper.py

# Step 2: Extract deals with AI
python extractor.py

# Step 3: Save to database
python integration.py
```

**Using Docker Compose:**
```bash
# Start services
docker-compose up -d

# View logs
docker-compose logs -f backend

# Stop services
docker-compose down
```

### API Usage

**Get all deals:**
```bash
curl http://localhost:8080/api/deals
```

**Search deals:**
```bash
curl "http://localhost:8080/api/deals/search?keyword=Blackstone"
```

**Get statistics:**
```bash
curl http://localhost:8080/api/stats
```

**Get deals by source:**
```bash
curl "http://localhost:8080/api/deals/source/The Real Deal"
```

## 6. Database Schema

### Firms Table
Stores unique firms (equity partners and developers):
- id (SERIAL PRIMARY KEY)
- firm_name (TEXT UNIQUE)
- firm_type (TEXT)
- website (TEXT)
- created_at (TIMESTAMP)

### Deals Table
Stores scraped CRE deals:
- id (SERIAL PRIMARY KEY)
- article_id (TEXT UNIQUE) - MD5 hash for idempotency
- source_name (TEXT)
- source_url (TEXT)
- title (TEXT)
- date_scraped (TIMESTAMP)
- equity_partner (TEXT)
- equity_partner_id (FK to firms)
- developer (TEXT)
- developer_id (FK to firms)
- structure (TEXT)
- market (TEXT)
- summary (TEXT)
- confidence (REAL)
- content (TEXT)
- created_at (TIMESTAMP)

## 7. Querying the Database

### Using PostgreSQL

```sql
-- View recent deals
SELECT * FROM deals ORDER BY date_scraped DESC LIMIT 10;

-- Count by source
SELECT source_name, COUNT(*) 
FROM deals 
GROUP BY source_name;

-- High confidence deals
SELECT title, equity_partner, developer, confidence 
FROM deals 
WHERE confidence > 0.8 
ORDER BY confidence DESC;

-- Deals by firm
SELECT d.title, d.market, d.structure 
FROM deals d
JOIN firms f ON d.equity_partner_id = f.id
WHERE f.firm_name = 'Blackstone';
```

### Using REST API

The Java backend provides a cleaner interface:
- GET /api/deals - All deals
- GET /api/deals/search?keyword=X - Search
- GET /api/stats - Statistics
- GET /api/firms - All firms

## 8. Scraped Sources (10 total)

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

## 9. Troubleshooting

### Backend Issues

**Database Connection Error:**
```bash
# Check PostgreSQL is running
pg_isready

# Verify connection string in application.properties
```

**Port Already in Use:**
```bash
# Change port in application.properties
server.port=8081
```

### Python Issues

**Playwright Error:**
```bash
python -m playwright install
```

**Database Connection Error:**
```bash
# Verify PostgreSQL is running
# Check .env file credentials
```

**Gemini API Error:**
- Check API key
- Verify quota

## 10. Deployment

### Using Docker Compose
```bash
docker-compose up -d
```

### Using Render.com
The `render.yaml` file configures:
- PostgreSQL database
- Java Spring Boot backend
- Python scraper (cron job)

Deploy by connecting your GitHub repository to Render.

## 11. Maintenance

### Database Maintenance
```sql
# Vacuum database
VACUUM ANALYZE deals;
VACUUM ANALYZE firms;

# Check table sizes
SELECT pg_size_pretty(pg_total_relation_size('deals'));
SELECT pg_size_pretty(pg_total_relation_size('firms'));
```

### Backup
```bash
# Backup database
pg_dump -U postgres notionflow > backup.sql

# Restore database
psql -U postgres notionflow < backup.sql
```

## 12. Development

### Backend Development
```bash
cd backend

# Run tests
mvn test

# Run with dev profile
mvn spring-boot:run -Dspring-boot.run.profiles=dev
```

### Adding New Scrapers
1. Add method to `scraping_system/scraper.py`
2. Follow existing pattern (async playwright)
3. Add to `scrape_all_sources()` list
4. Test with limited articles first

### Modifying Database Schema
1. Update JPA entities in `backend/src/main/java/com/notionflow/model/`
2. Spring Boot will auto-update schema (ddl-auto=update)
3. For production, use migrations (Flyway/Liquibase)

## 13. API Documentation

Full API documentation available at:
```
http://localhost:8080/swagger-ui.html
```
(Requires adding springdoc-openapi dependency)

## 14. Monitoring

### Application Health
```bash
# Check backend health
curl http://localhost:8080/api/health

# Check database
pg_isready
```

### Logs
```bash
# Backend logs
tail -f backend/logs/application.log

# Docker logs
docker-compose logs -f backend
```
