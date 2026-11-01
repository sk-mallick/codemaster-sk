with open("temp_test.js", "r", encoding="utf-8", errors="ignore") as f:
    lines = f.readlines()

print(f"Total lines in script 8: {len(lines)}")
for idx in range(max(0, 230), min(len(lines), 245)):
    print(f"{idx+1}: {repr(lines[idx])}")
