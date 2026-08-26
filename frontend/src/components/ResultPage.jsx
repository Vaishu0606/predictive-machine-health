import './ResultPage.css'

const PARAM_LABELS = {
  Type: 'Machine Type',
  'Air temperature [K]': 'Air Temperature',
  'Process temperature [K]': 'Process Temperature',
  'Rotational speed [rpm]': 'Rotational Speed',
  'Torque [Nm]': 'Torque',
  'Tool wear [min]': 'Tool Wear',
}

const PARAM_UNITS = {
  Type: '',
  'Air temperature [K]': 'K',
  'Process temperature [K]': 'K',
  'Rotational speed [rpm]': 'rpm',
  'Torque [Nm]': 'Nm',
  'Tool wear [min]': 'min',
}

export default function ResultPage({ result, inputData, onAnalyzeAnother, onBackToHome }) {
  if (!result || !inputData) return null

  const isNormal = result.prediction === 0

  return (
    <div className="result-page">
      <div className={`result-hero ${isNormal ? 'normal' : 'failure'}`}>
        <div className="result-status-icon">
          {isNormal ? (
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 11.08V12a10 10 0 11-5.93-9.14"/>
              <polyline points="22 4 12 14.01 9 11.01"/>
            </svg>
          ) : (
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/>
              <line x1="12" y1="9" x2="12" y2="13"/>
              <line x1="12" y1="17" x2="12.01" y2="17"/>
            </svg>
          )}
        </div>

        <div className={`status-badge ${isNormal ? 'badge-normal' : 'badge-failure'}`}>
          {isNormal ? 'NORMAL' : 'FAILURE RISK'}
        </div>

        <h2 className="result-title">
          Machine Status: {isNormal ? 'Operational' : 'At Risk'}
        </h2>

        <div className="result-cards">
          <div className="result-card">
            <span className="card-label">Failure Prediction</span>
            <span className={`card-value ${isNormal ? 'val-green' : 'val-red'}`}>
              {isNormal ? 'No Machine Failure Detected' : 'Potential Machine Failure Detected'}
            </span>
          </div>
          <div className="result-card">
            <span className="card-label">Risk Level</span>
            <span className={`card-value ${isNormal ? 'val-green' : 'val-red'}`}>
              {result.risk_level === 'Low' ? 'LOW' : 'HIGH'}
            </span>
          </div>
          <div className="result-card recommendation">
            <span className="card-label">Recommended Action</span>
            <span className="card-value">{result.recommendation}</span>
          </div>
        </div>
      </div>

      <div className="params-section">
        <h3 className="params-title">Analyzed Parameters</h3>
        <div className="params-grid">
          {Object.entries(inputData).map(([key, value]) => (
            <div className="param-card" key={key}>
              <span className="param-label">{PARAM_LABELS[key]}</span>
              <span className="param-value">
                {key === 'Type' ? value : value}
                {PARAM_UNITS[key] && <span className="param-unit">{PARAM_UNITS[key]}</span>}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="result-actions">
        <button className="action-btn primary" onClick={onAnalyzeAnother}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="1 4 1 10 7 10"/>
            <path d="M3.51 15a9 9 0 102.13-9.36L1 10"/>
          </svg>
          <span>Analyze Another Machine</span>
        </button>
        <button className="action-btn secondary" onClick={onBackToHome}>
          <span>Back to Home</span>
        </button>
      </div>
    </div>
  )
}
