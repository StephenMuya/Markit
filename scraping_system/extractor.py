import json
import os
import hashlib
from openai import OpenAI
from dotenv import load_dotenv

load_dotenv()

client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))


def generate_article_id(url, date_scraped):
    """Generates a unique ID for the article to prevent duplicates."""
    raw_string = f"{url}-{date_scraped}"
    return hashlib.md5(raw_string.encode()).hexdigest()


def extract_deal_info(article_text):
    """Sends article text to OpenAI to extract deal info."""

    # Read criteria from prompts.md (or hardcoded here for simplicity in this script)
    system_prompt = """
    Role: Financial Data Analyst.
    Task: Extract mentions of EQUITY PARTNERS in commercial real estate deals.
    Output JSON: { "deals": [ { "equity_partner": "", "developer": "", "structure": "", "market": "", "summary": "", "confidence": 0.9 } ] }
    If no deal, return { "deals": [] }.
    """

    try:
        response = client.chat.completions.create(
            model="gpt-4",
            messages=[
                {"role": "system", "content": system_prompt},
                {"role": "user", "content": article_text},
            ],
            response_format={"type": "json_object"},
        )
        return json.loads(response.choices[0].message.content)
    except Exception as e:
        print(f"Error calling OpenAI: {e}")
        return {"deals": []}


def process_scraped_data(
    input_file="scraped_articles.json", output_file="extracted_deals.json"
):
    if not os.path.exists(input_file):
        print("No scraped data found.")
        return

    with open(input_file, "r") as f:
        articles = json.load(f)

    all_deals = []

    for article in articles:
        print(f"Processing: {article.get('title', 'Unknown')}")
        content = article.get("content", "")
        if len(content) < 100:
            continue

        extraction = extract_deal_info(content)

        for deal in extraction.get("deals", []):
            deal["article_id"] = generate_article_id(
                article["url"], article["date_scraped"]
            )
            deal["source_url"] = article["url"]
            deal["source_name"] = article["source"]
            all_deals.append(deal)

    with open(output_file, "w") as f:
        json.dump(all_deals, f, indent=2)

    print(f"Extraction complete. Found {len(all_deals)} deals.")


if __name__ == "__main__":
    process_scraped_data()
