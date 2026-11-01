import re

with open("index.backup.html", "r", encoding="utf-8", errors="ignore") as f:
    text = f.read()

for m in re.finditer(r'([^{}]*(?:\.gate|\.pcs|\.pc)[^{}]*\{[^}]*\})', text):
    rule = m.group(1).strip()
    if any(k in rule for k in ["opacity", "visibility", "display", "transform", "animation"]):
        print(" ".join(rule.split())[:120])
