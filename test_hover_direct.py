from playwright.sync_api import sync_playwright
import os

html_path = os.path.abspath("index.backup.html")
url = f"file:///{html_path.replace(os.sep, '/')}"

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    page = browser.new_page(viewport={"width": 1440, "height": 900})
    page.goto(url)
    
    # Hide gate completely
    page.evaluate("""() => {
        const gate = document.getElementById('gate');
        if (gate) { gate.remove(); }
        const splash = document.getElementById('introSplash');
        if (splash) { splash.remove(); }
        document.querySelectorAll('[inert]').forEach(el => el.removeAttribute('inert'));
    }""")
    page.wait_for_timeout(500)
    
    # Scroll to work
    page.locator("#work").scroll_into_view_if_needed()
    page.wait_for_timeout(500)
    
    card = page.locator("#work .project-card").first
    card.hover()
    page.wait_for_timeout(300)
    
    card_tr = card.evaluate("el => getComputedStyle(el).transform")
    img_tr = page.locator("#work .project-card img.shot").first.evaluate("el => getComputedStyle(el).transform")
    
    print("HOVER CHECK:")
    print("  Card transform on hover:", card_tr)
    print("  Image transform on hover:", img_tr)
    
    browser.close()

