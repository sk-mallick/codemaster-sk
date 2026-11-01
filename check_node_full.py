import subprocess

res = subprocess.run(["node", "-c", "temp_test.js"], capture_output=True, text=True)
print("Return code:", res.returncode)
print("STDERR:")
print(res.stderr)
