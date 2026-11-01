# -*- coding: utf-8 -*-
import subprocess
import re

css_no_hover_up = """
/* Disable image & card hover-up / jumping */
.project-card,
.project-card:hover,
.project-card:focus,
.project-card:focus-within,
.project-visual,
.project-visual:hover,
.project-visual .shot,
.project-visual:hover .shot,
.project-card:hover .project-visual .shot,
.project-card:hover .project-visual .placeholder,
.about-visual,
.about-visual:hover,
.about-img,
.about-img:hover,
.workspace-card,
.workspace-card:hover,
.workspace-img,
.workspace-card:hover .workspace-img,
.portrait-arch,
.portrait-arch:hover,
.portrait-img,
.portrait-img:hover {
  transform: none !important;
  translate: none !important;
}
"""

files = ["index.backup.html", "index.html", "index.fixed.html"]

for fname in files:
    with open(fname, "r", encoding="utf-8", errors="ignore") as f:
        content = f.read()
    
    # 1. Remove the accidentally inserted css from Script 8
    # Search for the block starting with /* Disable image & card hover-up / jumping */
    content = re.sub(r'\n/\* Disable image & card hover-up / jumping \*/.*?(?=\'</style>)', '', content, flags=re.DOTALL)
    
    # Also ensure `+'</style> is clean:
    # `@media(prefers-reduced-motion:reduce){.dv *{animation:none!important}.dv .hc{opacity:1}}\n`+'</style><main id="app"></main>';
    
    # 2. Put the CSS rule into <head> inside <style id="no-hover-up">
    if "<style id='no-hover-up'>" not in content:
        content = content.replace("</head>", f"<style id='no-hover-up'>{css_no_hover_up}</style></head>")
        
    with open(fname, "w", encoding="utf-8") as f:
        f.write(content)
        
    print(f"Fixed {fname}")
