import { useState, useEffect } from 'react'
import Navigation from './components/Navigation'
import OnboardingFlow from './components/OnboardingFlow'
import HomePage from './pages/HomePage'
import ContactsPage from './pages/ContactsPage'
import EvidencePage from './pages/EvidencePage'
import TestPage from './pages/TestPage'
import SettingsPage from './pages/SettingsPage'
import './App.css'

function App() {
  const [currentPage, setCurrentPage] = useState('home')
  const [showOnboarding, setShowOnboarding] = useState(false)

  useEffect(() => {
    // Check if user has completed onboarding
    const hasCompletedOnboarding = localStorage.getItem('myprotector_onboarding_completed')
    if (!hasCompletedOnboarding) {
      setShowOnboarding(true)
    }
  }, [])

  const handleOnboardingComplete = () => {
    localStorage.setItem('myprotector_onboarding_completed', 'true')
    setShowOnboarding(false)
  }

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage />
      case 'contacts':
        return <ContactsPage />
      case 'evidence':
        return <EvidencePage />
      case 'test':
        return <TestPage />
      case 'settings':
        return <SettingsPage />
      default:
        return <HomePage />
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation currentPage={currentPage} onPageChange={setCurrentPage} />
      {renderPage()}
      
      {showOnboarding && (
        <OnboardingFlow onComplete={handleOnboardingComplete} />
      )}
    </div>
  )
}

export default App
