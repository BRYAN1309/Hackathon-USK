from flask import Flask
from flask_jwt_extended import JWTManager
from datetime import timedelta
from dotenv import load_dotenv
from config.config import generate_config
from flask_cors import CORS

# Controllers
from controller import user_umkm_controller, umkm_controller, investor_controller

load_dotenv()
config = generate_config()

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}}, supports_credentials=True)

# JWT setup
app.config["JWT_SECRET_KEY"] = config.jwt_secret_key
app.config["JWT_ACCESS_TOKEN_EXPIRES"] = timedelta(seconds=config.jwt_access_token_expires)
jwt = JWTManager(app)

# User UMKM APIRoutes
app.route("/user_umkm/register", methods=["POST"])(user_umkm_controller.register)
app.route("/user_umkm/login", methods=["POST"])(user_umkm_controller.login)

#UMKM APIRoutes
app.route("/umkm/register", methods=["POST"])(umkm_controller.register_umkm)
app.route("/umkm", methods=["GET"])(umkm_controller.get_umkm_user)

#Investor APIRoutes
app.route("/investor/register", methods=["POST"])(investor_controller.register_investor)
app.route("/investor/login", methods=["POST"])(investor_controller.login_investor)

if __name__ == "__main__":
    app.run(debug=True)
