import './HomePage.css'

const steps = [
  {
    num: '01',
    title: 'Enter Operating Conditions',
    desc: 'Input machine parameters such as temperature, speed, torque, and tool wear.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="2"/>
        <path d="M9 9h6M9 13h6M9 17h4"/>
      </svg>
    ),
  },
  {
    num: '02',
    title: 'AdaBoost Analysis',
    desc: 'The trained AdaBoost classifier evaluates the operating parameters against learned failure patterns.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="3"/>
        <path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83"/>
      </svg>
    ),
  },
  {
    num: '03',
    title: 'Failure Risk Prediction',
    desc: 'Receive a binary prediction indicating whether the machine is at risk of failure.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/>
        <line x1="12" y1="9" x2="12" y2="13"/>
        <line x1="12" y1="17" x2="12.01" y2="17"/>
      </svg>
    ),
  },
  {
    num: '04',
    title: 'Maintenance Recommendation',
    desc: 'Get actionable maintenance guidance based on the risk assessment.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z"/>
      </svg>
    ),
  },
]

const features = [
  { label: 'AdaBoost Classifier', detail: 'Ensemble learning algorithm for robust predictions' },
  { label: '6 Input Features', detail: 'Temperature, speed, torque, tool wear, type' },
  { label: 'Real-time Analysis', detail: 'Instant predictions via REST API' },
  { label: '97%+ Accuracy', detail: 'Trained on 10,000 industrial records' },
]

export default function HomePage({ onAnalyze }) {
  return (
    <div className="home">
      <section className="hero">
        <div className="hero-badge">AI-Powered Predictive Maintenance</div>
        <h1 className="hero-title">
          Predictive <span className="gradient-text">Machine Health</span>
        </h1>
        <p className="hero-subtitle">
          AI-powered machine failure detection using AdaBoost
        </p>
        <p className="hero-desc">
          Analyze machine operating conditions and identify potential failure risks
          before unexpected downtime occurs. Powered by the AdaBoost ensemble
          learning algorithm trained on industrial predictive maintenance data.
        </p>
        <button className="cta-btn" onClick={onAnalyze}>
          <span>Analyze Machine</span>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h14M12 5l7 7-7 7"/>
          </svg>
        </button>
      </section>

      <section className="features-bar">
        {features.map((f, i) => (
          <div className="feature-item" key={i}>
            <strong>{f.label}</strong>
            <span>{f.detail}</span>
          </div>
        ))}
      </section>

      <section className="how-it-works">
        <h2 className="section-title">How It Works</h2>
        <p className="section-subtitle">Four simple steps to assess machine health</p>
        <div className="steps-grid">
          {steps.map((step) => (
            <div className="step-card" key={step.num}>
              <div className="step-icon">{step.icon}</div>
              <div className="step-num">{step.num}</div>
              <h3 className="step-title">{step.title}</h3>
              <p className="step-desc">{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="tech-section">
        <h2 className="section-title">Technology Stack</h2>
        <div className="tech-grid">
          <div className="tech-card">
            <h4>Backend</h4>
            <ul>
              <li>Python / Flask</li>
              <li>Scikit-learn AdaBoost</li>
              <li>Pandas / NumPy</li>
              <li>Joblib Model Persistence</li>
            </ul>
          </div>
          <div className="tech-card">
            <h4>Frontend</h4>
            <ul>
              <li>React + Vite</li>
              <li>Modern CSS / Glassmorphism</li>
              <li>Responsive Design</li>
              <li>REST API Integration</li>
            </ul>
          </div>
          <div className="tech-card">
            <h4>ML Pipeline</h4>
            <ul>
              <li>AI4I 2020 Dataset</li>
              <li>Label Encoding</li>
              <li>Train/Test Split</li>
              <li>Model Evaluation</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  )
}
