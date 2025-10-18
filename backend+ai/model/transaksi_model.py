from supabase import create_client, Client
from config.config import generate_config

# Ambil konfigurasi Supabase dari config.py
config = generate_config()
supabase: Client = create_client(config.supabase_url, config.supabase_key)

class TransaksiModel:
    @staticmethod
    def get_by_user_id(user_id: int):
        """
        Ambil semua data transaksi berdasarkan user_id
        """
        try:
            response = supabase.table("Data Transaksi").select("*").eq("user_id", user_id).execute()
            return response.data
        except Exception as e:
            print("Error saat mengambil data:", e)
            return None
