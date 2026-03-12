# Markit

Markit is an automated data pipeline for Commercial Real Estate (CRE) deal intelligence. It scrapes articles from ten major industry news sources, extracts structured deal information using the Google Gemini large language model, and persists the results in a PostgreSQL database exposed through a Spring Boot REST API. The scraping layer is written in Python (Playwright + BeautifulSoup); the backend is Java 17 on Spring Boot 3.2.

## Architecture

The system is split into two runtime components that share a single PostgreSQL instance.

The **Python scraping pipeline** (`scraping_system/`) runs in three sequential stages. `scraper.py` crawls ten CRE news sites using Playwright for JavaScript-rendered pages and BeautifulSoup for static HTML parsing. `extractor.py` sends each scraped article to the Google Gemini API with a structured prompt and receives back deal-level fields such as equity partner, developer, deal structure, market, and a confidence score. `integration.py` writes the extracted records into PostgreSQL via `psycopg2`, performing article-level deduplication on insert so the pipeline is idempotent.

The **Java Spring Boot backend** (`backend/`) exposes a RESTful API over the same database. It uses Spring Data JPA with Hibernate for object-relational mapping, validation via `spring-boot-starter-validation`, and Lombok to reduce entity boilerplate. The API supports querying deals by source or keyword, listing tracked firms, and retrieving aggregate statistics. CORS is enabled for local development.

Both components read connection credentials and runtime settings from a shared `.env` file. A `docker-compose.yml` is included for running PostgreSQL and the backend together, and a `render.yaml` defines a Render deployment with a managed database, the Spring Boot web service, and a daily cron job for the scraper.

## Prerequisites

- Java 17+ and Gradle (wrapper included)
- Python 3.8+
- PostgreSQL 12+
- A [Google Gemini API key](https://makersuite.google.com/app/apikey)

## Installation

### Database

```bash
createdb markit
# or: psql -U postgres -c "CREATE DATABASE markit;"
```

### Backend

```bash
cd backend
./gradlew build
./gradlew bootRun          # starts on http://localhost:8080
```

### Python scraper

```bash
pip install -r requirements.txt
python -m playwright install
cp .env.example .env       # then fill in GEMINI_API_KEY and DB_PASSWORD
```

## Configuration

All runtime configuration lives in the `.env` file at the repository root. Copy `.env.example` and set at minimum:

| Variable | Required | Description |
|---|---|---|
| `GEMINI_API_KEY` | yes | Google Gemini API key for deal extraction |
| `DB_PASSWORD` | yes | PostgreSQL password |
| `SERVER_PORT` | no | Spring Boot port (default `8080`) |
| `MAX_ARTICLES_PER_SOURCE` | no | Cap on articles scraped per source (default unlimited) |
| `SPRING_JPA_HIBERNATE_DDL_AUTO` | no | Hibernate DDL strategy (default `update`) |
| `LOGGING_LEVEL_ROOT` | no | Root log level (default `INFO`) |

The `.env` file is listed in `.gitignore` and must not be committed.

## Running the Pipeline

```bash
cd scraping_system
python scraper.py       # crawl all ten sources
python extractor.py     # extract deals via Gemini
python integration.py   # load into PostgreSQL
```

Each stage reads its predecessor's output from local JSON files and can be re-run safely; duplicate articles are skipped on insert.

## REST API

All endpoints are served by the Spring Boot backend at the configured port.

| Method | Path | Description |
|---|---|---|
| `GET` | `/api/health` | Health check |
| `GET` | `/api/deals` | List all deals |
| `GET` | `/api/deals/source/{name}` | Deals filtered by source |
| `GET` | `/api/deals/search?keyword={kw}` | Full-text keyword search |
| `POST` | `/api/deals` | Create a deal record |
| `GET` | `/api/firms` | List tracked firms |
| `GET` | `/api/stats` | Aggregate statistics |

Example requests:

```bash
curl http://localhost:8080/api/deals
curl "http://localhost:8080/api/deals/search?keyword=Blackstone"
curl http://localhost:8080/api/stats

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

```sql
CREATE TABLE firms (
    id SERIAL PRIMARY KEY,
    firm_name TEXT NOT NULL UNIQUE,
    firm_type TEXT NOT NULL,
    website TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

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

The `deals` table enforces a unique constraint on `article_id` for deduplication. Foreign keys on `equity_partner_id` and `developer_id` reference the `firms` table so that firm entities can be tracked and queried independently.

## Data Sources

The scraper targets the following CRE publications:

| Source | Domain | Focus |
|---|---|---|
| The Real Deal | therealdeal.com | National CRE news |
| Bisnow | bisnow.com | Multi-market coverage |
| GlobeSt.com | globest.com | News and analysis |
| Commercial Observer | commercialobserver.com | Finance, tech, investment |
| CRE Direct | crenews.com | CMBS, lending, capital markets |
| Connect CRE | connect.media | Daily property-sector news |
| Propmodo | propmodo.com | PropTech and innovation |
| NAIOP | naiop.org | Development industry association |
| Urban Land Institute | urbanland.uli.org | Land use and development |
| Yardi Matrix | yardimatrix.com | Market intelligence |

## Project Layout

```
Markit/
  backend/
    src/main/java/com/markit/
      controller/       REST controllers
      service/          Business logic
      model/            JPA entities
      repository/       Spring Data repositories
      MarkitApplication.java
    src/main/resources/
      application.properties
    build.gradle
  scraping_system/
    scraper.py          Playwright/BS4 crawler
    extractor.py        Gemini-based deal extraction
    integration.py      PostgreSQL loader
    database.py         Low-level DB operations
  audio_processing/     Optional audio transcription module (OpenAI Whisper + GPT-4o)
  docs/                 Deployment and maintenance guides
  docker-compose.yml    Local dev stack (Postgres + backend)
  render.yaml           Render cloud deployment manifest
  .env.example          Configuration template
  requirements.txt      Python dependencies
```

## Development

```bash
cd backend
./gradlew test                                         # run unit tests
./gradlew bootRun --args='--spring.profiles.active=dev' # dev profile
./gradlew build                                         # production JAR
```

The backend ships with CORS enabled for local development, so any frontend or tool such as Postman can be pointed at the API directly.

## Troubleshooting

If the backend fails to start with a port conflict, set `SERVER_PORT` in `.env` or pass `--server.port=8081` on the command line. Database connection failures are usually caused by PostgreSQL not running or incorrect credentials in `.env`; run `pg_isready` to verify the server is reachable. On the Python side, a missing Playwright browser can be fixed with `python -m playwright install`, and Gemini API errors typically indicate an invalid or exhausted API key.

## License

MIT License. See the LICENSE file for details.

## Contributing

Contributions are welcome. Please open an issue to discuss proposed changes before submitting a pull request.
