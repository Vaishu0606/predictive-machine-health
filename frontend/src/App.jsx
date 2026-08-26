import { useState } from 'react'
import HomePage from './components/HomePage'
import PredictionForm from './components/PredictionForm'
import ResultPage from './components/ResultPage'
import './App.css'

const PAGES = {
  HOME: 'home',
  PREDICT: 'predict',
  RESULT: 'result',
}

function App() {
  const [page, setPage] = useState(PAGES.HOME)
  const [result, setResult] = useState(null)
  const [inputData, setInputData] = useState(null)

  const handleAnalyze = () => {
    setPage(PAGES.PREDICT)
  }

  const handlePrediction = (predictionResult, formData) => {
    setResult(predictionResult)
    setInputData(formData)
    setPage(PAGES.RESULT)
  }

  const handleBackToHome = () => {
    setPage(PAGES.HOME)
    setResult(null)
    setInputData(null)
  }

  const handleAnalyzeAnother = () => {
    setPage(PAGES.PREDICT)
    setResult(null)
    setInputData(null)
  }

  return (
    <div className="app">
      <header className="app-header">
        <div className="header-content">
          <div className="logo" onClick={handleBackToHome}>
            <div className="logo-icon">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2L2 7l10 5 10-5-10-5z"/>
                <path d="M2 17l10 5 10-5"/>
                <path d="M2 12l10 5 10-5"/>
              </svg>
            </div>
            <span className="logo-text">Predictive Machine Health</span>
          </div>
          <nav className="header-nav">
            <button className="nav-btn" onClick={handleBackToHome}>Home</button>
            <button className="nav-btn active" onClick={handleAnalyze}>Analyze</button>
          </nav>
        </div>
      </header>

      <main className="app-main">
        {page === PAGES.HOME && <HomePage onAnalyze={handleAnalyze} />}
        {page === PAGES.PREDICT && <PredictionForm onPrediction={handlePrediction} />}
        {page === PAGES.RESULT && (
          <ResultPage
            result={result}
            inputData={inputData}
            onAnalyzeAnother={handleAnalyzeAnother}
            onBackToHome={handleBackToHome}
          />
        )}
      </main>

      <footer className="app-footer">
        <p>Predictive Machine Failure Detection System &middot; Powered by AdaBoost</p>
      </footer>
    </div>
  )
}

export default App
