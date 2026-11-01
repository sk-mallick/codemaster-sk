with open("temp_test.js", "r", encoding="utf-8", errors="ignore") as f:
    text = f.read()

import re
matches = [m.start() for m in re.finditer(r'`\+', text)]
print("Matches for `+ :", matches)
for pos in matches:
    start = max(0, pos - 80)
    end = min(len(text), pos + 80)
    print("Snippet around match:")
    print(repr(text[start:end]))
