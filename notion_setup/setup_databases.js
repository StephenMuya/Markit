const { Client } = require("@notionhq/client");
require("dotenv").config();

const notion = new Client({ auth: process.env.NOTION_API_KEY });
const parentPageId = process.env.NOTION_PAGE_ID;

async function createDatabases() {
    if (!process.env.NOTION_API_KEY || !process.env.NOTION_PAGE_ID) {
        console.error("Please set NOTION_API_KEY and NOTION_PAGE_ID in .env file");
        process.exit(1);
    }

    try {
        // Use existing People DB ID
        const peopleDbId = "2f9d5447-bbe0-8183-9ea5-fa0ca8c14611";
        console.log(`Using existing People DB: ${peopleDbId}`);

        console.log("Creating 'Interactions' database...");
        const interactionsDb = await notion.databases.create({
            parent: { page_id: parentPageId },
            title: [{ type: "text", text: { content: "Interactions" } }],
            properties: {
                "Topic": { title: {} }, // Added required title property
                Date: { date: {} },
                Type: {
                    select: {
                        options: [
                            { name: "Call", color: "blue" },
                            { name: "Meeting", color: "green" },
                            { name: "Email", color: "yellow" },
                        ],
                    },
                },
                Summary: { rich_text: {} },
                "Participants": { relation: { database_id: peopleDbId, single_property: {} } },
                "Recording URL": { url: {} },
                Status: {
                    select: {
                        options: [
                            { name: "Done", color: "green" },
                            { name: "Action Required", color: "red" }
                        ]
                    }
                }
            },
        });
        console.log(`Created Interactions DB: ${interactionsDb.id}`);

        console.log("Creating 'Needs Review' database...");
        const reviewDb = await notion.databases.create({
            parent: { page_id: parentPageId },
            title: [{ type: "text", text: { content: "Needs Review" } }],
            properties: {
                "Issue": { title: {} }, // Added required title property
                "Original Text": { rich_text: {} },
                "Confidence Score": { number: {} },
                "Reason": { rich_text: {} },
                "Source ID": { rich_text: {} }, // e.g., Call ID
            },
        });
        console.log(`Created Needs Review DB: ${reviewDb.id}`);

        console.log("Creating 'Automation Log' database...");
        const logDb = await notion.databases.create({
            parent: { page_id: parentPageId },
            title: [{ type: "text", text: { content: "Automation Log" } }],
            properties: {
                "Event Name": { title: {} }, // Added required title property
                Timestamp: { created_time: {} },
                Status: {
                    select: {
                        options: [
                            { name: "Success", color: "green" },
                            { name: "Error", color: "red" },
                        ],
                    },
                },
                Message: { rich_text: {} },
                Payload: { rich_text: {} },
            },
        });
        console.log(`Created Automation Log DB: ${logDb.id}`);

        console.log("\nSetup Complete!");
        console.log("-----------------------------------");
        console.log(`People DB ID: ${peopleDbId}`);
        console.log(`Interactions DB ID: ${interactionsDb.id}`);
        console.log(`Needs Review DB ID: ${reviewDb.id}`);
        console.log(`Automation Log DB ID: ${logDb.id}`);
        console.log("-----------------------------------");
        console.log("Please copy these IDs to your Make.com scenario (or .env for testing).");

    } catch (error) {
        console.error("Error creating databases:", error.body || error);
    }
}

createDatabases();
