import React, { useState } from 'react';
import NavigationBar from '../components/landing/NavigationBar';
import AnimatedBackground from '../components/landing/AnimatedBackground';
import IntegrationsScroll from '../components/landing/IntegrationsScroll';
import AppSelectionPanel from '../components/landing/AppSelectionPanel';



const LandingPage = () => {
  const [isPanelOpen, setIsPanelOpen] = useState(false);

  const handleStartConnecting = () => {
    setIsPanelOpen(true);
  };

  const handleClosePanel = () => {
    setIsPanelOpen(false);
  };

  return (
    <AnimatedBackground>
      <NavigationBar />

      <div className="main-container" style={{
        position: 'relative',
        width: '100%',
        height: '100vh',
        overflow: 'hidden'
      }}>
        
        <div
          className={`body-content ${isPanelOpen ? 'panel-open' : ''}`}
          style={{
            height: 'calc(100vh - 60px)',
            color: 'white',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            fontFamily: 'Arial, sans-serif',
            padding: '0 20px',
            textAlign: 'center',
            position: 'relative',
            zIndex: 2,
            transition: 'transform 300ms ease-out',
            transform: isPanelOpen ? 'translateX(-320px)' : 'translateX(0)'
          }}
        >
          <div style={{ height: '100px' }}></div>

          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1, justifyContent: 'center' }}>
            <h1 style={{ 
              fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)', 
              fontWeight: 'bold',
              marginBottom: '1rem',
              letterSpacing: '0.02em',
              maxWidth: '95vw',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis'
            }}>
              CONNECT ONCE. AUTOMATE THE REST
            </h1>
            
            <p style={{ 
              color: '#dd7afd', 
              fontSize: 'clamp(0.85rem, 2vw, 1.2rem)',
              letterSpacing: '0.25em',
              marginTop: '-5px',
              marginBottom: '1.2rem',
              fontWeight: '300',
              maxWidth: '700px'
            }}>
              Securely connect your tools to Stealthy Good.
            </p>
            
            <p style={{ 
              fontSize: 'clamp(0.75rem, 1.6vw, 1rem)',
              lineHeight: '1.6',
              maxWidth: '750px',
              marginBottom: '1.8rem',
              color: 'rgba(255, 255, 255, 0.7)',
              fontWeight: '300'
            }}>
              We use OAuth and the least-privilege permissions required to power your automations. No passwords are stored, and we never train AI models on your data. Revoke access anytime from your provider.
            </p>

            <div style={{ marginBottom: '2rem' }}>
              <h3 style={{ 
                color: '#dd7afd', 
                fontSize: 'clamp(1rem, 2vw, 1.3rem)',
                marginBottom: '0.6rem',
                fontWeight: '600'
              }}>
                Automate with Confidence
              </h3>
              <p style={{ 
                color: 'white', 
                fontSize: 'clamp(0.75rem, 1.6vw, 1rem)',
                fontWeight: '300'
              }}>
                Least-privilege access | 12+ integrations | 2M+ tasks run
              </p>
            </div>

            <button 
              onClick={handleStartConnecting}
              style={{
                backgroundColor: '#dd7afd',
                color: '#0f0e0e',
                padding: '12px 30px',
                borderRadius: '30px',
                border: 'none',
                fontSize: 'clamp(1rem, 2vw, 1.2rem)',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                boxShadow: '0 10px 30px rgba(221, 122, 253, 0.3)'
              }}
              onMouseOver={(e) => {
                e.target.style.backgroundColor = '#bf49e3';
                e.target.style.transform = 'translateY(-2px)';
                e.target.style.boxShadow = '0 15px 40px rgba(221, 122, 253, 0.4)';
              }}
              onMouseOut={(e) => {
                e.target.style.backgroundColor = '#dd7afd';
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = '0 10px 30px rgba(221, 122, 253, 0.3)';
              }}
            >
              Start Connecting
            </button>
          </div>

          <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', paddingBottom: '20px' }}>
            <div style={{
              width: '100%',
              maxWidth: '920px',
              display: 'flex',
              alignItems: 'center',
              marginBottom: '10px',
              paddingTop: '15px'
            }}>
              <div style={{
                flex: 1,
                height: '1px',
                background: 'linear-gradient(to right, transparent, rgba(255,255,255,0.3), transparent)'
              }}></div>
              <span style={{
                padding: '0 20px',
                fontSize: 'clamp(0.75rem, 1.5vw, 0.95rem)',
                color: 'rgba(255,255,255,0.8)'
              }}>
                Our active integrations
              </span>
              <div style={{
                flex: 1,
                height: '1px',
                background: 'linear-gradient(to right, transparent, rgba(255,255,255,0.3), transparent)'
              }}></div>
            </div>

            <IntegrationsScroll />
          </div>
        </div>

        <div 
          className={`app-panel ${isPanelOpen ? 'panel-open' : ''}`}
          style={{
            position: 'fixed',
            top: '50%',
            right: '20px',
            width: '400px',
            height: 'fit-content',
            maxHeight: '90vh',
            backgroundColor: 'transparent',
            borderRadius: '20px',
            padding: '0',
            boxShadow: 'none',
            transform: isPanelOpen 
              ? 'translateX(0) translateY(-50%)' 
              : 'translateX(120%) translateY(-50%)',
            transition: 'transform 300ms ease-out',
            zIndex: 10,
            backdropFilter: 'none',
            border: 'none',
            overflowY: 'visible'
          }}
        >
          <AppSelectionPanel 
            onClose={handleClosePanel}
            onBrowseMore={() => console.log('Browse more clicked')}
          />
        </div>
      </div>
    </AnimatedBackground>
  );
};

export default LandingPage;
