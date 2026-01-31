import json
import os
from notion_client import Client
from dotenv import load_dotenv

load_dotenv()
notion = Client(auth=os.getenv("NOTION_API_KEY"))

FIRMS_DB_ID = os.getenv("FIRMS_DB_ID")
EQUITY_DB_ID = os.getenv("EQUITY_DB_ID")


def get_or_create_firm(firm_name, firm_type):
    """Checks if firm exists, else creates it."""
    if not firm_name:
        return None

    # Search
    response = notion.databases.query(
        database_id=FIRMS_DB_ID,
        filter={"property": "Firm Name", "title": {"equals": firm_name}},
    )

    if response["results"]:
        return response["results"][0]["id"]

    # Create
    new_firm = notion.pages.create(
        parent={"database_id": FIRMS_DB_ID},
        properties={
            "Firm Name": {"title": [{"text": {"content": firm_name}}]},
            "Type": {"select": {"name": firm_type}},
        },
    )
    return new_firm["id"]


def push_deals_to_notion():
    if not os.path.exists("extracted_deals.json"):
        print("No deals to push.")
        return

    with open("extracted_deals.json", "r") as f:
        deals = json.load(f)

    for deal in deals:
        print(f"Pushing deal: {deal['summary'][:50]}...")

        # Idempotency Check (Article ID)
        existing = notion.databases.query(
            database_id=EQUITY_DB_ID,
            filter={
                "property": "Article ID",
                "rich_text": {"equals": deal["article_id"]},
            },
        )
        if existing["results"]:
            print("Skipping duplicate.")
            continue

        # Link Firms
        equity_partner_id = get_or_create_firm(
            deal.get("equity_partner"), "Equity Partner"
        )
        developer_id = get_or_create_firm(deal.get("developer"), "Developer")

        props = {
            "Deal Headline": {
                "title": [
                    {
                        "text": {
                            "content": f"{deal.get('equity_partner')} + {deal.get('developer')} - {deal.get('structure')}"
                        }
                    }
                ]
            },
            "Transaction Summary": {
                "rich_text": [{"text": {"content": deal.get("summary", "")}}]
            },
            "Structure": {"select": {"name": deal.get("structure", "Other")}},
            "Market": {"select": {"name": deal.get("market", "Unknown")}},
            "Source": {"select": {"name": deal.get("source_name", "Unknown")}},
            "Article URL": {"url": deal.get("source_url")},
            "Confidence Score": {"number": deal.get("confidence", 0)},
            "Article ID": {
                "rich_text": [
                    {
                        "text": {
                            "content": deal.get("article_id")
                            if deal.get("article_id")
                            else ""
                        }
                    }
                ]
            },
        }

        if equity_partner_id:
            props["Equity Partner"] = {"relation": [{"id": equity_partner_id}]}
        if developer_id:
            props["Developer"] = {"relation": [{"id": developer_id}]}

        try:
            notion.pages.create(parent={"database_id": EQUITY_DB_ID}, properties=props)
            print("Success.")
        except Exception as e:
            print(f"Error creating page: {e}")


if __name__ == "__main__":
    if not FIRMS_DB_ID or not EQUITY_DB_ID:
        print("Please set FIRMS_DB_ID and EQUITY_DB_ID in .env")
    else:
        push_deals_to_notion()
