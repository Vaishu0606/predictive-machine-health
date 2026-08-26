import os
import joblib
import numpy as np
from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

MODEL_DIR = os.path.join(os.path.dirname(__file__), "model")
MODEL_PATH = os.path.join(MODEL_DIR, "adaboost.pkl")
ENCODER_PATH = os.path.join(MODEL_DIR, "encoder.pkl")

REQUIRED_FIELDS = [
    "Type",
    "Air temperature [K]",
    "Process temperature [K]",
    "Rotational speed [rpm]",
    "Torque [Nm]",
    "Tool wear [min]",
]

NUMERIC_FIELDS = [
    "Air temperature [K]",
    "Process temperature [K]",
    "Rotational speed [rpm]",
    "Torque [Nm]",
    "Tool wear [min]",
]

FEATURE_COLS = [
    "Type",
    "Air temperature [K]",
    "Process temperature [K]",
    "Rotational speed [rpm]",
    "Torque [Nm]",
    "Tool wear [min]",
]

print("[INFO] Loading saved AdaBoost model and encoder ...")
model = joblib.load(MODEL_PATH)
encoder = joblib.load(ENCODER_PATH)
print(f"[INFO] Model loaded. Supported Type classes: {list(encoder.classes_)}")


def build_response(prediction, user_input):
    if prediction == 1:
        return {
            "prediction": int(prediction),
            "status": "Failure Risk",
            "risk_level": "High",
            "recommendation": "Schedule a maintenance inspection and investigate abnormal operating conditions.",
            "input_summary": user_input,
        }
    else:
        return {
            "prediction": int(prediction),
            "status": "Normal",
            "risk_level": "Low",
            "recommendation": "Continue normal operation and follow the scheduled maintenance plan.",
            "input_summary": user_input,
        }


@app.route("/predict", methods=["POST"])
def predict():
    data = request.get_json(silent=True)
    if not data:
        return jsonify({"error": "Request body must be valid JSON."}), 400

    missing = [f for f in REQUIRED_FIELDS if f not in data]
    if missing:
        return jsonify({"error": f"Missing required fields: {', '.join(missing)}"}), 400

    machine_type = data["Type"]
    if machine_type not in encoder.classes_.tolist():
        return jsonify({"error": f"Unsupported machine type: '{machine_type}'. Valid types: {encoder.classes_.tolist()}"}), 400

    numeric_values = {}
    for field in NUMERIC_FIELDS:
        try:
            numeric_values[field] = float(data[field])
        except (TypeError, ValueError):
            return jsonify({"error": f"Invalid numeric value for '{field}': {data[field]}"}), 400

    try:
        encoded_type = encoder.transform([machine_type])[0]
    except Exception as e:
        return jsonify({"error": f"Failed to encode machine type: {str(e)}"}), 400

    feature_vector = np.array(
        [
            encoded_type,
            numeric_values["Air temperature [K]"],
            numeric_values["Process temperature [K]"],
            numeric_values["Rotational speed [rpm]"],
            numeric_values["Torque [Nm]"],
            numeric_values["Tool wear [min]"],
        ]
    ).reshape(1, -1)

    try:
        prediction = model.predict(feature_vector)[0]
    except Exception as e:
        return jsonify({"error": f"Prediction failed: {str(e)}"}), 500

    user_input = {
        "Type": machine_type,
        "Air temperature [K]": numeric_values["Air temperature [K]"],
        "Process temperature [K]": numeric_values["Process temperature [K]"],
        "Rotational speed [rpm]": numeric_values["Rotational speed [rpm]"],
        "Torque [Nm]": numeric_values["Torque [Nm]"],
        "Tool wear [min]": numeric_values["Tool wear [min]"],
    }

    result = build_response(prediction, user_input)
    return jsonify(result), 200


@app.route("/health", methods=["GET"])
def health():
    return jsonify({"status": "ok", "model_loaded": model is not None}), 200


if __name__ == "__main__":
    print("[INFO] Starting Flask server on http://127.0.0.1:5000")
    app.run(debug=True, host="0.0.0.0", port=5000)
