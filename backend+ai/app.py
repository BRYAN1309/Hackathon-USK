from flask import Flask, jsonify
from flask_jwt_extended import JWTManager
from datetime import timedelta
from dotenv import load_dotenv
from config.config import generate_config
from flask_cors import CORS
import os

# Controllers
from controller import user_umkm_controller, umkm_controller, investor_controller

load_dotenv()
config = generate_config()

app = Flask(__name__)

# ✅ FIX: CORS untuk semua origins + method OPTIONS
CORS(
    app,
    resources={r"/*": {"origins": ["http://localhost:5173", "http://localhost:8080", "https://yourfrontend.vercel.app"]}},
    supports_credentials=True,
    allow_headers=["Content-Type", "Authorization"],
    methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"]
)

# JWT setup
app.config["JWT_SECRET_KEY"] = config.jwt_secret_key
app.config["JWT_ACCESS_TOKEN_EXPIRES"] = timedelta(seconds=config.jwt_access_token_expires)
jwt = JWTManager(app)

# ✅ Tambahkan route langsung agar cocok dengan frontend
@app.route("/login", methods=["POST", "OPTIONS"])
def login_umkm():
    # Jika OPTIONS → langsung balas OK supaya preflight tidak gagal
    if os.environ.get("FLASK_ENV") == "development":
        print("⚙️ Preflight /login")
    if Flask.request.method == "OPTIONS":
        return jsonify({"status": "ok"}), 200
    return user_umkm_controller.login()

@app.route("/register", methods=["POST", "OPTIONS"])
def register_umkm():
    if Flask.request.method == "OPTIONS":
        return jsonify({"status": "ok"}), 200
    return user_umkm_controller.register()

# Routes lain
app.route("/umkm/register", methods=["POST", "OPTIONS"])(umkm_controller.register_umkm)
app.route("/umkm", methods=["GET", "OPTIONS"])(umkm_controller.get_umkm_user)
app.route("/umkm/<int:user_id>", methods=["GET", "OPTIONS"])(umkm_controller.get_umkm_by_user_id)
app.route("/investor/register", methods=["POST", "OPTIONS"])(investor_controller.register_investor)
app.route("/investor/login", methods=["POST", "OPTIONS"])(investor_controller.login_investor)

@app.route("/")
def health_check():
    return {"status": "success", "message": "API is running"}

@app.route("/health")
def health():
    return {"status": "healthy"}

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 8080))
    app.run(host="0.0.0.0", port=port, debug=True)
