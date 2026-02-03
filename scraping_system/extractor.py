import json
import os
import time
import google.generativeai as genai
from dotenv import load_dotenv

# Handle imports whether run as script or module
try:
    from .database import generate_article_id
except ImportError:
    from database import generate_article_id

load_dotenv()

genai.configure(api_key=os.getenv("GEMINI_API_KEY"))
model = genai.GenerativeModel("gemini-2.0-flash")


def extract_deal_info(article_text):
    """Sends article text to Gemini to extract deal info."""

    prompt = (
        """
    Role: Financial Data Analyst.
    Task: Extract mentions of EQUITY PARTNERS in commercial real estate deals from the following article.
    Output ONLY valid JSON: { "deals": [ { "equity_partner": "", "developer": "", "structure": "", "market": "", "summary": "", "confidence": 0.9 } ] }
    If no deal is found, return: { "deals": [] }
    
    Article:
    """
        + article_text
    )

    max_retries = 3
    for attempt in range(max_retries):
        try:
            # Add a small delay for free tier rate limits
            if attempt > 0:
                print(f"Retrying in 5 seconds...")
                time.sleep(5)

            response = model.generate_content(
                prompt,
                generation_config=genai.types.GenerationConfig(
                    response_mime_type="application/json"
                ),
            )
            return json.loads(response.text)
        except Exception as e:
            if "429" in str(e):
                print(
                    f"Rate limit hit. Waiting 15s... (Attempt {attempt + 1}/{max_retries})"
                )
                time.sleep(15)
            else:
                print(f"Error calling Gemini: {e}")
                # Don't retry on non-rate-limit errors to save time
                return {"deals": []}

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

        # Add delay between articles to respect RPM
        time.sleep(2)

    with open(output_file, "w") as f:
        json.dump(all_deals, f, indent=2)

    print(f"Extraction complete. Found {len(all_deals)} deals.")


if __name__ == "__main__":
    process_scraped_data()
