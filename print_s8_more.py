with open("script_8.js", "r", encoding="utf-8", errors="ignore") as f:
    lines = f.readlines()

for i in range(245, 270):
    print(f"{i+1}: {repr(lines[i])}")
