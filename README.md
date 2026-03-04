# Internship and Skill Recommendation Website

This repository contains the backend and project plan for the Internship and Skill Recommendation Website.

## Structure

*   `PROJECT_PLAN.md`: A comprehensive guide covering the project overview, architecture, and features.
*   `MINOR_PROJECT_DOCUMENTATION_TEMPLATE.md`: A template for your minor project report/thesis.
*   `backend/`: The Flask backend application with ML integration.
    *   `app.py`: Main application entry point (API routes).
    *   `models.py`: Database models (User, Internship, Skill).
    *   `recommender.py`: ML logic for content-based filtering.
    *   `parser.py`: Resume parsing logic.
    *   `requirements.txt`: Python dependencies.

## Getting Started (Backend)

1.  Navigate to the backend directory:
    ```bash
    cd backend
    ```
2.  Create a virtual environment (optional but recommended):
    ```bash
    python -m venv venv
    # Windows
    venv\Scripts\activate
    # Mac/Linux
    source venv/bin/activate
    ```
3.  Install dependencies:
    ```bash
    pip install -r requirements.txt
    ```
4.  Run the application:
    ```bash
    python app.py
    ```

## Frontend Setup (Required)

You need to set up the React frontend. Run the following commands in the root directory:

```bash
npm create vite@latest frontend -- --template react
cd frontend
npm install
npm install axios react-router-dom lucide-react
npm run dev
```

Then, you can start building the UI components as described in `PROJECT_PLAN.md`.
