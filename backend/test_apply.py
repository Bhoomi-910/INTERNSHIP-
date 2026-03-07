import requests
import json

base_url = 'http://localhost:5001'

# 1. Login to get token
try:
    print("Logging in...")
    login_res = requests.post(f"{base_url}/login", json={"email": "student@example.com", "password": "password"})
    if login_res.status_code != 200:
        # maybe register
        print("Registering...")
        requests.post(f"{base_url}/register", json={"name": "Test", "email": "student@example.com", "password": "password", "role": "student"})
        login_res = requests.post(f"{base_url}/login", json={"email": "student@example.com", "password": "password"})

    token = login_res.json()['access_token']

    print("Getting internships...")
    headers = {"Authorization": f"Bearer {token}"}
    ints_res = requests.get(f"{base_url}/internships")
    internships = ints_res.json()
    if not internships:
        print("No internships to apply to!")

    else:
        internship_id = internships[0]['id']
        print(f"Applying to internship {internship_id}...")
        apply_res = requests.post(f"{base_url}/apply", json={"internship_id": internship_id}, headers=headers)
        print(f"Apply Status: {apply_res.status_code}")
        print(f"Apply Response: {apply_res.text}")
except Exception as e:
    print(f"Error: {e}")
