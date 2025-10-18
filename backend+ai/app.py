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
import pickle
from view.response_view import error_response,success_response
# Load environment variables
load_dotenv()

# Controllers
from controller import user_umkm_controller, umkm_controller, investor_controller,transaksi_controller, data_bulanan_controller,kyc_controller

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
# 🔹 Improved Model Loading Function
# =========================================================
def load_any_model(filename):
    path = os.path.join(MODEL_PATH, filename)
    
    # Check if file exists
    if not os.path.exists(path):
        raise FileNotFoundError(f"Model file not found: {path}")
    
    # Try different loading methods
    try:
        # First try joblib
        obj = joblib.load(path)
        print(f"[SUCCESS] Loaded {filename} with joblib (type: {type(obj).__name__})")
        
        # Handle dictionary-wrapped models
        if isinstance(obj, dict) and "model" in obj:
            return obj["model"]
        return obj
        
    except Exception as e:
        print(f"[INFO] joblib failed for {filename}: {e}")
        
        # Try XGBoost booster
        try:
            if filename.endswith('.pkl') or filename.endswith('.json') or filename.endswith('.ubj'):
                booster = xgb.Booster()
                booster.load_model(path)
                print(f"[SUCCESS] Loaded {filename} as XGBoost booster")
                return booster
        except Exception as xgb_error:
            print(f"[INFO] XGBoost failed for {filename}: {xgb_error}")
            
            # Final fallback - regular pickle
            try:
                with open(path, 'rb') as f:
                    obj = pickle.load(f)
                print(f"[SUCCESS] Loaded {filename} with pickle (type: {type(obj).__name__})")
                
                if isinstance(obj, dict) and "model" in obj:
                    return obj["model"]
                return obj
                
            except Exception as pickle_error:
                raise ValueError(f"Failed to load model {filename} with all methods: {pickle_error}")

# =========================================================
# 🔹 Load Models with Error Handling
# =========================================================
try:
    fraud_model = load_any_model("fraud_detection_model.pkl")
    credit_model = load_any_model("credit_model.pkl") 
    cluster_model = load_any_model("cluster_model.pkl")
    
    # Print types for debugging
    print("=" * 50)
    print("MODEL LOADING SUMMARY:")
    print(f"Fraud model type: {type(fraud_model)}")
    print(f"Credit model type: {type(credit_model)}")
    print(f"Cluster model type: {type(cluster_model)}")
    print("=" * 50)
    
except Exception as e:
    print(f"[CRITICAL] Failed to load models: {e}")
    # Set models to None to avoid crashes
    fraud_model = None
    credit_model = None
    cluster_model = None

# =========================================================
# 🔹 Improved Prediction Routes with Model Checks
# =========================================================
@app.route("/predict_fraud", methods=["POST"])
def predict_fraud():
    """Predict potential fraud based on given features."""
    if fraud_model is None:
        return jsonify({"error": "Fraud model not loaded"}), 503
        
    data = request.get_json()
    if not data or "features" not in data:
        return jsonify({"error": "Missing 'features' in request"}), 400
        
    try:
        features = np.array(data.get("features", [])).reshape(1, -1)
        
        if isinstance(fraud_model, xgb.Booster):
            dmatrix = xgb.DMatrix(features)
            prediction = fraud_model.predict(dmatrix)
        else:
            prediction = fraud_model.predict(features)
            
        return jsonify({
            "fraud_prediction": float(prediction[0]),
            "model_type": type(fraud_model).__name__
        })
    except Exception as e:
        return jsonify({"error": f"Prediction error: {str(e)}"}), 500

@app.route("/predict_credit", methods=["POST"])
def predict_credit():
    """Predict credit score."""
    if credit_model is None:
        return jsonify({"error": "Credit model not loaded"}), 503
        
    data = request.get_json()
    if not data or "features" not in data:
        return jsonify({"error": "Missing 'features' in request"}), 400
        
    try:
        features = np.array(data.get("features", [])).reshape(1, -1)
        
        if isinstance(credit_model, xgb.Booster):
            dmatrix = xgb.DMatrix(features)
            prediction = credit_model.predict(dmatrix)
        else:
            prediction = credit_model.predict(features)
            
        return jsonify({
            "credit_score": float(prediction[0]),
            "model_type": type(credit_model).__name__
        })
    except Exception as e:
        return jsonify({"error": f"Prediction error: {str(e)}"}), 500

@app.route("/predict_cluster", methods=["POST"])
def predict_cluster():
    """Predict cluster label for a business."""
    if cluster_model is None:
        return jsonify({"error": "Cluster model not loaded"}), 503
        
    data = request.get_json()
    if not data or "features" not in data:
        return jsonify({"error": "Missing 'features' in request"}), 400
        
    try:
        features = np.array(data.get("features", [])).reshape(1, -1)
        
        if isinstance(cluster_model, xgb.Booster):
            dmatrix = xgb.DMatrix(features)
            cluster = cluster_model.predict(dmatrix)
        else:
            cluster = cluster_model.predict(features)
            
        return jsonify({
            "cluster": int(cluster[0]),
            "model_type": type(cluster_model).__name__
        })
    except Exception as e:
        return jsonify({"error": f"Prediction error: {str(e)}"}), 500

# =========================================================
# 🔹 Model Status Endpoint
# =========================================================
@app.route("/model_status", methods=["GET"])
def model_status():
    """Check status of all loaded models."""
    status = {
        "fraud_model": {
            "loaded": fraud_model is not None,
            "type": type(fraud_model).__name__ if fraud_model else "None"
        },
        "credit_model": {
            "loaded": credit_model is not None, 
            "type": type(credit_model).__name__ if credit_model else "None"
        },
        "cluster_model": {
            "loaded": cluster_model is not None,
            "type": type(cluster_model).__name__ if cluster_model else "None"
        }
    }
    return jsonify(status)

# =========================================================
# 🔹 User & Investor Routes (unchanged)
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

@app.route("/transaksi/<int:nomor_rekening>", methods=["GET"], endpoint="transaction_api")
def get_transaksi_by_user_id(nomor_rekening):
    data, message = transaksi_controller.TransaksiController.get_transaksi_by_nomor_rekening(nomor_rekening)
    if data is None:
        return error_response(message)
    return success_response(message, data)

@app.route("/data-bulanan/<int:nomor_rekening>", methods=["GET"], endpoint="data_bulanan_by_rekening_api")
def get_data_bulanan_by_nomor_rekening(nomor_rekening):
    data, message = data_bulanan_controller.DataBulananController.get_data_bulanan_by_nomor_rekening(nomor_rekening)
    if data is None:
        return error_response(message)
    return success_response(message, data)


@app.route("/kyc/<int:nik>", methods=["GET"], endpoint="kyc_by_nik_api")
def get_kyc_by_nik(nik):
    data, message = kyc_controller.KYCController.get_kyc_by_nik(nik)
    if data is None:
        return error_response(message)
    return success_response(message, data)

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