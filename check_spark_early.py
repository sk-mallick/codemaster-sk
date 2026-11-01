from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page(viewport={"width": 1280, "height": 800})
    page.goto("https://sparkfitness.in/", wait_until="domcontentloaded")
    page.wait_for_timeout(1000)
    page.screenshot(path="spark_early.jpg", type="jpeg", quality=90)
    browser.close()

print("Captured spark_early.jpg")
