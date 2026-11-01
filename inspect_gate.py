import re
from bs4 import BeautifulSoup

with open("index.backup.html", "r", encoding="utf-8", errors="ignore") as f:
    soup = BeautifulSoup(f.read(), "html.parser")

gate = soup.find(id="gate")
if gate:
    print("Gate element:")
    print("Classes:", gate.get("class"))
    print("Buttons inside gate:")
    for b in gate.find_all("button"):
        print(" ", b.get("class"), b.get("data-p"), b.get("aria-label"))
else:
    print("No gate found!")
