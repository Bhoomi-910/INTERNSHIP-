import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
from models import Internship

def get_recommendations(user_skills_list, internships_data):
    """
    Generate internship recommendations based on content-based filtering.

    Args:
    - user_skills_list (list): List of skill names from the user (e.g., ['Python', 'SQL']).
    - internships_data (list of dict): List of internships with 'id', 'title', 'company', 'required_skills' (list of str).

    Returns:
    - list of dict: Top recommended internships with similarity scores.
    """

    if not user_skills_list:
        return []

    # 1. Prepare Data
    # Convert user skills to a single string
    user_skills_str = " ".join(user_skills_list).lower()

    internship_descriptions = []
    internship_ids = []

    for internship in internships_data:
        # Combine title, company, and required skills for richer context
        # We emphasize skills by repeating them or making them the core part
        skills_str = " ".join(internship['required_skills']).lower()
        desc = f"{internship['title']} {internship['company']} {skills_str}"
        internship_descriptions.append(desc.lower())
        internship_ids.append(internship['id'])

    # 2. Add User Profile to the corpus as the first document
    documents = [user_skills_str] + internship_descriptions

    # 3. TF-IDF Vectorization
    vectorizer = TfidfVectorizer(stop_words='english')
    tfidf_matrix = vectorizer.fit_transform(documents)

    # 4. Calculate Cosine Similarity
    # Compare user vector (index 0) with all internship vectors (index 1 to end)
    user_vector = tfidf_matrix[0]
    internship_vectors = tfidf_matrix[1:]

    similarity_scores = cosine_similarity(user_vector, internship_vectors).flatten()

    # 5. Rank Internships
    # Create a list of (index, score)
    scores_with_indices = list(enumerate(similarity_scores))

    # Sort by score descending
    sorted_scores = sorted(scores_with_indices, key=lambda x: x[1], reverse=True)

    recommendations = []
    for idx, score in sorted_scores:
        if score > 0.1: # Only recommend if there is some relevance
            original_internship_idx = idx # The index in the original list
            rec = internships_data[original_internship_idx].copy()
            rec['match_score'] = round(score * 100, 2) # Convert to percentage
            recommendations.append(rec)

    return recommendations

def analyze_skill_gap(user_skills_list, target_role_requirements):
    """
    Identify missing skills for a target role.

    Args:
    - user_skills_list (list): User's current skills.
    - target_role_requirements (list): Required skills for the target role.

    Returns:
    - dict: { 'missing_skills': [], 'match_percentage': float }
    """
    user_skills_set = set([s.lower() for s in user_skills_list])
    target_skills_set = set([s.lower() for s in target_role_requirements])

    missing_skills = list(target_skills_set - user_skills_set)
    match_count = len(target_skills_set) - len(missing_skills)
    match_percentage = (match_count / len(target_skills_set)) * 100 if target_skills_set else 0

    return {
        'missing_skills': [s.title() for s in missing_skills], # Capitalize for display
        'match_percentage': round(match_percentage, 2)
    }
