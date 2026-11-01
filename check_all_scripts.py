import subprocess
from bs4 import BeautifulSoup

with open("index.backup.html", "r", encoding="utf-8", errors="ignore") as f:
    soup = BeautifulSoup(f.read(), "html.parser")

scripts = soup.find_all("script")

for i, s in enumerate(scripts):
    stype = s.get("type", "")
    src = s.get("src")
    if stype == "application/ld+json" or src:
        continue
    code = s.text.strip()
    fname = f"script_{i}.js"
    with open(fname, "w", encoding="utf-8") as tf:
        tf.write(code)
    res = subprocess.run(["node", "-c", fname], capture_output=True, text=True)
    if res.returncode != 0:
        print(f"\n==============================")
        print(f"ERROR IN SCRIPT {i} ({fname}):")
        print(res.stderr)
        print("==============================\n")
    else:
        print(f"Script {i}: OK")
