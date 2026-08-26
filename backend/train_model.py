import os
import pandas as pd
import numpy as np
import joblib
from sklearn.model_selection import train_test_split
from sklearn.ensemble import AdaBoostClassifier
from sklearn.tree import DecisionTreeClassifier
from sklearn.preprocessing import LabelEncoder
from sklearn.metrics import (
    accuracy_score,
    precision_score,
    recall_score,
    f1_score,
    confusion_matrix,
    classification_report,
)

DATA_PATH = os.path.join(os.path.dirname(__file__), "..", "ai4i2020.csv")
MODEL_DIR = os.path.join(os.path.dirname(__file__), "model")

FEATURE_COLS = [
    "Type",
    "Air temperature [K]",
    "Process temperature [K]",
    "Rotational speed [rpm]",
    "Torque [Nm]",
    "Tool wear [min]",
]

TARGET_COL = "Machine failure"


def main():
    print("=" * 60)
    print("  Predictive Machine Failure Detection - Model Training")
    print("  Algorithm: AdaBoost Classifier")
    print("=" * 60)

    # 1. Load dataset
    print(f"\n[1] Loading dataset from {DATA_PATH} ...")
    df = pd.read_csv(DATA_PATH)
    print(f"    Dataset shape: {df.shape}")
    print(f"    Columns: {list(df.columns)}")

    # 2. Select features and target
    print(f"\n[2] Selected features: {FEATURE_COLS}")
    print(f"    Target: {TARGET_COL}")

    X = df[FEATURE_COLS].copy()
    y = df[TARGET_COL].copy()

    # 3. Handle missing values
    missing_count = X.isnull().sum().sum()
    print(f"\n[3] Missing values in features: {missing_count}")
    if missing_count > 0:
        X = X.dropna()
        y = y.loc[X.index]
        print("    Missing values removed.")

    # 4. Encode the categorical 'Type' column
    print("\n[4] Encoding 'Type' column ...")
    le = LabelEncoder()
    X["Type"] = le.fit_transform(X["Type"])
    print(f"    Type classes: {list(le.classes_)}")
    print(f"    Encoded values: {list(range(len(le.classes_)))}")

    # 5. Target distribution
    print(f"\n[5] Target distribution:")
    dist = y.value_counts()
    for label, count in dist.items():
        label_name = "No Failure" if label == 0 else "Failure"
        print(f"    {label} ({label_name}): {count} ({count/len(y)*100:.1f}%)")

    # 6. Train/test split
    print("\n[6] Splitting data (80/20) with random_state=42 ...")
    X_train, X_test, y_train, y_test = train_test_split(
        X, y, test_size=0.2, random_state=42, stratify=y
    )
    print(f"    Training set: {X_train.shape[0]} samples")
    print(f"    Test set:     {X_test.shape[0]} samples")

    # 7. Train AdaBoost model
    print("\n[7] Training AdaBoost Classifier ...")
    base_estimator = DecisionTreeClassifier(max_depth=1, random_state=42)
    model = AdaBoostClassifier(
        estimator=base_estimator,
        n_estimators=200,
        learning_rate=1.0,
        random_state=42,
    )
    model.fit(X_train, y_train)
    print("    Training complete.")

    # 8. Evaluate model
    print("\n[8] Evaluating model on test set ...")
    y_pred = model.predict(X_test)

    accuracy = accuracy_score(y_test, y_pred)
    precision = precision_score(y_test, y_pred, zero_division=0)
    recall = recall_score(y_test, y_pred, zero_division=0)
    f1 = f1_score(y_test, y_pred, zero_division=0)
    cm = confusion_matrix(y_test, y_pred)

    print(f"\n    Accuracy:  {accuracy:.4f}")
    print(f"    Precision: {precision:.4f}")
    print(f"    Recall:    {recall:.4f}")
    print(f"    F1 Score:  {f1:.4f}")

    print(f"\n    Confusion Matrix:")
    print(f"    {cm}")

    print(f"\n    Classification Report:")
    print(classification_report(y_test, y_pred, target_names=["No Failure", "Failure"]))

    # 9. Feature importance
    print("[9] Feature Importance:")
    importances = model.feature_importances_
    for feat, imp in sorted(zip(FEATURE_COLS, importances), key=lambda x: -x[1]):
        print(f"    {feat}: {imp:.4f}")

    # 10. Save model and encoder
    os.makedirs(MODEL_DIR, exist_ok=True)
    model_path = os.path.join(MODEL_DIR, "adaboost.pkl")
    encoder_path = os.path.join(MODEL_DIR, "encoder.pkl")

    joblib.dump(model, model_path)
    joblib.dump(le, encoder_path)

    print(f"\n[10] Model saved to: {model_path}")
    print(f"     Encoder saved to: {encoder_path}")

    print("\n" + "=" * 60)
    print("  Training complete! Artifacts saved successfully.")
    print("=" * 60)


if __name__ == "__main__":
    main()
