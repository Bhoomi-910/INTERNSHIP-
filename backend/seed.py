from app import app, db
from models import User, Skill, Internship

def seed_data():
    with app.app_context():
        db.create_all()

        # 1. Create Skills
        skills = [
            "Python", "Java", "C++", "JavaScript", "React", "Node.js", "SQL",
            "MongoDB", "Machine Learning", "Data Science", "AWS", "Docker",
            "Git", "Communication", "Problem Solving", "Flask", "Django", "HTML", "CSS"
        ]

        skill_objects = {}
        for skill_name in skills:
            s = Skill.query.filter_by(name=skill_name).first()
            if not s:
                s = Skill(name=skill_name)
                db.session.add(s)
            skill_objects[skill_name] = s

        db.session.commit()

        if not User.query.filter_by(email="admin@internai.com").first():
            from werkzeug.security import generate_password_hash
            admin = User(
                name="Admin User",
                email="admin@internai.com",
                password_hash=generate_password_hash("admin123"),
                role="admin"
            )
            db.session.add(admin)

        # 2. Create Internships
        internships_data = [
            {
                "title": "Data Science Intern",
                "company": "Tech Solutions Inc.",
                "location": "Remote",
                "description": "Work on real-world data problems using Python and ML.",
                "required_skills": ["Python", "SQL", "Machine Learning", "Data Science"]
            },
            {
                "title": "Frontend Developer Intern",
                "company": "Creative Web Agency",
                "location": "New York, NY",
                "description": "Build responsive web interfaces using React and Tailwind.",
                "required_skills": ["JavaScript", "React", "HTML", "CSS", "Git"]
            },
            {
                "title": "Backend Developer Intern",
                "company": "FinTech Corp",
                "location": "San Francisco, CA",
                "description": "Develop robust APIs using Python Flask and PostgreSQL.",
                "required_skills": ["Python", "Flask", "SQL", "Docker", "Git"]
            },
            {
                "title": "Full Stack Developer Intern",
                "company": "Startup X",
                "location": "Austin, TX",
                "description": "Work across the entire stack using MERN.",
                "required_skills": ["JavaScript", "React", "Node.js", "MongoDB", "AWS"]
            },
            {
                "title": "Java Developer Intern",
                "company": "Enterprise Systems",
                "location": "Chicago, IL",
                "description": "Maintain and update legacy Java applications.",
                "required_skills": ["Java", "SQL", "Problem Solving"]
            }
        ]

        for data in internships_data:
            # Check if exists to avoid duplicates on re-run
            if Internship.query.filter_by(title=data['title'], company=data['company']).first():
                continue

            internship = Internship(
                title=data['title'],
                company=data['company'],
                location=data['location'],
                description=data['description']
            )

            for skill_name in data['required_skills']:
                if skill_name in skill_objects:
                    internship.required_skills.append(skill_objects[skill_name])

            db.session.add(internship)

        db.session.commit()
        print("Database seeded successfully!")

if __name__ == '__main__':
    seed_data()
