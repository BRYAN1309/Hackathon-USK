from flask import request
from werkzeug.security import generate_password_hash, check_password_hash
from flask_jwt_extended import create_access_token
from model.user_umkm_model import UserModel
from view.response_view import success_response, error_response

def register():
    data = request.form
    file = request.files.get("foto_ktp")

    nama = data.get("nama")
    email = data.get("email")
    password = data.get("password")
    nik = data.get("nik")
    phone_number = data.get("phone_number")

    if not all([nama, email, password, nik, phone_number, file]):
        return error_response("Semua field termasuk foto KTP wajib diisi")

    # Cek email duplikat
    existing = UserModel.find_by_email(email)
    if existing.data:
        return error_response("Email sudah terdaftar")

    # Upload foto KTP ke Supabase Storage
    foto_ktp_url = UserModel.upload_ktp(file, f"{email}_ktp.png")

    hashed_password = generate_password_hash(password)
    user_data = {
        "nama": nama,
        "email": email,
        "password": hashed_password,
        "nik": int(nik),
        "phone_number": int(phone_number),
        "foto_ktp": foto_ktp_url
    }

    # Simpan ke database
    result = UserModel.create_user(user_data)

    return success_response(
        "Registrasi berhasil",
        {"user": result.data[0]}
    )


def login():
    data = request.get_json()
    email = data.get("email")
    password = data.get("password")

    if not email or not password:
        return error_response("Email dan password wajib diisi")

    user = UserModel.find_by_email(email)
    if not user.data:
        return error_response("Email tidak ditemukan")

    user_data = user.data[0]
    if not check_password_hash(user_data["password"], password):
        return error_response("Password salah")

    # Gunakan ID user yang sebenarnya
    access_token = create_access_token(identity=user_data["id"])

    return success_response(
        "Login berhasil",
        {
            "token": access_token,
            "user": user_data
        }
    )
