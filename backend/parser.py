import re
import PyPDF2

# A simple predefined list of skills to look for. In a real app, this might come from a DB or a more comprehensive library.
SKILLS_DB = [
    "Machine Learning", "Data Science", "Python", "Java", "C++", "C#", "SQL", "NoSQL",
    "MongoDB", "PostgreSQL", "React", "Angular", "Vue", "Node.js", "Express", "Django",
    "Flask", "Spring Boot", "AWS", "Azure", "Docker", "Kubernetes", "Git", "Jenkins",
    "TensorFlow", "PyTorch", "Scikit-learn", "Pandas", "NumPy", "Matplotlib", "Seaborn",
    "Tableau", "Power BI", "Excel", "Word", "PowerPoint", "Communication", "Teamwork",
    "Leadership", "Problem Solving", "Time Management", "Critical Thinking", "Creativity"
]

def extract_text_from_pdf(file_path):
    text = ""
    try:
        with open(file_path, 'rb') as file:
            reader = PyPDF2.PdfReader(file)
            for page in reader.pages:
                text += page.extract_text() + "\n"
    except Exception as e:
        print(f"Error reading PDF: {e}")
        return ""
    return text

def extract_skills(text):
    """
    Extract skills from text by matching against a predefined list.
    """
    found_skills = set()
    # Normalize text for matching
    normalized_text = text.lower()

    # Remove punctuation for cleaner matching
    normalized_text = re.sub(r'[^\w\s]', ' ', normalized_text)

    for skill in SKILLS_DB:
        # Check if the skill exists in the text as a whole word
        # Using regex to ensure we don't match substrings (e.g. "Java" in "Javascript")
        pattern = r'\b' + re.escape(skill.lower()) + r'\b'
        if re.search(pattern, normalized_text):
            found_skills.add(skill)

    return list(found_skills)

def parse_resume(file_path):
    text = extract_text_from_pdf(file_path)
    if not text:
        return []
    return extract_skills(text)
