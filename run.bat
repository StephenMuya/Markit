@echo off
REM run.bat - Complete NotionFlow scraping pipeline for Windows
REM This script runs the entire scraping, extraction, and integration pipeline

echo ======================================
echo NotionFlow Scraping Pipeline
echo ======================================
echo.

REM Check for required environment variables
if "%GEMINI_API_KEY%"=="" (
    echo Error: GEMINI_API_KEY environment variable not set
    echo Please set it in your .env file or set it in Windows
    exit /b 1
)

REM Step 1: Scrape articles
echo Step 1: Scraping articles from all sources...
echo --------------------------------------
cd scraping_system
python scraper.py
if errorlevel 1 (
    echo Error: Scraping failed
    exit /b 1
)
echo.

REM Step 2: Extract deals using Gemini
echo Step 2: Extracting deals using Gemini AI...
echo --------------------------------------
python extractor.py
if errorlevel 1 (
    echo Error: Extraction failed
    exit /b 1
)
echo.

REM Step 3: Save to SQLite database
echo Step 3: Saving deals to SQLite database...
echo --------------------------------------
python integration.py
if errorlevel 1 (
    echo Error: Integration failed
    exit /b 1
)
echo.

REM Show final statistics
echo ======================================
echo Pipeline Complete!
echo ======================================
echo.
echo Database Statistics:
python query_db.py stats
echo.

echo To query the database, use:
echo   cd scraping_system
echo   python query_db.py stats
echo   python query_db.py recent 10
echo   python query_db.py search "Blackstone"
