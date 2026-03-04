from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
import os
from werkzeug.security import generate_password_hash, check_password_hash
from werkzeug.utils import secure_filename

# Import models
from models import db, User, Internship, Skill, Application
# Import services
from recommender import get_recommendations, analyze_skill_gap
from parser import parse_resume

app = Flask(__name__)

# Configuration (reads from env vars for production, falls back to dev defaults)
app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get('DATABASE_URL', 'sqlite:///internship_platform.db')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['JWT_SECRET_KEY'] = os.environ.get('JWT_SECRET_KEY', 'your-secret-key-change-in-production')
app.config['UPLOAD_FOLDER'] = 'uploads'

# Initialize Extensions
db.init_app(app)
CORS(app, resources={r"/*": {"origins": "*"}})
jwt = JWTManager(app)

# Ensure upload directory exists
os.makedirs(app.config['UPLOAD_FOLDER'], exist_ok=True)

# Auto-create database tables
with app.app_context():
    db.create_all()

# --- Routes ---

@app.route('/health', methods=['GET'])
def health_check():
    return jsonify({"status": "ok"}), 200

@app.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    if User.query.filter_by(email=data['email']).first():
        return jsonify({"message": "User already exists"}), 400

    hashed_password = generate_password_hash(data['password'])
    new_user = User(
        name=data['name'],
        email=data['email'],
        password_hash=hashed_password,
        role=data.get('role', 'student')
    )
    db.session.add(new_user)
    db.session.commit()

    return jsonify({"message": "User created successfully"}), 201

@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    user = User.query.filter_by(email=data['email']).first()

    if user and check_password_hash(user.password_hash, data['password']):
        access_token = create_access_token(identity=user.id)
        return jsonify(access_token=access_token, user={"id": user.id, "name": user.name, "role": user.role}), 200

    return jsonify({"message": "Invalid credentials"}), 401

@app.route('/upload_resume', methods=['POST'])
@jwt_required()
def upload_resume():
    if 'resume' not in request.files:
        return jsonify({"message": "No file part"}), 400

    file = request.files['resume']
    if file.filename == '':
        return jsonify({"message": "No selected file"}), 400

    if file:
        filename = secure_filename(file.filename)
        filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        file.save(filepath)

        # Parse skills
        extracted_skills = parse_resume(filepath)

        # Update user skills in DB
        current_user_id = get_jwt_identity()
        user = User.query.get(current_user_id)
        user.resume_url = filepath

        # Logic to associate extracted skills with user
        # In a real app, you'd find existing Skill objects or create new ones
        # For simplicity, we assume skills exist or we create them if not

        skills_added = []
        for skill_name in extracted_skills:
            skill = Skill.query.filter_by(name=skill_name).first()
            if not skill:
                skill = Skill(name=skill_name)
                db.session.add(skill)

            if skill not in user.skills:
                user.skills.append(skill)
                skills_added.append(skill.name)

        db.session.commit()

        return jsonify({
            "message": "Resume uploaded and skills extracted",
            "extracted_skills": skills_added
        }), 200

@app.route('/recommendations', methods=['GET'])
@jwt_required()
def get_user_recommendations():
    current_user_id = get_jwt_identity()
    user = User.query.get(current_user_id)

    # Get user skills as a list of strings
    user_skills = [s.name for s in user.skills]

    # Get all internships
    all_internships = Internship.query.all()
    internships_data = []

    for internship in all_internships:
        internships_data.append({
            'id': internship.id,
            'title': internship.title,
            'company': internship.company,
            'required_skills': [s.name for s in internship.required_skills], # Assuming relationship exists
            'description': internship.description
            # Add other fields as needed
        })

    recommendations = get_recommendations(user_skills, internships_data)

    return jsonify(recommendations), 200

@app.route('/internships', methods=['GET'])
def get_internships():
    internships = Internship.query.all()
    output = []
    for internship in internships:
        output.append({
            'id': internship.id,
            'title': internship.title,
            'company': internship.company,
            'required_skills': [s.name for s in internship.required_skills],
            'location': internship.location
        })
    return jsonify(output), 200

@app.route('/skill_gap', methods=['POST'])
@jwt_required()
def get_skill_gap():
    """
    Input: { "target_role": "Data Scientist" }
    # For MVP, we Map roles to a hardcoded list of skills or search for an internship with that title
    """
    data = request.get_json()
    target_role = data.get('target_role')

    if not target_role:
        return jsonify({"message": "Target role is required"}), 400

    # Simple logic: Find an internship that matches the target role title best
    # In a real app, you would have a separate 'Roles' table with required skills
    target_internship = Internship.query.filter(Internship.title.ilike(f"%{target_role}%")).first()

    if not target_internship:
        # Fallback: just return empty or error
        return jsonify({"message": "Role not found in our database. Try 'Data Science', 'Frontend', 'Backend'"}), 404

    target_skills = [s.name for s in target_internship.required_skills]

    current_user_id = get_jwt_identity()
    user = User.query.get(current_user_id)
    user_skills = [s.name for s in user.skills]

    analysis = analyze_skill_gap(user_skills, target_skills)

    return jsonify({
        "target_role": target_internship.title,
        "required_skills": target_skills,
        "missing_skills": analysis['missing_skills'],
        "match_percentage": analysis['match_percentage']
    }), 200

@app.route('/admin/stats', methods=['GET'])
@jwt_required()
def admin_stats():
    current_user_id = get_jwt_identity()
    user = User.query.get(current_user_id)
    if user.role != 'admin':
        return jsonify({"message": "Unauthorized"}), 403

    user_count = User.query.count()
    internship_count = Internship.query.count()
    application_count = Application.query.count()

    return jsonify({
        "users": user_count,
        "internships": internship_count,
        "applications": application_count
    }), 200

@app.route('/user/skills', methods=['GET', 'POST', 'DELETE'])
@jwt_required()
def manage_skills():
    current_user_id = get_jwt_identity()
    user = User.query.get(current_user_id)

    if request.method == 'GET':
        return jsonify([s.name for s in user.skills]), 200

    if request.method == 'POST':
        data = request.get_json()
        skill_name_raw = data.get('skill')
        if not skill_name_raw:
            return jsonify({"message": "Skill name required"}), 400

        # Normalize: Title Case (e.g., 'python' -> 'Python')
        skill_name = skill_name_raw.strip()
        # Simple Title Case, but handle existing better

        # Check if skill exists (case-insensitive)
        skill = Skill.query.filter(Skill.name.ilike(skill_name)).first()

        if not skill:
            # Create new skill (Store as Title Case for consistency)
            skill = Skill(name=skill_name.title())
            db.session.add(skill)

        if skill not in user.skills:
            user.skills.append(skill)
            try:
                db.session.commit()
                return jsonify({"message": "Skill added", "skill": skill.name}), 201
            except Exception as e:
                db.session.rollback()
                return jsonify({"message": f"Database error: {str(e)}"}), 500

        return jsonify({"message": "Skill already exists in your profile"}), 200

    if request.method == 'DELETE':
        data = request.get_json()
        skill_name = data.get('skill')
        # Find skill case-insensitive
        skill = Skill.query.filter(Skill.name.ilike(skill_name)).first()

        if skill and skill in user.skills:
            user.skills.remove(skill)
            db.session.commit()
            return jsonify({"message": "Skill removed"}), 200
        return jsonify({"message": "Skill not found in user profile"}), 404

@app.route('/user/profile', methods=['PUT'])
@jwt_required()
def update_profile():
    try:
        current_user_id = get_jwt_identity()
        user = User.query.get(current_user_id)
        if not user:
            return jsonify({"message": "User not found"}), 404

        data = request.get_json()
        if not data:
            return jsonify({"message": "No data provided"}), 400

        if 'name' in data:
            user.name = data['name']

        if 'email' in data:
            # Check uniqueness if email is changing
            if data['email'] != user.email:
                if User.query.filter_by(email=data['email']).first():
                     return jsonify({"message": "Email already in use"}), 400
                user.email = data['email']

        if 'password' in data and data['password']:
             user.password_hash = generate_password_hash(data['password'])

        db.session.commit()
        return jsonify({"message": "Profile updated", "user": {"name": user.name, "email": user.email}}), 200
    except Exception as e:
        db.session.rollback()
        import traceback
        traceback.print_exc()
        return jsonify({"message": f"Server error: {str(e)}"}), 500

# Admin: Add Internship
@app.route('/admin/internships', methods=['POST'])
@jwt_required()
def add_internship():
    current_user_id = get_jwt_identity()
    user = User.query.get(current_user_id)
    if user.role != 'admin':
        return jsonify({"message": "Unauthorized"}), 403

    data = request.get_json()
    new_internship = Internship(
        title=data['title'],
        company=data['company'],
        description=data['description'],
        location=data.get('location', 'Remote')
    )

    if 'required_skills' in data:
        for skill_name in data['required_skills']:
            skill = Skill.query.filter_by(name=skill_name).first()
            if not skill:
                skill = Skill(name=skill_name)
                db.session.add(skill)
            new_internship.required_skills.append(skill)

    db.session.add(new_internship)
    db.session.commit()
    return jsonify({"message": "Internship added successfully"}), 201

# Application endpoints
@app.route('/apply', methods=['POST'])
@jwt_required()
def apply_internship():
    current_user_id = get_jwt_identity()
    data = request.get_json()
    internship_id = data.get('internship_id')

    if not internship_id:
        return jsonify({"message": "Internship ID required"}), 400

    # Ensure the internship exists
    internship = Internship.query.get(internship_id)
    if not internship:
        return jsonify({"message": "Internship not found"}), 404

    # Check if user already applied
    existing_app = Application.query.filter_by(user_id=current_user_id, internship_id=internship_id).first()
    if existing_app:
        return jsonify({"message": "You have already applied for this internship"}), 400

    new_app = Application(user_id=current_user_id, internship_id=internship_id)
    db.session.add(new_app)
    db.session.commit()

    return jsonify({"message": "Application submitted successfully"}), 201

@app.route('/user/applications', methods=['GET'])
@jwt_required()
def get_user_applications():
    current_user_id = get_jwt_identity()
    applications = Application.query.filter_by(user_id=current_user_id).all()

    output = []
    for app in applications:
        internship = Internship.query.get(app.internship_id)
        if internship:
            output.append({
                "id": app.id,
                "internship_id": internship.id,
                "title": internship.title,
                "company": internship.company,
                "status": app.status,
                "applied_at": app.applied_at.isoformat()
            })
    return jsonify(output), 200

# Additional Admin Endpoints
@app.route('/admin/users', methods=['GET'])
@jwt_required()
def get_admin_users():
    current_user_id = get_jwt_identity()
    user = User.query.get(current_user_id)
    if user.role != 'admin':
        return jsonify({"message": "Unauthorized"}), 403

    users = User.query.all()
    output = []
    for u in users:
        output.append({
            "id": u.id,
            "name": u.name,
            "email": u.email,
            "role": u.role,
            "created_at": u.created_at.isoformat()
        })
    return jsonify(output), 200

@app.route('/admin/users/<int:user_id>', methods=['DELETE'])
@jwt_required()
def delete_admin_user(user_id):
    current_user_id = get_jwt_identity()
    current_user = User.query.get(current_user_id)
    if current_user.role != 'admin':
        return jsonify({"message": "Unauthorized"}), 403

    user_to_delete = User.query.get(user_id)
    if not user_to_delete:
        return jsonify({"message": "User not found"}), 404

    if user_to_delete.id == current_user_id:
        return jsonify({"message": "Cannot delete yourself"}), 400

    # Delete related applications
    Application.query.filter_by(user_id=user_id).delete()

    db.session.delete(user_to_delete)
    db.session.commit()
    return jsonify({"message": "User deleted successfully"}), 200

@app.route('/admin/applications', methods=['GET'])
@jwt_required()
def get_admin_applications():
    current_user_id = get_jwt_identity()
    user = User.query.get(current_user_id)
    if user.role != 'admin':
        return jsonify({"message": "Unauthorized"}), 403

    applications = Application.query.all()
    output = []
    for app in applications:
        applicant = User.query.get(app.user_id)
        internship = Internship.query.get(app.internship_id)
        if applicant and internship:
            output.append({
                "id": app.id,
                "applicant_name": applicant.name,
                "applicant_email": applicant.email,
                "internship_title": internship.title,
                "company": internship.company,
                "status": app.status,
                "applied_at": app.applied_at.isoformat()
            })
    return jsonify(output), 200

# Utility to initialize DB
@app.cli.command("init-db")
def init_db_command():
    """Clear existing data and create new tables."""
    db.create_all()
    print("Initialized the database.")

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5001))
    app.run(debug=True, port=port)
