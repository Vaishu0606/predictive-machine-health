# 🏭 Predictive Machine Failure Detection Using AdaBoost

A machine-learning-based web application that predicts whether an industrial machine is likely to experience a failure based on its operating conditions.

The system uses an **AdaBoost Classifier** trained on the **AI4I 2020 Predictive Maintenance Dataset** and provides a simple web interface for entering machine parameters and receiving a machine health assessment.

---

## 📌 Project Overview

Unexpected machine failures can cause production downtime, equipment damage, maintenance costs, and delays in manufacturing environments.

Traditional maintenance approaches often rely on fixed schedules or maintenance after a failure occurs. Predictive maintenance aims to identify potential failures earlier by analyzing machine operating conditions.

This project develops a predictive maintenance system that uses machine parameters such as temperature, rotational speed, torque, and tool wear to predict whether a machine failure is likely.

The system provides:

* Machine failure prediction
* Machine health status
* Risk level
* Maintenance recommendation
* User-friendly web interface

---

## 🎯 Problem Statement

To develop a machine-learning system that predicts potential industrial machine failures based on operating conditions using the AdaBoost classification algorithm.

The system is designed to provide an early indication of potential failure so that maintenance inspection can be considered before an unexpected breakdown occurs.

---

## ✨ Features

### Machine Learning

* AdaBoost Classification
* Real-world predictive maintenance dataset
* Feature selection
* Categorical feature encoding
* Missing-value handling
* Train/test split
* Model evaluation
* Accuracy
* Precision
* Recall
* F1 Score
* Confusion Matrix
* Saved trained model

### Web Application

* React frontend
* Flask backend
* Machine health assessment form
* Human-readable input fields
* Real-time prediction
* Machine status display
* Risk-level assessment
* Maintenance recommendation
* Responsive interface
* No API keys required

---

## 🧠 How the System Works

```text
              Machine Parameters
                     │
                     ▼
              React Frontend
                     │
                     ▼
                Flask API
                     │
                     ▼
             Data Preprocessing
                     │
                     ▼
              AdaBoost Model
                     │
                     ▼
          Machine Failure Prediction
                     │
              ┌──────┴──────┐
              ▼             ▼
          No Failure     Failure Risk
              │             │
              └──────┬──────┘
                     ▼
            Machine Health Report
                     │
          ┌──────────┼──────────┐
          ▼          ▼          ▼
       Status      Risk      Recommendation
```

---

## 📊 Dataset

This project uses the:

### AI4I 2020 Predictive Maintenance Dataset

The dataset contains approximately **10,000 records** of industrial machine operating conditions.

The original dataset contains the following columns:

```text
UDI
Product ID
Type
Air temperature [K]
Process temperature [K]
Rotational speed [rpm]
Torque [Nm]
Tool wear [min]
Machine failure
TWF
HDF
PWF
OSF
RNF
```

### Dataset Source

The dataset is available through the UCI Machine Learning Repository:

https://archive.ics.uci.edu/dataset/601/ai4i+2020+predictive+maintenance+dataset

The dataset should be downloaded separately and placed in the project root directory as:

```text
ai4i2020.csv
```

---

## 🔍 Features Used by the Model

The model uses the following six operating parameters:

| Feature                   | Description                   |
| ------------------------- | ----------------------------- |
| `Type`                    | Machine type                  |
| `Air temperature [K]`     | Ambient air temperature       |
| `Process temperature [K]` | Operating process temperature |
| `Rotational speed [rpm]`  | Machine rotational speed      |
| `Torque [Nm]`             | Applied machine torque        |
| `Tool wear [min]`         | Tool/component wear           |

### Target Variable

```text
Machine failure
```

The target is binary:

```text
0 → No Machine Failure
1 → Machine Failure
```

---

## ⚠️ Feature Selection and Data Leakage

The following columns are intentionally excluded from model training:

```text
UDI
Product ID
TWF
HDF
PWF
OSF
RNF
```

`UDI` and `Product ID` are identifiers and do not represent useful machine operating conditions.

The columns `TWF`, `HDF`, `PWF`, `OSF`, and `RNF` represent specific failure modes and are directly related to machine failure. Using these columns as input features could introduce **target leakage** and result in an unrealistic model.

Therefore, the model uses only machine operating parameters available for the assessment.

---

## 🤖 Machine Learning Algorithm

### AdaBoost Classifier

The project uses the **AdaBoost (Adaptive Boosting) classification algorithm**.

AdaBoost combines multiple weak learners sequentially. Each subsequent learner focuses more on the training examples that were incorrectly classified by previous learners.

The combined learners form a stronger classification model.

The trained AdaBoost model is used to predict:

```text
No Machine Failure
```

or:

```text
Machine Failure
```

---

## 📈 Model Evaluation

The model is evaluated using:

### Accuracy

Measures the overall percentage of correctly classified observations.

### Precision

Measures how accurately the model identifies positive failure predictions.

### Recall

Measures how many actual machine failure cases are correctly identified.

### F1 Score

Provides a balance between precision and recall.

### Confusion Matrix

Shows the relationship between actual machine failure values and predicted values.

---

## 🖥️ Application Input

The web application allows users to enter machine operating conditions.

Example:

```text
Machine Type: M

Air Temperature: 300 K

Process Temperature: 310 K

Rotational Speed: 1500 rpm

Torque: 45 Nm

Tool Wear: 120 min
```

The user then selects:

```text
ANALYZE MACHINE
```

---

## 📤 Application Output

The trained AdaBoost model generates the machine failure prediction.

### Example: Normal Machine

```text
MACHINE HEALTH REPORT

Status:
NORMAL

Failure Prediction:
No Machine Failure Detected

Risk Level:
LOW

Recommended Action:
Continue normal operation and follow the
scheduled maintenance plan.
```

### Example: Potential Failure

```text
MACHINE HEALTH REPORT

Status:
FAILURE RISK

Failure Prediction:
Potential Machine Failure Detected

Risk Level:
HIGH

Recommended Action:
Schedule a maintenance inspection and
investigate abnormal operating conditions.
```

The exact prediction depends on the trained model and the machine parameters entered by the user.

---

## 🛠️ Technologies Used

### Machine Learning

* Python
* Pandas
* Scikit-learn
* AdaBoost
* Joblib

### Backend

* Flask
* Flask-CORS
* Python

### Frontend

* React
* Vite
* JavaScript
* CSS

### Development

* Git
* GitHub
* VS Code / OpenCode

---

## 📁 Project Structure

```text
predictive_machine_failure/
│
├── backend/
│   ├── app.py
│   ├── train_model.py
│   ├── requirements.txt
│   └── model/
│       ├── adaboost.pkl
│       └── encoder.pkl
│
├── frontend/
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── ...
│
├── ai4i2020.csv
├── .gitignore
└── README.md
```

> The dataset and generated model files may be excluded from the Git repository using `.gitignore`.

---

## ⚙️ Installation

### 1. Clone the repository

```bash
git clone https://github.com/YOUR_USERNAME/Predictive-Machine-Failure-AdaBoost.git
```

```bash
cd Predictive-Machine-Failure-AdaBoost
```

---

### 2. Add the Dataset

Download the AI4I 2020 Predictive Maintenance Dataset from the UCI Machine Learning Repository.

Place:

```text
ai4i2020.csv
```

in the root project directory.

The structure should be:

```text
predictive_machine_failure/
│
├── ai4i2020.csv
├── backend/
└── frontend/
```

---

## 🐍 Backend Setup

Open a terminal:

```bash
cd backend
```

Install the Python dependencies:

```bash
pip install -r requirements.txt
```

### Train the AdaBoost Model

Run:

```bash
python train_model.py
```

This will:

1. Load the dataset.
2. Select the required features.
3. Preprocess the data.
4. Encode the machine type.
5. Split the data into training and testing sets.
6. Train the AdaBoost classifier.
7. Evaluate the model.
8. Save the trained model and encoder.

---

### Start the Flask Backend

After training:

```bash
python app.py
```

The backend will normally run at:

```text
http://127.0.0.1:5000
```

---

## ⚛️ Frontend Setup

Open another terminal:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Start the React development server:

```bash
npm run dev
```

The frontend will normally be available at:

```text
http://localhost:5173
```

---

## 🚀 Running the Complete Application

Two terminals are required.

### Terminal 1 — Backend

```bash
cd backend
python app.py
```

### Terminal 2 — Frontend

```bash
cd frontend
npm run dev
```

Open the frontend URL provided by Vite in your browser.

---

## 🔌 API

The Flask backend provides a prediction endpoint:

```text
POST /predict
```

### Example Request

```json
{
  "Type": "M",
  "Air temperature [K]": 300,
  "Process temperature [K]": 310,
  "Rotational speed [rpm]": 1500,
  "Torque [Nm]": 45,
  "Tool wear [min]": 120
}
```

### Example Response

```json
{
  "prediction": 0,
  "status": "Normal",
  "risk_level": "Low",
  "recommendation": "Continue normal operation and follow the scheduled maintenance plan."
}
```

---

## 🔄 Complete Workflow

```text
AI4I 2020 Dataset
        ↓
Data Preprocessing
        ↓
Feature Selection
        ↓
Categorical Encoding
        ↓
Train/Test Split
        ↓
AdaBoost Classifier
        ↓
Model Evaluation
        ↓
Save Trained Model
        ↓
Flask REST API
        ↓
React Frontend
        ↓
User Enters Machine Parameters
        ↓
AdaBoost Prediction
        ↓
Machine Health Assessment
```

---

## 🎯 Real-World Application

The project demonstrates the concept of **predictive maintenance**.

Instead of waiting for a machine to fail, operating conditions can be analyzed to identify potential failure risks.

Potential benefits include:

* Reduced unexpected downtime
* Earlier maintenance intervention
* Reduced equipment damage
* Improved maintenance planning
* Better monitoring of machine health

---

## ⚠️ Limitations

* The model is trained using a specific historical dataset.
* Real industrial machines may have additional operating parameters.
* The dataset may not represent every type of industrial equipment.
* Model predictions are probabilistic and should not be treated as guaranteed failure events.
* Real-world deployment would require validation using actual industrial machine data.

---

## 🚀 Future Scope

Future improvements could include:

* Real-time sensor integration
* IoT-based machine monitoring
* Continuous machine-health tracking
* Multiple failure-type prediction
* Remaining Useful Life prediction
* Hyperparameter optimization
* Cross-validation
* Comparison with other machine-learning algorithms
* Explainable AI for individual predictions
* Cloud deployment
* Industrial dashboard integration

---

## 👨‍💻 Author

**Vinod**

GitHub:

https://github.com/Vinod-Strawhat

---

## 📄 License

This project was developed for educational and academic purposes.
