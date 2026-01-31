const express = require('express');
const bodyParser = require('body-parser');
const { Client } = require("@notionhq/client");
const { matchParticipants, checkIdempotency } = require('./audio_system/logic');
require('dotenv').config();

const app = express();
app.use(bodyParser.json());

const notion = new Client({ auth: process.env.NOTION_API_KEY });
const PEOPLE_DB_ID = process.env.PEOPLE_DB_ID; // Need to add this to .env after setup

// Health Check
app.get('/', (req, res) => {
    res.send('Audio System API is running');
});

/**
 * Endpoint to Match Participants
 * Input: { "transcriptNames": ["John Doe"], "crmPeople": [...] (optional, else fetches from Notion) }
 */
app.post('/match-participants', async (req, res) => {
    try {
        const { transcriptNames } = req.body;

        let crmPeople = [];
        // Fetch from Notion if DB ID is present
        if (PEOPLE_DB_ID) {
            console.log("Fetching people from Notion...");
            let hasMore = true;
            let startCursor = undefined;
            while (hasMore) {
                const response = await notion.databases.query({
                    database_id: PEOPLE_DB_ID,
                    start_cursor: startCursor,
                });
                const people = response.results.map(page => ({
                    id: page.id,
                    name: page.properties.Name.title[0]?.plain_text || "",
                    email: page.properties.Email.email || "",
                    company: page.properties.Company.rich_text[0]?.plain_text || ""
                }));
                crmPeople.push(...people);
                hasMore = response.has_more;
                startCursor = response.next_cursor;
            }
        } else {
            // Allow passing people directly for testing
            crmPeople = req.body.crmPeople || [];
        }

        const result = matchParticipants(transcriptNames, crmPeople);
        res.json(result);

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
});


/**
 * Endpoint to Check Idempotency
 * Input: { "callId": "123", "existingIds": ["123", "456"] }
 */
app.post('/check-idempotency', (req, res) => {
    try {
        const { callId, existingIds } = req.body;
        const isDuplicate = checkIdempotency(callId, existingIds || []);
        res.json({ isDuplicate });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
