# Markit

Markit is a location-aware real estate intelligence product for **Texas and New York**. It turns unstructured commercial real estate (CRE) news and market commentary into monetizable, decision-ready signals for **agents, brokers, investors, and homebuyers**.

The product is built from 10 CRE sources and focuses on premium signals that help users act earlier than the market:
- Development pipeline
- Deals and financing activity
- Distress and downside risk
- Neighborhood change indicators

Markit is designed for fast commercialization: launch in two high-demand states, monetize via subscriptions, then expand geographically using the same normalized data model.

## 1) Product Positioning

### Core Value Proposition
Markit sells **local market advantage**, not raw articles. Users pay for:
1. **Faster awareness** of high-impact local events
2. **Structured intelligence** instead of manual reading
3. **Actionable workflows** by location, radius, asset class, and timeframe

### Target Personas
- **Agents (Residential + Commercial):** neighborhood talking points, pipeline awareness, client alerts
- **Brokers:** capital/deal flow visibility, ownership activity, lender activity, local trend briefings
- **Investors:** deal sourcing, financing trends, distress monitoring, market timing
- **Homebuyers:** neighborhood trajectory signals, supply pressure indicators, risk-aware purchase context

## 2) Geographic Launch Scope

### Launch Markets
- **Texas:** Austin, Dallas–Fort Worth, Houston, San Antonio
- **New York:** NYC boroughs + major downstate/upstate markets as coverage expands

### Location-Aware Product Behavior
Every record is normalized to geography so feeds can auto-localize to user context:
- State, city, county, neighborhood (and borough in NY where available)
- Latitude/longitude where resolvable
- Location confidence (exact address vs neighborhood-level vs city-level)
- Distance/radius matching for user alerts

## 3) Data Sources (10 CRE Inputs)

| # | Source | Domain | Primary Value to Markit |
|---|---|---|---|
| 1 | The Real Deal | therealdeal.com | High-velocity market news, major projects, ownership activity |
| 2 | Bisnow | bisnow.com | Multi-market development, leasing, capital activity |
| 3 | GlobeSt.com | globest.com | Analysis + capital markets + trend context |
| 4 | Commercial Observer | commercialobserver.com | Finance, investment, transactions |
| 5 | CRE Direct | crenews.com | CMBS/lending, debt markets, distress indicators |
| 6 | Connect CRE | connect.media | Daily sector updates and local deal coverage |
| 7 | Propmodo | propmodo.com | PropTech and operational innovation signals |
| 8 | NAIOP | naiop.org | Development and policy context |
| 9 | Urban Land Institute (ULI) | urbanland.uli.org | Land-use, planning, long-cycle development context |
| 10 | Yardi Matrix | yardimatrix.com | Structured market intelligence and pipeline data |

*Use Yardi Matrix only within license permissions and commercialization terms.*

## 4) What Markit Extracts and Structures

Markit ingests article/report pages and converts content into standardized datasets.

### A) Article Metadata
- Source name and URL
- Title/headline
- Publication timestamp
- Author/byline (when available)
- Tags/sections/categories

### B) Event Signals (Monetizable Layer)
- **Development pipeline:** proposed, filed, approved, under construction, delivered, stalled
- **Deals:** acquisitions, portfolio trades, joint ventures, dispositions
- **Financing:** construction loans, bridge/permanent debt, refinancings, lender/borrower mapping
- **Distress:** default, special servicing, foreclosure, workout, bankruptcy mentions
- **Neighborhood change:** anchor retail arrivals, employer moves, infrastructure/public projects, zoning shifts

### C) Entities and Structured Attributes
- Companies (developer, owner, lender, broker, tenant)
- People (executives, officials, market participants)
- Property/project references
- Location entities (state/city/neighborhood/borough/ZIP)
- Numeric fields (loan amount, sale price, units, square footage, timeline dates)

## 5) Premium Product Outputs

1. **Hyperlocal Alerts**
   - “New project filed within 3 miles of your target area”
   - “Large financing closed in your submarket”
   - “Distress event detected in your county”

2. **Pipeline + Delivery Intelligence**
   - Upcoming supply by neighborhood
   - Delivery calendar and stage transitions

3. **Deal + Financing Tape**
   - Filterable transaction feed by location/asset class/value
   - Active buyer/seller/lender tracking

4. **Neighborhood Change Briefings**
   - Weekly summary of local change drivers
   - Explainable rationale tied to source evidence

## 6) Monetization Model (ASAP-Oriented)

### Subscription Tiers
- **Homebuyer Premium (B2C):** localized alerts, neighborhood trajectory summaries, pipeline visibility
- **Agent/Broker Pro (B2B seat-based):** all B2C features + lead intelligence + export workflows
- **Investor Pro (B2B):** advanced deal/financing/distress feeds + deeper filtering + watchlists
- **Enterprise/Team:** multi-seat analytics, API/data export rights, custom geographic coverage

### Revenue Motion
- Fast path: paid monthly subscriptions with annual discount
- Expansion path: brokerage teams, investor groups, and enterprise data licensing
- Retention drivers: saved geographies, watchlists, and recurring weekly brief value

Detailed packaging and pricing structure: [`docs/MONETIZATION.md`](docs/MONETIZATION.md)

## 7) MVP Roadmap and Launch Plan

### MVP Goal
Monetize quickly in TX + NY using a narrow but high-value signal set.

### MVP Deliverables
1. Location-aware event normalization
2. Texas + New York coverage with consistent taxonomy
3. Alerting by radius/location preferences
4. Persona-specific dashboards/briefs
5. Paid subscription gating

Roadmap details: [`docs/ROADMAP.md`](docs/ROADMAP.md)

## 8) Compliance and Risk Controls

Markit is designed to commercialize intelligence responsibly:
- Respect source terms of use and robots directives where applicable
- Store and present normalized facts/signals with source attribution links
- Avoid republishing full copyrighted article text as a product substitute
- Maintain auditability for extracted fields and confidence
- Follow privacy/security standards for customer and operational data

Compliance policy: [`docs/COMPLIANCE.md`](docs/COMPLIANCE.md)

## 9) Data Model and Taxonomy

Canonical schema and signal taxonomy are documented in:
- [`docs/DATA_MODEL.md`](docs/DATA_MODEL.md)
- [`docs/PRODUCT.md`](docs/PRODUCT.md)

## 10) Technical Setup (Current Repository)

Markit currently includes:
- Python scraping + extraction pipeline (`scraping_system/`)
- Java Spring Boot API (`backend/`)
- PostgreSQL-backed persistence

### Quick Start
```bash
# from repository root
python3 -m pip install -r requirements.txt
python3 -m playwright install

cd backend
./gradlew build
./gradlew bootRun
```

### Run Existing Tests
```bash
# Python tests (run from repository root)
pytest -q

# Java backend tests
cd backend
./gradlew --no-daemon --console=plain test
```

---

For strategic details, start with:
1. [`docs/PRODUCT.md`](docs/PRODUCT.md)
2. [`docs/MONETIZATION.md`](docs/MONETIZATION.md)
3. [`docs/ROADMAP.md`](docs/ROADMAP.md)
