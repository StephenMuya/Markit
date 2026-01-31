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

            # Wait for content to load
            try:
                await page.wait_for_selector("a", timeout=10000)
            except:
                print("Timeout waiting for links")

            # Scroll down to trigger lazy loading
            for _ in range(3):
                await page.evaluate("window.scrollBy(0, 1000)")
                await asyncio.sleep(1)

            # Get all links and filter in Python (more robust)
            all_links = await page.locator("a").all()

            seen_urls = set()
            print(f"Scanning {len(all_links)} links...")

            for link in all_links:
                if len(articles) >= 10:
                    break

                try:
                    url = await link.get_attribute("href")
                    if not url:
                        continue

                    # Normalize URL
                    if url.startswith("/"):
                        url = "https://therealdeal.com" + url

                    # Filter for article-like URLs (usually contain date or specific path)
                    # TRD structure: /national/2026/01/30/... or /new-york/2025/...
                    is_article = (
                        ("/202" in url)
                        or ("/deal-sheet/" in url)
                        or ("/trd-am/" in url)
                    )

                    if is_article and url not in seen_urls:
                        seen_urls.add(url)
                        title = await link.inner_text()

                        if len(title) > 10:  # Filter small links/buttons
                            print(f"Found: {title[:30]}... ({url})")
                            articles.append(
                                {
                                    "source": "The Real Deal",
                                    "url": url,
                                    "title": title.strip(),
                                    "date_scraped": datetime.now().isoformat(),
                                }
                            )
                except Exception as e:
                    continue

            # Detailed scraping
            for article in articles:
                try:
                    print(f"Scraping content: {article['title']}...")
                    await page.goto(article["url"], timeout=60000)  # Increase timeout

                    # Try different selectors for content
                    content = ""
                    selectors = [
                        "#the-content",
                        ".entry-content",
                        "article",
                        "main",
                        "body",
                    ]

                    for selector in selectors:
                        try:
                            if await page.locator(selector).count() > 0:
                                content = await page.locator(
                                    selector
                                ).first.inner_text()
                                if (
                                    len(content) > 500
                                ):  # Ensure we got substantial content
                                    break
                        except Exception:
                            continue

                    if not content:
                        print(f"Warning: No content found for {article['url']}")

                    article["content"] = content[:15000]  # Truncate for token limits

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
