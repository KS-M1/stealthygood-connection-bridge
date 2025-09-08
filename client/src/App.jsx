import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom'
import LandingPage from './pages/LandingPage'
import OAuthCallback from './components/common/OAuthCallback'
import SuccessPage from './components/common/SuccessPage'
import './App.css'

// ✨ SUCCESS MODAL OVERLAY COMPONENT
const SuccessModal = ({ data, onClose }) => {
  return (
    <div 
      className="modal-overlay" 
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 9999
      }}
    >
      <div style={{ position: 'relative', maxWidth: '90vw', maxHeight: '90vh' }}>
        <SuccessPage data={data} onClose={onClose} />
      </div>
    </div>
  );
};

// ✨ MAIN ROUTER COMPONENT
function AppRouter() {
  const location = useLocation();
  const state = location.state;
  const backgroundLocation = state?.backgroundLocation;

  return (
    <>
      {/* Main Routes - Background */}
      <Routes location={backgroundLocation || location}>
        <Route path="/" element={<LandingPage />} />
        <Route path="/oauth2callback" element={<OAuthCallback />} />
        <Route path="/success" element={<SuccessPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      {/* Modal Routes - Overlay when backgroundLocation exists */}
      {backgroundLocation && (
        <Routes>
          <Route 
            path="/success" 
            element={
              <SuccessModal 
                data={state?.successData}
                onClose={() => window.history.back()}
              />
            } 
          />
        </Routes>
      )}
    </>
  );
}

function App() {
  return (
    <Router>
      <AppRouter />
    </Router>
  );
}

export default App;
