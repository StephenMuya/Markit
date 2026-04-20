# Markit - Real Estate Data Pipeline

Markit is a real estate data pipeline and marketplace platform designed for agents, brokers, and home buyers. It aggregates and serves property data from multiple sources through an intuitive frontend.

## Project Overview

**Purpose:** Provide relevant, aggregated real estate market data from 10+ sources to empower real estate professionals and home buyers with comprehensive market insights.

**Tech Stack:**
- `backend/` is a Python FastAPI service handling data scraping, aggregation, and API endpoints
- `frontend/` is a React + Tailwind CSS app powered by Vite for consuming and visualizing real estate data
- Data pipeline architecture for scraping and normalizing real estate data from multiple sources

## Project Structure

```text
Markit/
  backend/
    app/
      api/           # API routes for property data, scraping, search
      scrapers/      # Data scrapers for 10+ real estate sources
      models/        # Data models for properties and market data
      main.py
      settings.py
    tests/
    requirements.txt
    .env.example
  frontend/
    src/
      components/    # React components for property listings, search, filters
      pages/         # Pages for market view, property details, agent tools
    package.json
    tailwind.config.js
    postcss.config.js
    vite.config.js
    .env.example
```

## Backend Setup

The backend handles real estate data scraping, aggregation, and serves APIs for property search and market data.

```bash
cd backend
python -m venv .venv
.venv\Scripts\activate
pip install -r requirements.txt
cp .env.example .env
uvicorn app.main:app --reload --port 8000
```

The API is available at:

- `http://localhost:8000/api/health` - Health check
- `http://localhost:8000/api/docs` - Swagger API documentation
- `http://localhost:8000/api/properties` - Property search and listings (planned)
- `http://localhost:8000/api/market` - Market data and insights (planned)

## Frontend

```bash
cd frontend
npm install
cp .env.example .env
npm run dev
```

The Vite app runs on `http://localhost:5173`.

## Next Build Steps

1. Define the first real product slice we want to ship.
2. Add domain models and routes to the FastAPI backend.
3. Replace the starter dashboard with the actual React screens and flows.
