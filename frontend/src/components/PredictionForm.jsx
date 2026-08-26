import { useState } from 'react'
import './PredictionForm.css'

const MACHINE_TYPES = ['L', 'M', 'H']

const TYPE_LABELS = {
  L: 'Low (L) — Low power variant',
  M: 'Medium (M) — Medium power variant',
  H: 'High (H) — High power variant',
}

const FIELDS = [
  { key: 'Air temperature [K]', label: 'Air Temperature', unit: 'K', min: 250, max: 400, step: 0.1, placeholder: 'e.g. 300.1' },
  { key: 'Process temperature [K]', label: 'Process Temperature', unit: 'K', min: 250, max: 450, step: 0.1, placeholder: 'e.g. 310.2' },
  { key: 'Rotational speed [rpm]', label: 'Rotational Speed', unit: 'rpm', min: 500, max: 3000, step: 1, placeholder: 'e.g. 1500' },
  { key: 'Torque [Nm]', label: 'Torque', unit: 'Nm', min: 1, max: 100, step: 0.1, placeholder: 'e.g. 45.0' },
  { key: 'Tool wear [min]', label: 'Tool Wear', unit: 'min', min: 0, max: 300, step: 1, placeholder: 'e.g. 120' },
]

const API_URL = 'http://127.0.0.1:5000/predict'

export default function PredictionForm({ onPrediction }) {
  const [formData, setFormData] = useState({
    Type: '',
    'Air temperature [K]': '',
    'Process temperature [K]': '',
    'Rotational speed [rpm]': '',
    'Torque [Nm]': '',
    'Tool wear [min]': '',
  })
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)
  const [apiError, setApiError] = useState('')

  const handleChange = (key, value) => {
    setFormData((prev) => ({ ...prev, [key]: value }))
    setErrors((prev) => ({ ...prev, [key]: '' }))
    setApiError('')
  }

  const validate = () => {
    const newErrors = {}

    if (!formData.Type) {
      newErrors.Type = 'Please select a machine type'
    }

    for (const field of FIELDS) {
      const val = formData[field.key]
      if (val === '' || val === null || val === undefined) {
        newErrors[field.key] = `${field.label} is required`
      } else {
        const num = parseFloat(val)
        if (isNaN(num)) {
          newErrors[field.key] = 'Must be a valid number'
        } else if (num < field.min || num > field.max) {
          newErrors[field.key] = `Must be between ${field.min} and ${field.max}`
        }
      }
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validate()) return

    setLoading(true)
    setApiError('')

    try {
      const payload = {
        Type: formData.Type,
        'Air temperature [K]': parseFloat(formData['Air temperature [K]']),
        'Process temperature [K]': parseFloat(formData['Process temperature [K]']),
        'Rotational speed [rpm]': parseFloat(formData['Rotational speed [rpm]']),
        'Torque [Nm]': parseFloat(formData['Torque [Nm]']),
        'Tool wear [min]': parseFloat(formData['Tool wear [min]']),
      }

      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Prediction request failed')
      }

      onPrediction(data, payload)
    } catch (err) {
      if (err.message.includes('Failed to fetch') || err.message.includes('NetworkError')) {
        setApiError('Cannot connect to the prediction server. Please ensure the Flask backend is running on port 5000.')
      } else {
        setApiError(err.message || 'An unexpected error occurred')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="prediction-page">
      <div className="form-header">
        <h2>Machine Health Analysis</h2>
        <p>Enter the operating conditions of the machine to assess its failure risk.</p>
      </div>

      <form className="prediction-form" onSubmit={handleSubmit}>
        <div className="form-section">
          <div className="section-label">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2L2 7l10 5 10-5-10-5z"/>
              <path d="M2 17l10 5 10-5"/>
              <path d="M2 12l10 5 10-5"/>
            </svg>
            <span>Machine Information</span>
          </div>

          <div className="type-selector">
            <label className="field-label">Machine Type</label>
            <div className="type-options">
              {MACHINE_TYPES.map((t) => (
                <button
                  type="button"
                  key={t}
                  className={`type-btn ${formData.Type === t ? 'selected' : ''}`}
                  onClick={() => handleChange('Type', t)}
                >
                  <span className="type-code">{t}</span>
                  <span className="type-desc">{TYPE_LABELS[t]}</span>
                </button>
              ))}
            </div>
            {errors.Type && <span className="field-error">{errors.Type}</span>}
          </div>
        </div>

        <div className="form-section">
          <div className="section-label">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="3"/>
              <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 01-2.83 2.83l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z"/>
            </svg>
            <span>Operating Conditions</span>
          </div>

          <div className="fields-grid">
            {FIELDS.map((field) => (
              <div className="field-group" key={field.key}>
                <label className="field-label">
                  {field.label}
                  <span className="field-unit">{field.unit}</span>
                </label>
                <input
                  type="number"
                  className={`field-input ${errors[field.key] ? 'has-error' : ''}`}
                  value={formData[field.key]}
                  onChange={(e) => handleChange(field.key, e.target.value)}
                  placeholder={field.placeholder}
                  min={field.min}
                  max={field.max}
                  step={field.step}
                />
                {errors[field.key] && <span className="field-error">{errors[field.key]}</span>}
              </div>
            ))}
          </div>
        </div>

        {apiError && (
          <div className="api-error">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"/>
              <line x1="15" y1="9" x2="9" y2="15"/>
              <line x1="9" y1="9" x2="15" y2="15"/>
            </svg>
            <span>{apiError}</span>
          </div>
        )}

        <button type="submit" className="submit-btn" disabled={loading}>
          {loading ? (
            <>
              <span className="spinner"></span>
              <span>Analyzing machine condition...</span>
            </>
          ) : (
            <>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 2L11 13"/>
                <path d="M22 2L15 22L11 13L2 9L22 2Z"/>
              </svg>
              <span>Analyze Machine</span>
            </>
          )}
        </button>
      </form>

      {loading && (
        <div className="loading-overlay">
          <div className="loading-content">
            <div className="loading-spinner">
              <div className="spinner-ring"></div>
              <div className="spinner-ring delay-1"></div>
              <div className="spinner-ring delay-2"></div>
            </div>
            <p className="loading-text">Analyzing machine condition...</p>
            <p className="loading-subtext">AdaBoost classifier is evaluating parameters</p>
          </div>
        </div>
      )}
    </div>
  )
}
