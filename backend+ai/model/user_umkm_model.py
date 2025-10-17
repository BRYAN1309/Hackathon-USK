from supabase import create_client, Client
from config.config import generate_config
import tempfile
import os

config = generate_config()
supabase: Client = create_client(config.supabase_url, config.supabase_key)

class UserModel:
    table_name = "user_umkm"

    @staticmethod
    def upload_ktp(file_storage, filename):
        """Upload file ke Supabase Storage bucket 'KTP'"""
        bucket_name = "KTP"

        try:
            # Simpan file sementara
            tmp_dir = tempfile.gettempdir()
            tmp_path = os.path.join(tmp_dir, filename)
            file_storage.save(tmp_path)

            # Upload file
            with open(tmp_path, "rb") as f:
                res = supabase.storage().from_(bucket_name).upload(filename, f)

            # Hapus file lokal
            os.remove(tmp_path)

            # Konversi response ke JSON
            res_json = res.json()

            # Cek error dari Supabase
            if "error" in res_json and res_json["error"]:
                raise Exception(res_json["error"]["message"])

            # Dapatkan URL publik
            public_url = supabase.storage().from_(bucket_name).get_public_url(filename)
            return public_url

        except Exception as e:
            print(f"❌ Error saat upload KTP: {e}")
            return None

    @staticmethod
    def find_by_email(email: str):
        return supabase.table(UserModel.table_name).select("*").eq("email", email).execute()

    @staticmethod
    def create_user(user_data):
        return supabase.table(UserModel.table_name).insert(user_data).execute()
