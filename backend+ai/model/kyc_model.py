from supabase import create_client, Client
from config.config import generate_config

# Inisialisasi Supabase client
config = generate_config()
supabase: Client = create_client(config.supabase_url, config.supabase_key)

class KYCModel:
    @staticmethod
    def get_by_user_id(user_id: int):
        """
        Ambil data KYC berdasarkan user_id
        """
        try:
            response = supabase.table("KYC").select("*").eq("user_id", user_id).execute()
            return response.data
        except Exception as e:
            print("Error saat mengambil data KYC:", e)
            return None
