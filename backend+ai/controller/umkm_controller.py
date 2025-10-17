from flask import request
from flask_jwt_extended import jwt_required, get_jwt_identity
from model.umkm_model import UmkmModel
from model.user_umkm_model import UserModel
from view.response_view import success_response, error_response

@jwt_required()
def create_umkm():
    """POST /umkm — Tambah data UMKM"""
    user_email = get_jwt_identity()
    user = UserModel.find_by_email(user_email)

    if not user.data:
        return error_response("User tidak ditemukan")

    user_id = user.data[0]["id"]

    data = request.form
    file = request.files.get("foto_bisnis")

    nama_bisnis = data.get("nama_bisnis")
    kategori_bisnis = data.get("kategori_bisnis")
    usia_bisnis = data.get("usia_bisnis")
    lokasi = data.get("lokasi")
    alamat_bisnis = data.get("alamat_bisnis")
    jumlah_karyawan = data.get("jumlah_karyawan")
    nomor_rekening = data.get("nomor_rekening")
    nmid = data.get("nmid")
    surat_izin_usaha = data.get("surat_izin_usaha")

    if not all([nama_bisnis, kategori_bisnis, lokasi]):
        return error_response("Field wajib: nama_bisnis, kategori_bisnis, lokasi")

    foto_bisnis_url = None
    if file:
        foto_bisnis_url = UmkmModel.upload_foto(file, f"{user_id}_{nama_bisnis}_foto.png")

    umkm_data = {
        "nama_bisnis": nama_bisnis,
        "user_umkm_id": user_id,
        "foto_bisnis": foto_bisnis_url,
        "kategori_bisnis": kategori_bisnis,
        "usia_bisnis": int(usia_bisnis) if usia_bisnis else None,
        "lokasi": lokasi,
        "alamat_bisnis": alamat_bisnis,
        "jumlah_karyawan": int(jumlah_karyawan) if jumlah_karyawan else None,
        "nomor_rekening": int(nomor_rekening) if nomor_rekening else None,
        "nmid": int(nmid) if nmid else None,
        "surat_izin_usaha": int(surat_izin_usaha) if surat_izin_usaha else None,
    }

    result = UmkmModel.create_umkm(umkm_data)
    return success_response("Data UMKM berhasil ditambahkan", result.data[0])


@jwt_required()
def get_umkm_user():
    """GET /umkm — Ambil semua data UMKM milik user"""
    user_email = get_jwt_identity()
    user = UserModel.find_by_email(user_email)

    if not user.data:
        return error_response("User tidak ditemukan")

    user_id = user.data[0]["id"]
    result = UmkmModel.get_umkm_by_user(user_id)

    return success_response("Data UMKM user", result.data)
