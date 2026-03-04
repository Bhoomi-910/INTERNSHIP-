import os
import glob

# Search in src directory exclusively
search_dir = os.path.join(r"c:\Users\bhoom\Internship And Skill Recommendation Website\frontend\src", "**", "*.jsx")
files = glob.glob(search_dir, recursive=True)

for file in files:
    with open(file, 'r', encoding='utf-8') as f:
        content = f.read()

    if 'http://localhost:5001' in content:
        new_content = content.replace('http://localhost:5001', '')
        with open(file, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print(f"Updated {file}")
