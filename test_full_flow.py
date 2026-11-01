from playwright.sync_api import sync_playwright
import os

url = 'file:///' + os.path.abspath('index.backup.html').replace(os.sep, '/')
errors = []
logs = []

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page(viewport={'width': 1440, 'height': 900})
    page.on('console', lambda m: logs.append(f'[{m.type}] {m.text}'))
    page.on('pageerror', lambda e: errors.append(str(e)))
    
    print("Navigating to page...")
    page.goto(url)
    
    # Wait 2 seconds (during or after Subham intro)
    page.wait_for_timeout(2000)
    page.screenshot(path="test_after_intro.png")
    print("Captured test_after_intro.png")
    
    # Wait for gate or check gate buttons
    client_btn = page.query_selector('.pc[data-p="client"]')
    if client_btn:
        print("Found client button on gate! Clicking it...")
        client_btn.click()
        page.wait_for_timeout(1500)
        page.screenshot(path="test_after_gate_click.png")
        print("Captured test_after_gate_click.png")
    else:
        print("No client button found directly.")
        
    page.screenshot(path="test_main_view.png")
    browser.close()

print("\nERRORS DETECTED:", errors)
print("LOGS:", logs[:10])
