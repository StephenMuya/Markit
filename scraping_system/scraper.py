import asyncio
from playwright.async_api import async_playwright
import json
from datetime import datetime


class CREScraper:
    def __init__(self, headless=True):
        self.headless = headless

    async def scrape_the_real_deal(self):
        print("Scraping The Real Deal...")
        articles = []
        async with async_playwright() as p:
            browser = await p.chromium.launch(headless=self.headless)
            page = await browser.new_page()
            await page.goto("https://therealdeal.com")

            # Selector for article links (based on inspection)
            # Looks for links in 'Top stories' or main feed
            links = await page.locator(
                "a[href*='/2026/']"
            ).all()  # Generic year filter for demo

            seen_urls = set()
            for link in links[:10]:  # Limit to 10 for demo
                url = await link.get_attribute("href")
                if url and url not in seen_urls and "therealdeal.com" in url:
                    seen_urls.add(url)
                    title = await link.inner_text()
                    if len(title) > 10:  # Filter small links
                        articles.append(
                            {
                                "source": "The Real Deal",
                                "url": url,
                                "title": title.strip(),
                                "date_scraped": datetime.now().isoformat(),
                            }
                        )

            # Detailed scraping
            for article in articles:
                try:
                    await page.goto(article["url"])
                    content = await page.locator("article").inner_text()
                    article["content"] = content[:5000]  # Truncate for token limits
                except Exception as e:
                    print(f"Error scraping {article['url']}: {e}")

            await browser.close()
        return articles

    async def scrape_the_promote(self):
        print("Scraping The Promote...")
        articles = []
        async with async_playwright() as p:
            browser = await p.chromium.launch(headless=self.headless)
            page = await browser.new_page()
            # The public news feed based on research
            await page.goto("https://thepromote.com/cre-news")

            try:
                # Wait for article links. Based on typical structure, looking for 'Read More' or headers
                await page.wait_for_selector("a", timeout=10000)

                # Broad scraping of links that look like articles
                links = await page.locator(
                    "a[href*='/cre-news/']"
                ).all()  # Guessing URL structure

                seen_urls = set()
                for link in links[:10]:
                    url = await link.get_attribute("href")
                    if url and url not in seen_urls:
                        # Ensure absolute URL
                        if url.startswith("/"):
                            url = "https://thepromote.com" + url

                        seen_urls.add(url)
                        title = await link.inner_text()

                        if len(title) > 10:
                            articles.append(
                                {
                                    "source": "The Promote",
                                    "url": url,
                                    "title": title.strip(),
                                    "date_scraped": datetime.now().isoformat(),
                                }
                            )

                # Go to each article to get content
                for article in articles:
                    try:
                        await page.goto(article["url"])
                        # Provide a cookie here if needed: await page.context.add_cookies([...])
                        content = await page.locator(
                            "body"
                        ).inner_text()  # Fallback to body if article tag missing
                        article["content"] = content[:5000]
                    except Exception as e:
                        print(f"Error scraping {article['url']}: {e}")

            except Exception as e:
                print(f"Error on The Promote: {e}")

            await browser.close()
        return articles


async def main():
    scraper = CREScraper(headless=True)
    trd_articles = await scraper.scrape_the_real_deal()
    print(f"Found {len(trd_articles)} articles from TRD.")

    # Save to JSON for next step (Extractor)
    with open("scraped_articles.json", "w") as f:
        json.dump(trd_articles, f, indent=2)


if __name__ == "__main__":
    asyncio.run(main())
