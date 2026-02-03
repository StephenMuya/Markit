#!/bin/bash
# run.sh - Complete NotionFlow scraping pipeline
# This script runs the entire scraping, extraction, and integration pipeline

set -e  # Exit on error

# Get the directory where this script is located
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
cd "$SCRIPT_DIR"

echo "======================================"
echo "NotionFlow Scraping Pipeline"
echo "======================================"
echo ""

# Check for required environment variables
if [ -z "$GEMINI_API_KEY" ]; then
    echo "Error: GEMINI_API_KEY environment variable not set"
    echo "Please set it in your .env file or export it"
    exit 1
fi

# Step 1: Scrape articles
echo "Step 1: Scraping articles from all sources..."
echo "--------------------------------------"
cd "$SCRIPT_DIR/scraping_system"
python scraper.py
if [ $? -ne 0 ]; then
    echo "Error: Scraping failed"
    exit 1
fi
echo ""

# Check if articles were scraped
if [ ! -f "$SCRIPT_DIR/scraped_articles.json" ]; then
    echo "Error: No scraped_articles.json file created"
    exit 1
fi

ARTICLE_COUNT=$(python -c "import json; data=json.load(open('$SCRIPT_DIR/scraped_articles.json')); print(len(data))")
echo "Scraped $ARTICLE_COUNT articles"
echo ""

# Step 2: Extract deals using Gemini
echo "Step 2: Extracting deals using Gemini AI..."
echo "--------------------------------------"
python extractor.py
if [ $? -ne 0 ]; then
    echo "Error: Extraction failed"
    exit 1
fi
echo ""

# Check if deals were extracted
if [ ! -f "$SCRIPT_DIR/extracted_deals.json" ]; then
    echo "Error: No extracted_deals.json file created"
    exit 1
fi

DEAL_COUNT=$(python -c "import json; data=json.load(open('$SCRIPT_DIR/extracted_deals.json')); print(len(data))")
echo "Extracted $DEAL_COUNT deals"
echo ""

# Step 3: Save to SQLite database
echo "Step 3: Saving deals to SQLite database..."
echo "--------------------------------------"
python integration.py
if [ $? -ne 0 ]; then
    echo "Error: Integration failed"
    exit 1
fi
echo ""

# Show final statistics
echo "======================================"
echo "Pipeline Complete!"
echo "======================================"
echo ""
echo "Database Statistics:"
python query_db.py stats
echo ""

echo "To query the database, use:"
echo "  cd scraping_system"
echo "  python query_db.py stats"
echo "  python query_db.py recent 10"
echo "  python query_db.py search 'Blackstone'"
