with open("index.backup.html", "r", encoding="utf-8", errors="ignore") as f:
    text = f.read()

import re
matches = [line.strip() for line in text.splitlines() if "ready" in line and "gate" in line]
print("Lines with gate and ready:")
for m in matches:
    print(" ", m)

matches2 = [line.strip() for line in text.splitlines() if "classList.add" in line and ("gate" in line or "ready" in line)]
print("\nLines adding ready/gate class:")
for m in matches2:
    print(" ", m)
