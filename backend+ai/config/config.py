from pydantic import BaseSettings

class Settings(BaseSettings):
    supabase_url: str
    supabase_key: str
    jwt_secret_key: str
    jwt_access_token_expires: int = 3600

    class Config:
        env_file = ".env"

def generate_config():
    return Settings()
