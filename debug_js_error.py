from playwright.sync_api import sync_playwright
import os

url = 'file:///' + os.path.abspath('index.backup.html').replace(os.sep, '/')

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page()
    
    def on_error(err):
        print("Page Error details:")
        print("  Message:", err.message)
        print("  Name:", err.name)
        print("  Stack:", err.stack)
        
    page.on("pageerror", on_error)
    page.goto(url)
    page.wait_for_timeout(2000)
    browser.close()
