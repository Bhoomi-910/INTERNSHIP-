from app import app, db
import logging
with app.app_context():
    logging.info("Creating all database tables...")
    db.create_all()
    print("Database tables initialized successfully.")
