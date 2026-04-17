# Data Model and Signal Taxonomy

## Modeling Goal
Normalize heterogeneous source content into a consistent schema for TX + NY location-aware intelligence.

## Core Entities

### SourceDocument
- `source_document_id`
- `source_name`
- `source_url`
- `title`
- `published_at`
- `author`
- `category_tags[]`
- `ingested_at`

### Event
- `event_id`
- `event_type` (development, deal, financing, distress, neighborhood_change)
- `event_subtype` (e.g., construction_loan, foreclosure, zoning_approval)
- `event_stage` (announced, filed, approved, under_construction, delivered, stalled)
- `event_date`
- `summary`
- `confidence_score`
- `source_document_id`

### Location
- `location_id`
- `state` (TX/NY initially)
- `city`
- `county`
- `borough` (NY where available)
- `neighborhood`
- `zip_code`
- `address_line`
- `latitude`
- `longitude`
- `location_confidence`

### AssetOrProject
- `asset_project_id`
- `name`
- `asset_type` (multifamily, office, mixed_use, industrial, retail, condo, SFR/BTR)
- `units`
- `square_feet`
- `floors`
- `timeline_start`
- `timeline_delivery`

### Organization
- `organization_id`
- `name`
- `org_type` (developer, owner, lender, broker, tenant, contractor)

### EventPartyRole
- `event_id`
- `organization_id`
- `role_type` (buyer, seller, borrower, lender, developer, broker, tenant)

### FinancialMetric
- `financial_metric_id`
- `event_id`
- `metric_type` (sale_price, loan_amount, valuation, rent, cap_rate)
- `amount`
- `currency`
- `unit_basis` (total, per_sqft, per_unit)

## Required Product Filters
- Geography: state/city/neighborhood/radius
- Time window: day/week/month/quarter/custom
- Persona view: buyer/agent/broker/investor presets
- Signal type: pipeline/deals/financing/distress/neighborhood change
- Asset class and value bands

## Data Quality Requirements
- Deterministic dedupe for source documents
- Traceability from every event to source URL
- Confidence scoring for extracted values
- Clear null handling for unavailable fields
