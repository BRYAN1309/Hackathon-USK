from supabase import create_client, Client
from config.config import generate_config

# Ambil konfigurasi Supabase
config = generate_config()
supabase: Client = create_client(config.supabase_url, config.supabase_key)

class DataBulananModel:
    @staticmethod
    def get_by_nomor_rekening(nomor_rekening: int):
        """
        Ambil semua data bulanan berdasarkan nomor_rekening
        """
        try:
            response = (
                supabase
                .table("data_bulanan")
                .select("*")
                .eq("nomor_rekening", nomor_rekening)
                .execute()
            )
            return response.data
        except Exception as e:
            print("Error saat mengambil data bulanan:", e)
            return None
