with open("script_8.js", "r", encoding="utf-8", errors="ignore") as f:
    lines = f.readlines()

print(f"Total lines in script_8.js: {len(lines)}")
for idx in range(225, min(len(lines), 245)):
    print(f"Line {idx+1}: {repr(lines[idx])}")
