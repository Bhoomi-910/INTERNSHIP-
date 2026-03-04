# Internship and Skill Recommendation Website - Project Plan

## 1. Project Overview

### Problem Statement
Students often struggle to find internships that align with their skills and career goals. Conversely, companies struggle to find candidates with the specific skill sets required for their roles. There is also a lack of personalized guidance on what skills a student needs to acquire to become eligible for their dream roles.

### Objectives
-   To build a platform that bridges the gap between students and internship opportunities.
-   To utilize Machine Learning (content-based filtering) to recommend relevant internships.
-   To analyze a student's current skills and recommend courses/skills to bridge the gap for desired roles.
-   To provide a user-friendly interface for students to manage their profiles and applications.

### Target Users
-   **Students:** Looking for internships and skill improvement.
-   **Employers:** Posting internship opportunities (optional for MVP, can be scraped/seeded).
-   **Administrators:** Managing users and content.

### Unique Features
-   **Resume Parsing:** Automatically extract skills from uploaded resumes (PDF).
-   **AI-Driven Recommendations:** personalized internship feed based on skills match.
-   **Skill Gap Analysis:** Visual representation of missing skills for a specific target role.
-   **Course Recommendations:** Suggesting learning resources for missing skills.

---

## 2. Tech Stack Suggestion

### Frontend
-   **Framework:** React.js (Vite for fast build)
-   **Styling:** Tailwind CSS (for modern, responsive aesthetics)
-   **State Management:** Context API or Redux Toolkit
-   **Icons:** Lucide React or Heroicons

### Backend
-   **Framework:** Flask (Python) - Lightweight and excellent for ML integration.
-   **API:** RESTful API
-   **ML Libraries:** Scikit-learn (TF-IDF, Cosine Similarity), NLTK/Spacy (NLP), PyPDF2 (Resume Parsing)

### Database
-   **Primary DB:** PostgreSQL (Production) or SQLite (Development/MVP)
-   **ORM:** SQLAlchemy

### Authentication
-   **JWT (JSON Web Tokens):** Secure, stateless authentication.

---

## 3. System Architecture

### User Flow
1.  **Registration:** User signs up as a Student.
2.  **Profile Creation:** User uploads resume → System parses skills → User verifies/edits skills.
3.  **Dashboard:** User sees recommended internships and skill gaps.
4.  **Internship Details:** User views details and applies (or is redirected).
5.  **Skill Gap:** User selects a "Target Role" (e.g., Data Scientist) → System compares user skills vs. role requirements → Recommends courses.

### Database Schema (ER Diagram Concept)
*   **Users:** `id`, `name`, `email`, `password_hash`, `role`, `resume_url`, `created_at`
*   **Skills:** `id`, `name`, `category`
*   **UserSkills:** `user_id`, `skill_id` (Many-to-Many)
*   **Internships:** `id`, `title`, `company`, `description`, `location`, `url`, `created_at`
*   **InternshipSkills:** `internship_id`, `skill_id` (Many-to-Many - requirements)
*   **Applications:** `id`, `user_id`, `internship_id`, `status`

### ML Workflow
1.  **Data Collection:** Scrape or seed internship data (Title, Description, Required Skills).
2.  **Preprocessing:** Clean text, remove stop words, tokenize.
3.  **Feature Engineering:** Convert text (User Skills + Internship Description) into vectors using TF-IDF.
4.  **Similarity Calculation:** Compute Cosine Similarity between User Vector and all Internship Vectors.
5.  **Ranking:** Sort internships by similarity score and return top N results.

---

## 4. Core Features

### 1. User Registration & Auth
-   Secure login/signup forms.
-   Password hashing (bcrypt).
-   JWT token generation and validation.

### 2. Resume Upload & Parsing
-   **Input:** PDF file.
-   **Process:** Extract text using `PyPDF2` -> Use NLP (pattern matching or Named Entity Recognition) to find skills from a predefined skill list.
-   **Output:** List of identified skills (e.g., "Python", "React", "SQL").

### 3. Internship Recommendation Engine
-   Match identified user skills with internship requirements.
-   Cold start handling: If no resume, ask user to manually select skills tags.

### 4. Skill Gap Analysis
-   Allow user to select a dream job (e.g., "Full Stack Developer").
-   Fetch required skills for that role (from DB/aggregated data).
-   Compare: `Required Skills - User Skills = Missing Skills`.
-   Display missing skills with progress bars.

### 5. Admin Dashboard
-   View stats (total users, internships).
-   Manage (add/edit/delete) internships manually.

---

## 5. Machine Learning Implementation

### Dataset Structure
You can use a dataset from Kaggle or scrape sites like LinkedIn/Internshala.
**Format:**
```csv
job_title, company, description, required_skills, location
 "Data Analyst", "Google", "Analyze data using Python...", "Python, SQL, Tableau", "Remote"
```

### Algorithm: Content-Based Filtering
We treat the user's skillset as a "query" and find the "documents" (internships) that are most similar to it.

**Sample Python Code (Concept):**
```python
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

# 1. Corpus: User Skills string vs Internship Requirements strings
user_profile = "python basics machine learning sql"
internships = [
    "python django web development sql",  # Internship A
    "java spring boot hibernate",         # Internship B
    "machine learning python tensorflow"  # Internship C
]

# 2. Vectorize
vectorizer = TfidfVectorizer()
tfidf_matrix = vectorizer.fit_transform([user_profile] + internships)

# 3. Calculate Similarity
# The first vector is the user, the rest are internships
user_vector = tfidf_matrix[0]
internship_vectors = tfidf_matrix[1:]
similarity_scores = cosine_similarity(user_vector, internship_vectors)

# 4. Rank
# Returns indices of internships sorted by score
```

---

## 6. Step-by-Step Development Guide

### Folder Structure
```
project-root/
├── backend/
│   ├── app.py             # Main Flask application
│   ├── models.py          # Database models
│   ├── routes.py          # API endpoints
│   ├── recommender.py     # ML Logic
│   ├── parser.py          # Resume parsing logic
│   ├── config.py          # Configuration
│   ├── requirements.txt   # Dependencies
│   └── uploads/           # Storing resumes (temp)
├── frontend/
│   ├── src/
│   │   ├── components/    # Reusable UI components
│   │   ├── pages/         # Page layouts (Home, Dashboard)
│   │   ├── context/       # Auth context
│   │   ├── services/      # API calls (axios)
│   │   └── App.js         # Main React component
│   └── package.json
└── README.md
```

### Steps
1.  **Backend Setup:** Initialize Flask, setup SQLite DB, create `User` and `Internship` models.
2.  **Auth Implementation:** Create `/login` and `/register` routes returning JWTs.
3.  **ML Setup:** Create a script to seed the DB with sample internships. Implement `recommend(user_id)` function.
4.  **Frontend Setup:** Initialize React (Vite). Install Tailwind. Set up React Router.
5.  **Integration:** Create a form on Frontend to upload resume. Send file to Backend -> Backend parses and returns skills -> Frontend displays skills.

---

## 7. Deployment Guide

### Backend (Heroku/Render)
1.  Create `Procfile`: `web: gunicorn app:app`.
2.  Push code to GitHub.
3.  Connect repo to Render/Heroku.
4.  Set environment variables.

### Frontend (Vercel/Netlify)
1.  Run `npm run build`.
2.  Drag and drop user `dist` folder to Netlify OR connect GitHub repo to Vercel.

### Database
-   Use a managed PostgreSQL instance (e.g., Supabase, Neon, or Render's free tier).
-   Update `SQLALCHEMY_DATABASE_URI` in backend config.
