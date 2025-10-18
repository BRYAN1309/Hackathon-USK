from flask import Flask, jsonify, request
from flask_jwt_extended import JWTManager
from datetime import timedelta
from dotenv import load_dotenv
from config.config import generate_config
from flask_cors import CORS
import os
import joblib
import numpy as np
import xgboost as xgb

# Load environment variables
load_dotenv()

# Controllers
from controller import user_umkm_controller, umkm_controller, investor_controller

# Generate configuration
config = generate_config()

app = Flask(__name__)

# Enable CORS
CORS(app)

# JWT configuration
app.config["JWT_SECRET_KEY"] = config.jwt_secret_key
app.config["JWT_ACCESS_TOKEN_EXPIRES"] = timedelta(seconds=config.jwt_access_token_expires)
jwt = JWTManager(app)

# Path folder model
MODEL_PATH = os.path.join(os.path.dirname(__file__), "model")

# =========================================================
# 🔹 Function to safely load any model (joblib or XGBoost)
# =========================================================
def load_any_model(filename):
    path = os.path.join(MODEL_PATH, filename)
    try:
        # Try to load using joblib (for sklearn, clustering, etc.)
        return joblib.load(path)
    except Exception:
        # If fails, assume it's an XGBoost native model
        booster = xgb.Booster()
        booster.load_model(path)
        return booster

# Load all models safely
fraud_model = load_any_model("fraud_detection_model.pkl")
credit_model = load_any_model("credit_scoring_model.pkl")
cluster_model = load_any_model("clustering_model.pkl")

# =========================================================
# 🔹 Prediction Routes
# =========================================================

@app.route("/predict_fraud", methods=["POST"])
def predict_fraud():
    """Predict potential fraud based on given features."""
    data = request.get_json()
    features = np.array(data.get("features", [])).reshape(1, -1)
    try:
        if isinstance(fraud_model, xgb.Booster):
            dmatrix = xgb.DMatrix(features)
            prediction = fraud_model.predict(dmatrix)
        else:
            prediction = fraud_model.predict(features)
        return jsonify({"fraud_prediction": float(prediction[0])})
    except Exception as e:
        return jsonify({"error": f"Prediction error: {str(e)}"}), 500


@app.route("/predict_credit", methods=["POST"])
def predict_credit():
    """Predict credit score."""
    data = request.get_json()
    features = np.array(data.get("features", [])).reshape(1, -1)
    try:
        if isinstance(credit_model, xgb.Booster):
            dmatrix = xgb.DMatrix(features)
            prediction = credit_model.predict(dmatrix)
        else:
            prediction = credit_model.predict(features)
        return jsonify({"credit_score": float(prediction[0])})
    except Exception as e:
        return jsonify({"error": f"Prediction error: {str(e)}"}), 500


@app.route("/predict_cluster", methods=["POST"])
def predict_cluster():
    """Predict cluster label for a business."""
    data = request.get_json()
    features = np.array(data.get("features", [])).reshape(1, -1)
    try:
        if isinstance(cluster_model, xgb.Booster):
            dmatrix = xgb.DMatrix(features)
            cluster = cluster_model.predict(dmatrix)
        else:
            cluster = cluster_model.predict(features)
        return jsonify({"cluster": int(cluster[0])})
    except Exception as e:
        return jsonify({"error": f"Prediction error: {str(e)}"}), 500

# =========================================================
# 🔹 User & Investor Routes
# =========================================================
@app.route("/login", methods=["POST"])
def login_umkm():
    return user_umkm_controller.login()

@app.route("/register", methods=["POST"])
def register_user():
    return user_umkm_controller.register()

@app.route("/umkm/register", methods=["POST"], endpoint="register_umkm")
def register_umkm():
    return umkm_controller.register_umkm()

@app.route("/umkm", methods=["GET"], endpoint="get_all_umkm")
def get_all_umkm():
    return umkm_controller.get_umkm_user()

@app.route("/umkm/<int:user_id>", methods=["GET"], endpoint="get_umkm_by_user_id")
def get_umkm_by_user_id(user_id):
    return umkm_controller.get_umkm_by_user_id(user_id)

@app.route("/investor/register", methods=["POST"], endpoint="register_investor")
def register_investor():
    return investor_controller.register_investor()

@app.route("/investor/login", methods=["POST"], endpoint="login_investor")
def login_investor():
    return investor_controller.login_investor()

# =========================================================
# 🔹 Health Check Routes
# =========================================================
@app.route("/")
def health_check():
    return {"status": "success", "message": "API is running"}

@app.route("/health")
def health():
    return {"status": "healthy"}

# =========================================================
# 🔹 Run Server
# =========================================================
if __name__ == "__main__":
    port = int(os.environ.get("PORT", 8080))
    app.run(host="0.0.0.0", port=port, debug=True)
