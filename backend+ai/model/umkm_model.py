import requests
from supabase import create_client, Client
from config.config import generate_config
import tempfile, os, uuid

config = generate_config()
supabase: Client = create_client(config.supabase_url, config.supabase_key)

class UmkmModel:
    table_name = "umkm"
    user_table = "user_umkm"

    @staticmethod
    def upload_foto(file_storage, filename=None):
        """Upload file ke Supabase Storage bucket 'UMKM' tanpa pakai storage3"""
        bucket_name = "UMKM"

        try:
            if not file_storage:
                print("Tidak ada file yang diterima.")
                return None

            if not filename:
                filename = f"{uuid.uuid4().hex}.png"

            # Simpan file sementara
            tmp_dir = tempfile.gettempdir()
            tmp_path = os.path.join(tmp_dir, filename)
            file_storage.save(tmp_path)
            print(f"File sementara disimpan di: {tmp_path}")

            # Upload manual ke Supabase REST API (tanpa storage3)
            with open(tmp_path, "rb") as f:
                url = f"{config.supabase_url}/storage/v1/object/{bucket_name}/{filename}"
                headers = {
                    "Authorization": f"Bearer {config.supabase_key}",
                    "apikey": config.supabase_key,
                    "Content-Type": "application/octet-stream"
                }
                response = requests.post(url, headers=headers, data=f)

            os.remove(tmp_path)

            # Cek hasil upload
            if response.status_code not in [200, 201]:
                print(f"Gagal upload ke Supabase: {response.text}")
                return None

            # URL publik
            public_url = f"{config.supabase_url}/storage/v1/object/public/{bucket_name}/{filename}"
            print(f"URL publik foto: {public_url}")
            return public_url

        except Exception as e:
            print(f"Error saat upload foto bisnis: {e}")
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

    @staticmethod
    def get_by_user_id(user_id: int):
        user_result = supabase.table(UmkmModel.user_table).select("*").eq("id", user_id).execute()
        if not user_result.data:
            return None

        user_data = user_result.data[0]
        umkm_result = supabase.table(UmkmModel.table_name).select("*").eq("user_umkm_id", user_id).execute()
        if not umkm_result.data:
            return None

        umkm_data = umkm_result.data[0]
        return {
            "user_umkm_id": user_data["id"],
            "user_type": user_data.get("user_type", "UMKM"),
            "kategori_bisnis": umkm_data.get("kategori_bisnis"),
            "lokasi": umkm_data.get("lokasi"),
            "created_at": umkm_data.get("created_at"),
            "jumlah_karyawan": umkm_data.get("jumlah_karyawan"),
            "usia_bisnis": umkm_data.get("usia_bisnis"),
        }
