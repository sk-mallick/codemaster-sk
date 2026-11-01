from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page(viewport={"width": 1280, "height": 800})
    page.goto("https://sparkfitness.in/", timeout=30000)
    page.wait_for_timeout(5000)
    page.screenshot(path="spark_5s.jpg", type="jpeg", quality=90)
    
    # Scroll slightly down
    page.evaluate("window.scrollBy(0, 300)")
    page.wait_for_timeout(1000)
    page.screenshot(path="spark_scrolled_300.jpg", type="jpeg", quality=90)
    
    # Full page
    page.screenshot(path="spark_full.jpg", full_page=True, type="jpeg", quality=90)
    browser.close()

print("Captured spark variants")
