from flask import request
from flask_jwt_extended import jwt_required, get_jwt_identity
from model.umkm_model import UmkmModel
from model.user_umkm_model import UserModel
from view.response_view import success_response, error_response
import uuid

@jwt_required()
def register_umkm():
    user_id = get_jwt_identity()  # ini akan jadi integer setelah login diperbaiki
    data = request.form
    file = request.files.get("foto_bisnis")

    nama_bisnis = data.get("nama_bisnis")
    kategori_bisnis = data.get("kategori_bisnis", "fnb")
    usia_bisnis = data.get("usia_bisnis")
    lokasi = data.get("lokasi")
    alamat_bisnis = data.get("alamat_bisnis")
    jumlah_karyawan = data.get("jumlah_karyawan")
    nomor_rekening = data.get("nomor_rekening")
    nmid = data.get("nmid")
    surat_izin_usaha = data.get("surat_izin_usaha")

    if not all([nama_bisnis, lokasi]):
        return error_response("Field nama_bisnis dan lokasi wajib diisi")

    foto_url = None
    if file:
        unique_filename = f"{user_id}_bisnis_{uuid.uuid4().hex}.png"
        foto_url = UmkmModel.upload_foto(file, unique_filename)

    umkm_data = {
        "nama_bisnis": nama_bisnis,
        "user_umkm_id": user_id,
        "foto_bisnis": foto_url,
        "kategori_bisnis": kategori_bisnis,
        "usia_bisnis": int(usia_bisnis) if usia_bisnis else None,
        "lokasi": lokasi,
        "alamat_bisnis": alamat_bisnis,
        "jumlah_karyawan": int(jumlah_karyawan) if jumlah_karyawan else None,
        "nomor_rekening": int(nomor_rekening) if nomor_rekening else None,
        "nmid": int(nmid) if nmid else None,
        "surat_izin_usaha": int(surat_izin_usaha) if surat_izin_usaha else None
    }

    result = UmkmModel.create_umkm(umkm_data)
    return success_response("UMKM berhasil didaftarkan", result.data)

@jwt_required()
def get_umkm_user():
    user_id = get_jwt_identity()
    result = UmkmModel.get_umkm_by_user(user_id)
    return success_response("Data UMKM user", result.data)

def get_umkm_by_user_id(user_id):
    """
    Mengambil data UMKM berdasarkan user_id (gabungan user dan bisnis)
    """
    try:
        result = UmkmModel.get_by_user_id(user_id)
        if not result:
            return error_response("Data tidak ditemukan untuk user_id tersebut")

        return success_response("Data UMKM berhasil diambil", result)
    except Exception as e:
        return error_response(f"Terjadi kesalahan: {str(e)}")