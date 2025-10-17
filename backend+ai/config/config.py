import os

class Settings:
    def __init__(self):
        self.supabase_url = os.getenv("SUPABASE_URL")
        self.supabase_key = os.getenv("SUPABASE_KEY")
        self.jwt_secret_key = os.getenv("JWT_SECRET_KEY")
        self.jwt_access_token_expires = int(os.getenv("JWT_ACCESS_TOKEN_EXPIRES", "3600"))

def generate_config():
    return Settings()