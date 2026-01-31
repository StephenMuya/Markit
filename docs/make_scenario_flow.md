# Make.com Scenario Flow: Audio Capture & Follow-Up

This document outlines the step-by-step logic for the Make.com scenario.

## Modules

1.  **Webhook (Custom)**
    *   **Trigger**: Receives JSON payload from Fireflies.ai.
    *   **Data**: `call_id`, `transcript_url`, `participants`, `date`, `duration`.

2.  **Notion: Search Objects (Check Idempotency)**
    *   **Database**: Automation Log
    *   **Filter**: `Property: Payload` contains `call_id` AND `Status` is `Success`.
    *   **Logic**: If bundle > 0, stop execution (Duplicate).

3.  **HTTP: Get File (Download Transcript)**
    *   **URL**: `transcript_url` from Webhook.
    *   **Action**: Download text content.

4.  **OpenAI: Completion (Analyze Transcript)**
    *   **Model**: GPT-4
    *   **Messages**:
        *   System: "You are an executive assistant. Extract metadata and summarize."
        *   User: [Transcript Text]
    *   **Output JSON**: `{ summary, deal_type, market, action_items, participants_analysis }`

5.  **Code (Javascript/Node.js) - Matching Logic**
    *   *Note: In Make, use the 'Function' module or 'Transform' to replicate `logic.js`.*
    *   Fetches all People from Notion (Search Objects).
    *   Runs Fuzzy Matching against `participants_analysis`.
    *   Outputs: `matched_ids`, `needs_review_list`.

6.  **Router**
    *   **Route A (High Confidence)**:
        *   **Notion: Create Database Item (Interactions)**
            *   Map `summary`, `date`, `participants` (Relation to `matched_ids`).
        *   **Gmail: Send Email** (Optional digest).
    *   **Route B (Needs Review)**:
        *   **Notion: Create Database Item (Needs Review)**
            *   Map `transcript_snippet`, `reason`.
        *   **Slack/Email**: Alert admin.

7.  **Notion: Create Database Item (Automation Log)**
    *   Log the execution status (Success/Error).

## Error Handling
*   Add **Error Handler** directive to critical modules (OpenAI, Notion).
*   On error -> **Notion: Create Database Item (Automation Log)** with Status "Error" and details.
*   **Email**: Send alert to admin.
