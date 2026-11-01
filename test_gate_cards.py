from playwright.sync_api import sync_playwright
import os

url = 'file:///' + os.path.abspath('index.backup.html').replace(os.sep, '/')
errors = []

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page(viewport={'width': 1440, 'height': 900})
    page.on('pageerror', lambda e: errors.append(str(e)))
    page.goto(url)
    
    # Wait 2.5s for intro to finish and gate.ready to trigger (at 1.75s)
    page.wait_for_timeout(2500)
    page.screenshot(path="gate_with_cards.png")
    
    # Check if cards are visible
    cards_visible = page.evaluate("""() => {
        const gate = document.getElementById('gate');
        const pcs = Array.from(document.querySelectorAll('.pc'));
        return {
            gateReady: gate ? gate.classList.contains('ready') : false,
            gateOut: gate ? gate.classList.contains('out') : false,
            pcCount: pcs.length,
            pcStyles: pcs.map(p => ({
                opacity: getComputedStyle(p).opacity,
                visibility: getComputedStyle(p).visibility,
                display: getComputedStyle(p).display
            }))
        };
    }""")
    print("Gate evaluation:", cards_visible)
    browser.close()

if errors:
    print("Errors:", errors)
else:
    print("Zero page errors!")
