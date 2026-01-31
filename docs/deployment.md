# Deployment Guide

This project is ready to be deployed on **Render** (recommended for ease of use) or any Node.js/Python compatible host.

## Option 1: Deploy to Render (Recommended)

1.  **Push your code to GitHub/GitLab**.
2.  **Create a Render Account** at [render.com](https://render.com).
3.  **New Blueprint Instance**:
    *   Click "New" -> "Blueprint".
    *   Connect your repository.
    *   Render will read the `render.yaml` file.
4.  **Configure Environment Variables**:
    *   You will be prompted to enter your secrets (`NOTION_API_KEY`, `OPENAI_API_KEY`, `PEOPLE_DB_ID`, `FIRMS_DB_ID`, `EQUITY_DB_ID`).
    *   Get these IDs from the output of your local setup scripts (`setup_databases.js`, `setup_phase2.js`).
5.  **Deploy**:
    *   Render will spin up two services:
        *   **Web Service**: The Node.js server for the Audio System matches. You'll get a URL like `https://workana-audio-system.onrender.com`.
        *   **Cron Job**: The Python Scraper running daily at 9 AM.

## Option 2: Manual / Local Deployment

### Audio System Server
1.  Run `npm start`.
2.  Use a tool like **ngrok** to expose it locally for Make.com testing: `ngrok http 3000`.
3.  Use the ngrok URL in your Make.com HTTP modules.

### Scraper
1.  Use Windows Task Scheduler or Mac Cron to run:
    ```bash
    python scraping_system/scraper.py && python scraping_system/extractor.py && python scraping_system/integration.py
    ```

## Connecting Make.com to the Server

In your Make.com scenario, replacing the "Code" or "Function" module with an **HTTP Make a Request** module:
*   **URL**: `[Your-Render-URL]/match-participants`
*   **Method**: POST
*   **Body Type**: JSON
*   **Content**:
    ```json
    {
       "transcriptNames": ["{{participants_analysis_array}}"],
       "crmPeople": [] 
    }
    ```
*   *(Note: `crmPeople` is optional. If you set `PEOPLE_DB_ID` in Render env vars, the server fetches from Notion automatically.)*
