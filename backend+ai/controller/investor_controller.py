from flask import request
from werkzeug.security import generate_password_hash, check_password_hash
from flask_jwt_extended import create_access_token
from model.investor_model import InvestorModel
from view.response_view import success_response, error_response


def register_investor():
    """Registrasi akun investor baru"""
    data = request.get_json()

    nama = data.get("nama")
    email = data.get("email")
    password = data.get("password")
    phone_number = data.get("phone_number")
    region = data.get("region")
    nik = data.get("nik")
    asal_dana = data.get("asal_dana")
    estimasi_pendapatan_tahunan = data.get("estimasi_pendapatan_tahunan")
    tingkat_risiko_investasi = data.get("tingkat_risiko_investasi", "sedang")

    # Validasi wajib
    if not all([nama, email, password, phone_number, region, nik]):
        return error_response("Field wajib belum lengkap")

    # Cek email atau nik duplikat
    if InvestorModel.find_by_email(email).data:
        return error_response("Email sudah terdaftar")

    if InvestorModel.find_by_nik(nik).data:
        return error_response("NIK sudah terdaftar")

    # Simpan password terenkripsi
    hashed_pw = generate_password_hash(password)

    investor_data = {
        "nama": nama,
        "email": email,
        "phone_number": int(phone_number),
        "region": region,
        "nik": int(nik),
        "asal_dana": asal_dana,
        "estimasi_pendapatan_tahunan": int(estimasi_pendapatan_tahunan) if estimasi_pendapatan_tahunan else None,
        "tingkat_risiko_investasi": tingkat_risiko_investasi,
        # Simpan password terenkripsi di kolom tambahan
        "password": hashed_pw
    }

    # Insert ke Supabase
    result = InvestorModel.create_investor(investor_data)

    return success_response("Investor berhasil didaftarkan", result.data)


def login_investor():
    """Login untuk investor"""
    data = request.get_json()
    email = data.get("email")
    password = data.get("password")

    if not email or not password:
        return error_response("Email dan password wajib diisi")

    result = InvestorModel.find_by_email(email)

    if not result.data:
        return error_response("Email tidak ditemukan")

    investor = result.data[0]

    if "password" not in investor or not check_password_hash(investor["password"], password):
        return error_response("Password salah")

    # Buat token JWT berdasarkan ID investor
    token = create_access_token(identity=investor["id"])

    return success_response(
        "Login berhasil",
        {"token": token, "investor": investor}
    )
