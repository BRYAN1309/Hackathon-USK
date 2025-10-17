from supabase import create_client, Client
from config.config import generate_config
import tempfile, os, uuid

config = generate_config()
supabase: Client = create_client(config.supabase_url, config.supabase_key)

class UmkmModel:
    table_name = "umkm"

    @staticmethod
    def upload_foto(file_storage, filename=None):
        """Upload foto bisnis ke Supabase Storage bucket 'UMKM'"""
        bucket_name = "UMKM"

        try:
            if not filename:
                filename = f"{uuid.uuid4().hex}.png"

            # Simpan sementara di temp directory
            tmp_dir = tempfile.gettempdir()
            tmp_path = os.path.join(tmp_dir, filename)
            file_storage.save(tmp_path)

            # ✅ Cara yang benar di supabase-py 0.7.1
            storage_client = supabase.storage()  # ← pakai tanda kurung!
            bucket = storage_client.from_(bucket_name)

            with open(tmp_path, "rb") as f:
                bucket.upload(filename, f)

            os.remove(tmp_path)

            # Dapatkan URL publik
            public_url = bucket.get_public_url(filename)
            return public_url

        except Exception as e:
            print(f"❌ Error saat upload foto bisnis: {e}")
            return None

    @staticmethod
    def create_umkm(data):
        return supabase.table(UmkmModel.table_name).insert(data).execute()

    @staticmethod
    def get_umkm_by_user(user_id):
        return supabase.table(UmkmModel.table_name).select("*").eq("user_umkm_id", user_id).execute()

    @staticmethod
    def get_all_umkm():
        return supabase.table(UmkmModel.table_name).select("*").execute()
