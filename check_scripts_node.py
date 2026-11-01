import subprocess
from bs4 import BeautifulSoup

with open("index.backup.html", "r", encoding="utf-8", errors="ignore") as f:
    soup = BeautifulSoup(f.read(), "html.parser")

scripts = soup.find_all("script")
print(f"Total script tags: {len(scripts)}")

for i, s in enumerate(scripts):
    src = s.get("src")
    stype = s.get("type", "")
    if stype == "application/ld+json":
        continue
    if src:
        continue
    code = s.text.strip()
    if not code:
        continue
    # write to temp js file and test with node
    with open("temp_test.js", "w", encoding="utf-8") as tf:
        tf.write(code)
    res = subprocess.run(["node", "-c", "temp_test.js"], capture_output=True, text=True)
    if res.returncode != 0:
        print(f"\n[SYNTAX ERROR in Script {i}]:")
        print(res.stderr)
        lines = code.splitlines()
        print("First 5 lines of script:")
        for l in lines[:5]:
            print(" ", l)
    else:
        print(f"Script {i}: Valid syntax ({len(code)} chars)")
