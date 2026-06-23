from sqlalchemy import inspect, text
from app.core.database import engine

def run_db_migrations():
    inspector = inspect(engine)
    if not inspector.has_table("users"):
        print("Table 'users' does not exist yet. It will be created by Base.metadata.create_all.")
        return
    
    columns = [col['name'] for col in inspector.get_columns('users')]
    
    with engine.begin() as conn:
        if 'google_id' not in columns:
            try:
                conn.execute(text("ALTER TABLE users ADD COLUMN google_id VARCHAR;"))
                print("Migration: Added google_id column to users table.")
            except Exception as e:
                print(f"Migration error for google_id: {e}")
        if 'microsoft_id' not in columns:
            try:
                conn.execute(text("ALTER TABLE users ADD COLUMN microsoft_id VARCHAR UNIQUE;"))
                print("Migration: Added microsoft_id column to users table.")
            except Exception as e:
                print(f"Migration error for microsoft_id: {e}")
        if 'yahoo_id' not in columns:
            try:
                conn.execute(text("ALTER TABLE users ADD COLUMN yahoo_id VARCHAR UNIQUE;"))
                print("Migration: Added yahoo_id column to users table.")
            except Exception as e:
                print(f"Migration error for yahoo_id: {e}")
        if 'reset_password_token' not in columns:
            try:
                conn.execute(text("ALTER TABLE users ADD COLUMN reset_password_token VARCHAR;"))
                print("Migration: Added reset_password_token column to users table.")
            except Exception as e:
                print(f"Migration error for reset_password_token: {e}")
        if 'reset_password_expires' not in columns:
            try:
                conn.execute(text("ALTER TABLE users ADD COLUMN reset_password_expires TIMESTAMP WITH TIME ZONE;"))
                print("Migration: Added reset_password_expires column to users table.")
            except Exception as e:
                print(f"Migration error for reset_password_expires: {e}")
