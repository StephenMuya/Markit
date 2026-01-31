const { Client } = require("@notionhq/client");
require("dotenv").config();

const notion = new Client({ auth: process.env.NOTION_API_KEY });
const parentPageId = process.env.NOTION_PAGE_ID;

async function createPhase2Databases() {
    if (!process.env.NOTION_API_KEY || !process.env.NOTION_PAGE_ID) {
        process.exit(1);
    }

    try {
        // 1. Create Firms Database
        console.log("Creating 'Firms' database...");
        const firmsDb = await notion.databases.create({
            parent: { page_id: parentPageId },
            title: [{ type: "text", text: { content: "Firms" } }],
            properties: {
                "Firm Name": { title: {} },
                "Type": { select: { options: [{ name: "Developer", color: "blue" }, { name: "Equity Partner", color: "green" }] } },
                "Website": { url: {} },
            },
        });
        console.log(`Created Firms DB: ${firmsDb.id}`);

        // 2. Create Equity Database
        console.log("Creating 'Equity' database...");
        const equityDb = await notion.databases.create({
            parent: { page_id: parentPageId },
            title: [{ type: "text", text: { content: "Deal Headline" } }],
            properties: {
                "Transaction Summary": { rich_text: {} },
                "Date Published": { date: {} },
                "Structure": { select: { options: [{ name: "JV Equity", color: "purple" }, { name: "Recap", color: "orange" }] } },
                "Market": { select: {} },
                "Equity Partner": { relation: { database_id: firmsDb.id, single_property: {} } },
                "Developer": { relation: { database_id: firmsDb.id, single_property: {} } },
                "Source": { select: { options: [{ name: "The Promote", color: "red" }, { name: "The Real Deal", color: "blue" }] } },
                "Article URL": { url: {} },
                "Confidence Score": { number: {} },
                "Article ID": { rich_text: {} } // For Idempotency
            },
        });
        console.log(`Created Equity DB: ${equityDb.id}`);

        console.log("\nPhase 2 Setup Complete!");
        console.log(`Firms DB ID: ${firmsDb.id}`);
        console.log(`Equity DB ID: ${equityDb.id}`);

    } catch (error) {
        console.error("Error:", error.body || error);
    }
}

createPhase2Databases();
