# Software Requirements Specification (SRS)
## Internship and Skill Recommendation Website

**Version:** 1.0
**Date:** February 10, 2026

---

## 1. Introduction

### 1.1 Purpose
The purpose of this document is to explicitly define the software requirements for the "Internship and Skill Recommendation Website". This document covers the functional and non-functional requirements, system interfaces, and design constraints of the system. It is intended for the development team, project stakeholders, and testers.

### 1.2 Scope
The "Internship and Skill Recommendation Website" is a web-based platform designed to bridge the gap between students and internship opportunities. The system utilizes Artificial Intelligence (AI) and Machine Learning (ML) to:
*   Parse student resumes to extract skills automatically.
*   Recommend relevant internships based on skill matching.
*   Analyze skill gaps for desired roles and suggest improvements.
*   Provide a dashboard for students to manage their profiles and view insights.
*   Provide an admin interface for managing system data.

### 1.3 Definitions, Acronyms, and Abbreviations
*   **SRS**: Software Requirements Specification
*   **AI**: Artificial Intelligence
*   **ML**: Machine Learning
*   **NLP**: Natural Language Processing
*   **JWT**: JSON Web Token (for secure authentication)
*   **UI/UX**: User Interface / User Experience
*   **CV/Resume**: Curriculum Vitae

### 1.4 Technologies
*   **Frontend**: React.js, Tailwind CSS, Vite
*   **Backend**: Python Flask
*   **Database**: SQLite (Development) / PostgreSQL (Production)
*   **ML/NLP**: Scikit-learn, NLTK, PyPDF2

---

## 2. Overall Description

### 2.1 Product Perspective
This is a standalone web application containing a client-side interface (React) and a server-side API (Flask). It interacts with a database to store user profiles, internships, and skill data. It also integrates with a local file system for temporary resume processing.

### 2.2 Product Functions
The major functions of the system include:
*   **User Account Management**: Registration, Login, Profile Management.
*   **Resume Parsing**: Extracting text/skills from PDF resumes.
*   **Internship Recommendation**: Displaying internships ranked by relevance to user skills.
*   **Skill Gap Analysis**: Comparing user skills against a target role to identify missing requirements.
*   **Dashboard**: A central hub for students to view stats, matches, and manage uploaded data.
*   **Admin Management**: Interface for system administrators to view statistics (User/Internship counts).

### 2.3 User Classes and Characteristics
*   **Student**: The primary user. Tech-savvy enough to browse websites and upload files. Goals: Find internships, understand skill gaps.
*   **Administrator**: Technical user. Manages the platform's data and overlooks system health.

### 2.4 Operating Environment
*   **Client**: Modern web browsers (Chrome, Firefox, Safari, Edge).
*   **Server**: OS supporting Python 3.8+ (Windows/Linux/MacOS). Database service (SQLite/PostgreSQL).

### 2.5 Constraints
*   **Resume Format**: Currently supports PDF format only.
*   **Language**: English language resumes and job descriptions.

---

## 3. System Features (Functional Requirements)

### 3.1 User Authentication & Profile
*   **REQ-1**: The system shall allow users to register with name, email, password, and role.
*   **REQ-2**: The system shall allow users to log in using secure JWT authentication.
*   **REQ-3**: The system shall allow users to update their profile information (name, email, password).

### 3.2 Resume Parsing
*   **REQ-4**: The system shall provide an interface for users to upload a PDF resume.
*   **REQ-5**: The system shall extract text from the uploaded PDF.
*   **REQ-6**: The system shall use NLP/Keyword matching to identify technical skills from the extracted text.
*   **REQ-7**: The system must save the extracted skills to the user's profile database.

### 3.3 Recommendation Engine
*   **REQ-8**: The system shall fetch all active internships from the database.
*   **REQ-9**: The system shall implement a content-based filtering algorithm (Cosine Similarity) to compare user skills with internship requirements.
*   **REQ-10**: The system shall display the top matches to the user on their dashboard.

### 3.4 Skill Gap Analysis
*   **REQ-11**: The system shall allow users to input a "Target Role" (e.g., Data Scientist).
*   **REQ-12**: The system shall identify the required skills for the target role (based on existing internship data or predefined maps).
*   **REQ-13**: The system shall calculate the match percentage and identify missing skills.
*   **REQ-14**: The system shall display the analysis results visually to the user.

### 3.5 Admin Dashboard
*   **REQ-15**: The system shall provide a protected route `/dashboard/admin` accessible only to users with the 'admin' role.
*   **REQ-16**: The dashboard shall display key metrics: Total Users, Total Internships, Total Applications.

---

## 4. External Interface Requirements

### 4.1 User Interfaces
*   **Web Design**: Responsive, modern UI using Tailwind CSS.
*   **Theme**: Professional color palette (Indigo/Purple/White) with consistent typography (Outfit font).
*   **Accessibility**: Interfaces should differ clearly between interactive and non-interactive elements.

### 4.2 Software Interfaces
*   **Database**: SQLAlchemy ORM for database interactions.
*   **API**: RESTful API endpoints exchanging data in JSON format.

---

## 5. Non-Functional Requirements

### 5.1 Performance
*   **Response Time**: API responses should generally occur within 1 second.
*   **Resume Processing**: Parsing a standard 1-2 page PDF should take less than 5 seconds.

### 5.2 Security
*   **Passwords**: User passwords must be hashed (e.g., pbkdf2:sha256) before storage.
*   **Tokens**: API access must be secured using time-limited JWTs.
*   **Validation**: Input data (files, text) must be validated to prevent common web attacks.

### 5.3 Reliability
*   **Availability**: The system should be available 99% of the time during business hours.
*   **Data Integrity**: User data and skill associations must remain consistent.

### 5.4 Maintainability
*   The code should be modular (separation of Frontend and Backend).
*   Code should follow standard styling guidelines (PEP 8 for Python).

---

## 6. Appendix
*   **Future Enhancements**:
    *   Integration with LinkedIn API.
    *   Collaborative filtering (recommending based on similar users).
    *   Email notifications for new matches.
    *   Employer portal for posting jobs directly.
