from flask import Flask, jsonify
from flask_jwt_extended import JWTManager
from datetime import timedelta
from dotenv import load_dotenv
from config.config import generate_config
from flask_cors import CORS
import os

# Load environment variables FIRST
load_dotenv()

# Controllers
from controller import user_umkm_controller, umkm_controller, investor_controller

config = generate_config()

app = Flask(__name__)

# ✅ CORS sederhana dan efektif
CORS(app)  # Ini sudah cukup untuk大多数 kasus

# JWT setup
app.config["JWT_SECRET_KEY"] = config.jwt_secret_key
app.config["JWT_ACCESS_TOKEN_EXPIRES"] = timedelta(seconds=config.jwt_access_token_expires)
jwt = JWTManager(app)

# ✅ Routes tanpa OPTIONS method (biarkan Flask-CORS menanganinya)
@app.route("/login", methods=["POST"])
def login_umkm():
    return user_umkm_controller.login()

@app.route("/register", methods=["POST"])
def register_umkm():
    return user_umkm_controller.register()

# Routes lain
app.route("/umkm/register", methods=["POST"])(umkm_controller.register_umkm)
app.route("/umkm", methods=["GET"])(umkm_controller.get_umkm_user)
app.route("/umkm/<int:user_id>", methods=["GET"])(umkm_controller.get_umkm_by_user_id)
app.route("/investor/register", methods=["POST"])(investor_controller.register_investor)
app.route("/investor/login", methods=["POST"])(investor_controller.login_investor)

@app.route("/")
def health_check():
    return {"status": "success", "message": "API is running"}

@app.route("/health")
def health():
    return {"status": "healthy"}

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 8080))
    app.run(host="0.0.0.0", port=port, debug=False)