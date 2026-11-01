# -*- coding: utf-8 -*-
import subprocess

files = ["index.backup.html", "index.html", "index.fixed.html"]

target_bad = """`+'
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
</style><main id="app"></main>';"""

replacement_good = "`+'</style><main id=\"app\"></main>';"

for fname in files:
    with open(fname, "r", encoding="utf-8", errors="ignore") as f:
        content = f.read()
    
    if target_bad in content:
        content = content.replace(target_bad, replacement_good)
        print(f"Fixed exact bad block in {fname}!")
    else:
        # Fallback regex if newlines differ
        import re
        pattern = r"`\+'\s*/\* Disable image & card hover-up / jumping \*/.*?</style><main id=\"app\"></main>'\s*;"
        content = re.sub(pattern, replacement_good, content, flags=re.DOTALL)
        print(f"Regex applied to {fname}")
        
    with open(fname, "w", encoding="utf-8") as f:
        f.write(content)

print("Saved files. Now testing check_all_scripts.py...")
