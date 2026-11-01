with open("index.backup.html", "r", encoding="utf-8", errors="ignore") as f:
    text = f.read()

import re
matches = re.findall(r'(\.pc\s*\{[^}]*\})', text)
for m in matches:
    print(m)

matches2 = re.findall(r'(\.gate[^{]*\{[^}]*\})', text)
for m in matches2:
    print(m)
