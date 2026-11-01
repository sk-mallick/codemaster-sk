from playwright.sync_api import sync_playwright
import os

html_path = os.path.abspath("index.backup.html")
url = f"file:///{html_path.replace(os.sep, '/')}"

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    page = browser.new_page(viewport={"width": 1440, "height": 900})
    page.goto(url)
    page.wait_for_timeout(1000)
    
    # bypass gate if present
    gate_btn = page.query_selector('.pc[data-p="client"]')
    if gate_btn:
        gate_btn.click()
        page.wait_for_timeout(1500)
        
    page.locator("#work").scroll_into_view_if_needed()
    page.wait_for_timeout(800)
    
    # Select first project card
    card = page.locator("#work .project-card").first
    card.hover()
    page.wait_for_timeout(500)
    
    # Check transform on card and on image
    card_transform = card.evaluate("el => getComputedStyle(el).transform")
    img_transform = page.locator("#work .project-card img.shot").first.evaluate("el => getComputedStyle(el).transform")
    
    print("Card transform on hover:", card_transform)
    print("Image transform on hover:", img_transform)
    
    # Also test workspace image hover
    page.locator("#about").scroll_into_view_if_needed()
    page.wait_for_timeout(500)
    ws_img = page.locator("#about img").first
    if ws_img:
        ws_img.hover()
        page.wait_for_timeout(300)
        ws_transform = ws_img.evaluate("el => getComputedStyle(el).transform")
        print("Workspace image transform on hover:", ws_transform)
        
    browser.close()

