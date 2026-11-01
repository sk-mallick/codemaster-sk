with open("index.backup.html", "r", encoding="utf-8", errors="ignore") as f:
    text = f.read()

import re

# Find where css_no_hover_up was inserted in index.backup.html
bad_str = "/* Disable image & card hover-up / jumping */"
pos = text.find(bad_str)
print("Position of bad_str in text:", pos)
if pos != -1:
    print("Context around bad_str:")
    print(repr(text[pos-100:pos+200]))
