# Handoff Video Script (30 Mins)

## Intro (0:00 - 2:00)
- "Hi, this is the walkthrough for your new Audio Capture and Article Scraping systems."
- Brief overview of the two systems and the Notion dashboard.

## Part 1: Audio Capture System (2:00 - 15:00)
- **Make.com Walkthrough**: Show the scenario. Explain the Webhook trigger and the Router logic.
- **Notion Databases**: Show the "People", "Interactions", and "Needs Review" databases.
- **Demo**:
    - "I'm going to simulate a call payload."
    - Run the Make scenario.
    - Show the new item appear in "Interactions".
    - Show the "Executive Summary" populated by GPT-4.
    - Show the participants matched to the "People" DB.
- **Needs Review**: Explain what happens when a match is low confidence. Show how to manually fix and drag to "Interactions".

## Part 2: Article Scraping System (15:00 - 25:00)
- **Code Overview**: Briefly show `scraper.py` and `extractor.py`.
- **Execution**:
    - "I'll run the scraper script." (Show terminal output).
    - "Now extracting deals..." (Show API calls).
    - "Pushing to Notion..."
- **Notion**: Go to "Equity" DB. Show the new entry: "Blackstone + Developer - JV Equity".
- **Firms Link**: Click the "Equity Partner" relation to show it linked to the "Firms" DB profile.

## Part 3: Maintenance & Troubleshooting (25:00 - 30:00)
- Review the `playbook.md`.
- Explain how to update selectors if the website changes.
- "Remember to check your API usage limits."
- Outro.
