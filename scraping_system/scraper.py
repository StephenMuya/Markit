import asyncio
from playwright.async_api import async_playwright
import json
import os
from datetime import datetime
from urllib.parse import urlparse


def has_year_in_url(url: str) -> bool:
    """Check if URL contains a year pattern from 2020 to current year + 1.
    
    This prevents matching URLs with far-future years that don't exist yet.
    """
    from datetime import datetime
    current_year = datetime.now().year
    # Check from 2020 to current year + 1 (to allow for articles published early in next year)
    start_year = 2020
    end_year = current_year + 2  # Allow some buffer for early publishing
    
    for year in range(start_year, end_year):
        if f"/{year}" in url:
            return True
    return False


class CREScraper:
    def __init__(self, headless=True):
        self.headless = headless
        # Get max articles from environment variable, default to None (unlimited)
        max_articles_str = os.getenv("MAX_ARTICLES_PER_SOURCE", "")
        if max_articles_str and max_articles_str.isdigit():
            self.max_articles_per_source = int(max_articles_str)
        else:
            self.max_articles_per_source = None  # Unlimited

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
                # Check if we've reached the limit (if set)
                if self.max_articles_per_source and len(articles) >= self.max_articles_per_source:
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
                        has_year_in_url(url)
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
                ).all()  # Get all article links

                seen_urls = set()
                for link in links:
                    # Check limit after filtering valid articles
                    if self.max_articles_per_source and len(articles) >= self.max_articles_per_source:
                        break
                        
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

    async def scrape_bisnow(self):
        """Scrape Bisnow commercial real estate news."""
        print("Scraping Bisnow...")
        articles = []
        async with async_playwright() as p:
            browser = await p.chromium.launch(headless=self.headless)
            page = await browser.new_page()
            await page.goto("https://www.bisnow.com")

            try:
                await page.wait_for_selector("a", timeout=10000)
                
                # Scroll to load more content
                for _ in range(3):
                    await page.evaluate("window.scrollBy(0, 1000)")
                    await asyncio.sleep(1)

                all_links = await page.locator("a").all()
                seen_urls = set()
                print(f"Scanning {len(all_links)} links...")

                for link in all_links:
                    if self.max_articles_per_source and len(articles) >= self.max_articles_per_source:
                        break

                    try:
                        url = await link.get_attribute("href")
                        if not url:
                            continue

                        if url.startswith("/"):
                            url = "https://www.bisnow.com" + url

                        # Bisnow articles typically have /news/ or date patterns
                        is_article = (
                            ("/news/" in url)
                            or has_year_in_url(url)
                        )

                        if is_article and url not in seen_urls:
                            seen_urls.add(url)
                            title = await link.inner_text()

                            if len(title) > 10:
                                print(f"Found: {title[:30]}... ({url})")
                                articles.append(
                                    {
                                        "source": "Bisnow",
                                        "url": url,
                                        "title": title.strip(),
                                        "date_scraped": datetime.now().isoformat(),
                                    }
                                )
                    except Exception:
                        continue

                # Get content for each article
                for article in articles:
                    try:
                        print(f"Scraping content: {article['title']}...")
                        await page.goto(article["url"], timeout=60000)

                        content = ""
                        selectors = ["article", ".article-content", ".entry-content", "main", "body"]

                        for selector in selectors:
                            try:
                                if await page.locator(selector).count() > 0:
                                    content = await page.locator(selector).first.inner_text()
                                    if len(content) > 500:
                                        break
                            except Exception:
                                continue

                        article["content"] = content[:15000]

                    except Exception as e:
                        print(f"Error scraping {article['url']}: {e}")

            except Exception as e:
                print(f"Error on Bisnow: {e}")

            await browser.close()
        return articles

    async def scrape_globest(self):
        """Scrape GlobeSt.com commercial real estate news."""
        print("Scraping GlobeSt.com...")
        articles = []
        async with async_playwright() as p:
            browser = await p.chromium.launch(headless=self.headless)
            page = await browser.new_page()
            await page.goto("https://www.globest.com")

            try:
                await page.wait_for_selector("a", timeout=10000)
                
                for _ in range(3):
                    await page.evaluate("window.scrollBy(0, 1000)")
                    await asyncio.sleep(1)

                all_links = await page.locator("a").all()
                seen_urls = set()
                print(f"Scanning {len(all_links)} links...")

                for link in all_links:
                    if self.max_articles_per_source and len(articles) >= self.max_articles_per_source:
                        break

                    try:
                        url = await link.get_attribute("href")
                        if not url:
                            continue

                        if url.startswith("/"):
                            url = "https://www.globest.com" + url

                        # GlobeSt articles often have /news/ or year patterns
                        is_article = (
                            ("/news/" in url)
                            or has_year_in_url(url)
                            or ("/articles/" in url)
                        )

                        if is_article and url not in seen_urls:
                            seen_urls.add(url)
                            title = await link.inner_text()

                            if len(title) > 10:
                                print(f"Found: {title[:30]}... ({url})")
                                articles.append(
                                    {
                                        "source": "GlobeSt.com",
                                        "url": url,
                                        "title": title.strip(),
                                        "date_scraped": datetime.now().isoformat(),
                                    }
                                )
                    except Exception:
                        continue

                for article in articles:
                    try:
                        print(f"Scraping content: {article['title']}...")
                        await page.goto(article["url"], timeout=60000)

                        content = ""
                        selectors = ["article", ".article-body", ".entry-content", "main", "body"]

                        for selector in selectors:
                            try:
                                if await page.locator(selector).count() > 0:
                                    content = await page.locator(selector).first.inner_text()
                                    if len(content) > 500:
                                        break
                            except Exception:
                                continue

                        article["content"] = content[:15000]

                    except Exception as e:
                        print(f"Error scraping {article['url']}: {e}")

            except Exception as e:
                print(f"Error on GlobeSt: {e}")

            await browser.close()
        return articles

    async def scrape_commercial_observer(self):
        """Scrape Commercial Observer news."""
        print("Scraping Commercial Observer...")
        articles = []
        async with async_playwright() as p:
            browser = await p.chromium.launch(headless=self.headless)
            page = await browser.new_page()
            await page.goto("https://commercialobserver.com")

            try:
                await page.wait_for_selector("a", timeout=10000)
                
                for _ in range(3):
                    await page.evaluate("window.scrollBy(0, 1000)")
                    await asyncio.sleep(1)

                all_links = await page.locator("a").all()
                seen_urls = set()
                print(f"Scanning {len(all_links)} links...")

                for link in all_links:
                    if self.max_articles_per_source and len(articles) >= self.max_articles_per_source:
                        break

                    try:
                        url = await link.get_attribute("href")
                        if not url:
                            continue

                        if url.startswith("/"):
                            url = "https://commercialobserver.com" + url

                        # Commercial Observer article patterns
                        is_article = (
                            has_year_in_url(url)
                            or ("/finance/" in url)
                            or ("/real-estate/" in url)
                        )

                        # Ensure URL is from commercialobserver.com domain (proper URL validation)
                        try:
                            parsed = urlparse(url)
                            is_valid_domain = parsed.netloc == "commercialobserver.com" or parsed.netloc == "www.commercialobserver.com"
                        except:
                            is_valid_domain = False
                        
                        if is_article and url not in seen_urls and is_valid_domain:
                            seen_urls.add(url)
                            title = await link.inner_text()

                            if len(title) > 10:
                                print(f"Found: {title[:30]}... ({url})")
                                articles.append(
                                    {
                                        "source": "Commercial Observer",
                                        "url": url,
                                        "title": title.strip(),
                                        "date_scraped": datetime.now().isoformat(),
                                    }
                                )
                    except Exception:
                        continue

                for article in articles:
                    try:
                        print(f"Scraping content: {article['title']}...")
                        await page.goto(article["url"], timeout=60000)

                        content = ""
                        selectors = ["article", ".article-content", ".entry-content", "main", "body"]

                        for selector in selectors:
                            try:
                                if await page.locator(selector).count() > 0:
                                    content = await page.locator(selector).first.inner_text()
                                    if len(content) > 500:
                                        break
                            except Exception:
                                continue

                        article["content"] = content[:15000]

                    except Exception as e:
                        print(f"Error scraping {article['url']}: {e}")

            except Exception as e:
                print(f"Error on Commercial Observer: {e}")

            await browser.close()
        return articles

    async def scrape_cre_direct(self):
        """Scrape CRE Direct (Commercial Real Estate Direct) news."""
        print("Scraping CRE Direct...")
        articles = []
        async with async_playwright() as p:
            browser = await p.chromium.launch(headless=self.headless)
            page = await browser.new_page()
            await page.goto("https://www.crenews.com")

            try:
                await page.wait_for_selector("a", timeout=10000)
                
                for _ in range(3):
                    await page.evaluate("window.scrollBy(0, 1000)")
                    await asyncio.sleep(1)

                all_links = await page.locator("a").all()
                seen_urls = set()
                print(f"Scanning {len(all_links)} links...")

                for link in all_links:
                    if self.max_articles_per_source and len(articles) >= self.max_articles_per_source:
                        break

                    try:
                        url = await link.get_attribute("href")
                        if not url:
                            continue

                        if url.startswith("/"):
                            url = "https://www.crenews.com" + url

                        # CRE Direct article patterns
                        is_article = (
                            ("/articles/" in url)
                            or ("/news/" in url)
                            or has_year_in_url(url)
                        )

                        if is_article and url not in seen_urls:
                            seen_urls.add(url)
                            title = await link.inner_text()

                            if len(title) > 10:
                                print(f"Found: {title[:30]}... ({url})")
                                articles.append(
                                    {
                                        "source": "CRE Direct",
                                        "url": url,
                                        "title": title.strip(),
                                        "date_scraped": datetime.now().isoformat(),
                                    }
                                )
                    except Exception:
                        continue

                for article in articles:
                    try:
                        print(f"Scraping content: {article['title']}...")
                        await page.goto(article["url"], timeout=60000)

                        content = ""
                        selectors = ["article", ".article-content", ".entry-content", "main", "body"]

                        for selector in selectors:
                            try:
                                if await page.locator(selector).count() > 0:
                                    content = await page.locator(selector).first.inner_text()
                                    if len(content) > 500:
                                        break
                            except Exception:
                                continue

                        article["content"] = content[:15000]

                    except Exception as e:
                        print(f"Error scraping {article['url']}: {e}")

            except Exception as e:
                print(f"Error on CRE Direct: {e}")

            await browser.close()
        return articles

    async def scrape_connect_cre(self):
        """Scrape Connect CRE news."""
        print("Scraping Connect CRE...")
        articles = []
        async with async_playwright() as p:
            browser = await p.chromium.launch(headless=self.headless)
            page = await browser.new_page()
            await page.goto("https://www.connect.media")

            try:
                await page.wait_for_selector("a", timeout=10000)
                
                for _ in range(3):
                    await page.evaluate("window.scrollBy(0, 1000)")
                    await asyncio.sleep(1)

                all_links = await page.locator("a").all()
                seen_urls = set()
                print(f"Scanning {len(all_links)} links...")

                for link in all_links:
                    if self.max_articles_per_source and len(articles) >= self.max_articles_per_source:
                        break

                    try:
                        url = await link.get_attribute("href")
                        if not url:
                            continue

                        if url.startswith("/"):
                            url = "https://www.connect.media" + url

                        # Connect CRE article patterns
                        is_article = (
                            ("/news/" in url)
                            or has_year_in_url(url)
                            or ("/articles/" in url)
                        )

                        if is_article and url not in seen_urls:
                            seen_urls.add(url)
                            title = await link.inner_text()

                            if len(title) > 10:
                                print(f"Found: {title[:30]}... ({url})")
                                articles.append(
                                    {
                                        "source": "Connect CRE",
                                        "url": url,
                                        "title": title.strip(),
                                        "date_scraped": datetime.now().isoformat(),
                                    }
                                )
                    except Exception:
                        continue

                for article in articles:
                    try:
                        print(f"Scraping content: {article['title']}...")
                        await page.goto(article["url"], timeout=60000)

                        content = ""
                        selectors = ["article", ".article-content", ".entry-content", "main", "body"]

                        for selector in selectors:
                            try:
                                if await page.locator(selector).count() > 0:
                                    content = await page.locator(selector).first.inner_text()
                                    if len(content) > 500:
                                        break
                            except Exception:
                                continue

                        article["content"] = content[:15000]

                    except Exception as e:
                        print(f"Error scraping {article['url']}: {e}")

            except Exception as e:
                print(f"Error on Connect CRE: {e}")

            await browser.close()
        return articles

    async def scrape_propmodo(self):
        """Scrape Propmodo commercial real estate technology news."""
        print("Scraping Propmodo...")
        articles = []
        async with async_playwright() as p:
            browser = await p.chromium.launch(headless=self.headless)
            page = await browser.new_page()
            await page.goto("https://www.propmodo.com")

            try:
                await page.wait_for_selector("a", timeout=10000)
                
                for _ in range(3):
                    await page.evaluate("window.scrollBy(0, 1000)")
                    await asyncio.sleep(1)

                all_links = await page.locator("a").all()
                seen_urls = set()
                print(f"Scanning {len(all_links)} links...")

                for link in all_links:
                    if self.max_articles_per_source and len(articles) >= self.max_articles_per_source:
                        break

                    try:
                        url = await link.get_attribute("href")
                        if not url:
                            continue

                        if url.startswith("/"):
                            url = "https://www.propmodo.com" + url

                        # Propmodo article patterns
                        is_article = (
                            has_year_in_url(url)
                            or ("/news/" in url)
                        )

                        if is_article and url not in seen_urls:
                            seen_urls.add(url)
                            title = await link.inner_text()

                            if len(title) > 10:
                                print(f"Found: {title[:30]}... ({url})")
                                articles.append(
                                    {
                                        "source": "Propmodo",
                                        "url": url,
                                        "title": title.strip(),
                                        "date_scraped": datetime.now().isoformat(),
                                    }
                                )
                    except Exception:
                        continue

                for article in articles:
                    try:
                        print(f"Scraping content: {article['title']}...")
                        await page.goto(article["url"], timeout=60000)

                        content = ""
                        selectors = ["article", ".post-content", ".entry-content", "main", "body"]

                        for selector in selectors:
                            try:
                                if await page.locator(selector).count() > 0:
                                    content = await page.locator(selector).first.inner_text()
                                    if len(content) > 500:
                                        break
                            except Exception:
                                continue

                        article["content"] = content[:15000]

                    except Exception as e:
                        print(f"Error scraping {article['url']}: {e}")

            except Exception as e:
                print(f"Error on Propmodo: {e}")

            await browser.close()
        return articles

    async def scrape_naiop(self):
        """Scrape NAIOP (Commercial Real Estate Development Association) news."""
        print("Scraping NAIOP...")
        articles = []
        async with async_playwright() as p:
            browser = await p.chromium.launch(headless=self.headless)
            page = await browser.new_page()
            await page.goto("https://www.naiop.org")

            try:
                await page.wait_for_selector("a", timeout=10000)
                
                for _ in range(3):
                    await page.evaluate("window.scrollBy(0, 1000)")
                    await asyncio.sleep(1)

                all_links = await page.locator("a").all()
                seen_urls = set()
                print(f"Scanning {len(all_links)} links...")

                for link in all_links:
                    if self.max_articles_per_source and len(articles) >= self.max_articles_per_source:
                        break

                    try:
                        url = await link.get_attribute("href")
                        if not url:
                            continue

                        if url.startswith("/"):
                            url = "https://www.naiop.org" + url

                        # NAIOP article patterns
                        is_article = (
                            ("/news/" in url)
                            or ("/articles/" in url)
                            or ("/magazine/" in url)
                        )

                        if is_article and url not in seen_urls:
                            seen_urls.add(url)
                            title = await link.inner_text()

                            if len(title) > 10:
                                print(f"Found: {title[:30]}... ({url})")
                                articles.append(
                                    {
                                        "source": "NAIOP",
                                        "url": url,
                                        "title": title.strip(),
                                        "date_scraped": datetime.now().isoformat(),
                                    }
                                )
                    except Exception:
                        continue

                for article in articles:
                    try:
                        print(f"Scraping content: {article['title']}...")
                        await page.goto(article["url"], timeout=60000)

                        content = ""
                        selectors = ["article", ".article-content", ".entry-content", "main", "body"]

                        for selector in selectors:
                            try:
                                if await page.locator(selector).count() > 0:
                                    content = await page.locator(selector).first.inner_text()
                                    if len(content) > 500:
                                        break
                            except Exception:
                                continue

                        article["content"] = content[:15000]

                    except Exception as e:
                        print(f"Error scraping {article['url']}: {e}")

            except Exception as e:
                print(f"Error on NAIOP: {e}")

            await browser.close()
        return articles

    async def scrape_uli(self):
        """Scrape Urban Land Institute (ULI) news."""
        print("Scraping Urban Land Institute...")
        articles = []
        async with async_playwright() as p:
            browser = await p.chromium.launch(headless=self.headless)
            page = await browser.new_page()
            await page.goto("https://urbanland.uli.org")

            try:
                await page.wait_for_selector("a", timeout=10000)
                
                for _ in range(3):
                    await page.evaluate("window.scrollBy(0, 1000)")
                    await asyncio.sleep(1)

                all_links = await page.locator("a").all()
                seen_urls = set()
                print(f"Scanning {len(all_links)} links...")

                for link in all_links:
                    if self.max_articles_per_source and len(articles) >= self.max_articles_per_source:
                        break

                    try:
                        url = await link.get_attribute("href")
                        if not url:
                            continue

                        if url.startswith("/"):
                            url = "https://urbanland.uli.org" + url

                        # ULI article patterns
                        is_article = (
                            ("/articles/" in url)
                            or has_year_in_url(url)
                            or ("/news/" in url)
                        )

                        if is_article and url not in seen_urls:
                            seen_urls.add(url)
                            title = await link.inner_text()

                            if len(title) > 10:
                                print(f"Found: {title[:30]}... ({url})")
                                articles.append(
                                    {
                                        "source": "Urban Land Institute",
                                        "url": url,
                                        "title": title.strip(),
                                        "date_scraped": datetime.now().isoformat(),
                                    }
                                )
                    except Exception:
                        continue

                for article in articles:
                    try:
                        print(f"Scraping content: {article['title']}...")
                        await page.goto(article["url"], timeout=60000)

                        content = ""
                        selectors = ["article", ".article-content", ".entry-content", "main", "body"]

                        for selector in selectors:
                            try:
                                if await page.locator(selector).count() > 0:
                                    content = await page.locator(selector).first.inner_text()
                                    if len(content) > 500:
                                        break
                            except Exception:
                                continue

                        article["content"] = content[:15000]

                    except Exception as e:
                        print(f"Error scraping {article['url']}: {e}")

            except Exception as e:
                print(f"Error on ULI: {e}")

            await browser.close()
        return articles

    async def scrape_yardi_matrix(self):
        """Scrape Yardi Matrix market intelligence and research."""
        print("Scraping Yardi Matrix...")
        articles = []
        async with async_playwright() as p:
            browser = await p.chromium.launch(headless=self.headless)
            page = await browser.new_page()
            await page.goto("https://www.yardimatrix.com/publications")

            try:
                await page.wait_for_selector("a", timeout=10000)
                
                for _ in range(3):
                    await page.evaluate("window.scrollBy(0, 1000)")
                    await asyncio.sleep(1)

                all_links = await page.locator("a").all()
                seen_urls = set()
                print(f"Scanning {len(all_links)} links...")

                for link in all_links:
                    if self.max_articles_per_source and len(articles) >= self.max_articles_per_source:
                        break

                    try:
                        url = await link.get_attribute("href")
                        if not url:
                            continue

                        if url.startswith("/"):
                            url = "https://www.yardimatrix.com" + url

                        # Yardi Matrix publication patterns
                        is_article = (
                            ("/publications/" in url)
                            or ("/research/" in url)
                            or has_year_in_url(url)
                        )

                        # Ensure URL is from yardimatrix.com domain (proper URL validation)
                        try:
                            parsed = urlparse(url)
                            is_valid_domain = parsed.netloc == "www.yardimatrix.com" or parsed.netloc == "yardimatrix.com"
                        except:
                            is_valid_domain = False
                        
                        if is_article and url not in seen_urls and is_valid_domain:
                            seen_urls.add(url)
                            title = await link.inner_text()

                            if len(title) > 10:
                                print(f"Found: {title[:30]}... ({url})")
                                articles.append(
                                    {
                                        "source": "Yardi Matrix",
                                        "url": url,
                                        "title": title.strip(),
                                        "date_scraped": datetime.now().isoformat(),
                                    }
                                )
                    except Exception:
                        continue

                for article in articles:
                    try:
                        print(f"Scraping content: {article['title']}...")
                        await page.goto(article["url"], timeout=60000)

                        content = ""
                        selectors = ["article", ".publication-content", ".entry-content", "main", "body"]

                        for selector in selectors:
                            try:
                                if await page.locator(selector).count() > 0:
                                    content = await page.locator(selector).first.inner_text()
                                    if len(content) > 500:
                                        break
                            except Exception:
                                continue

                        article["content"] = content[:15000]

                    except Exception as e:
                        print(f"Error scraping {article['url']}: {e}")

            except Exception as e:
                print(f"Error on Yardi Matrix: {e}")

            await browser.close()
        return articles

    async def scrape_all_sources(self):
        """Scrape all configured sources and return aggregated results."""
        print("=== Starting scraping of all sources ===\n")
        
        all_articles = []
        
        # Scrape all sources
        sources = [
            self.scrape_the_real_deal(),
            self.scrape_bisnow(),
            self.scrape_globest(),
            self.scrape_commercial_observer(),
            self.scrape_cre_direct(),
            self.scrape_connect_cre(),
            self.scrape_propmodo(),
            self.scrape_naiop(),
            self.scrape_uli(),
            self.scrape_yardi_matrix(),
        ]
        
        # Execute all scrapers concurrently
        results = await asyncio.gather(*sources, return_exceptions=True)
        
        # Aggregate results
        for i, result in enumerate(results):
            if isinstance(result, Exception):
                print(f"Error in scraper {i}: {result}")
            else:
                all_articles.extend(result)
        
        print(f"\n=== Scraping complete: {len(all_articles)} total articles ===")
        return all_articles


async def main():
    scraper = CREScraper(headless=True)
    
    # Scrape all sources
    all_articles = await scraper.scrape_all_sources()
    print(f"Total articles scraped: {len(all_articles)}")

    # Save to JSON for next step (Extractor)
    with open("scraped_articles.json", "w") as f:
        json.dump(all_articles, f, indent=2)
    
    print(f"Saved {len(all_articles)} articles to scraped_articles.json")


if __name__ == "__main__":
    asyncio.run(main())
