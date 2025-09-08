import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import NavigationBar from '../landing/NavigationBar';
import AnimatedBackground from '../landing/AnimatedBackground';
import StatusCard from './StatusCard';
import './SuccessPage.css';

const SuccessPage = ({ data, onClose }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [pageData, setPageData] = useState(null);

  useEffect(() => {
    // If data is passed as prop (from MainApp), use it
    if (data) {
      setPageData(data);
    } else {
      // Otherwise, get data from URL params (for OAuth callback flow)
      const urlParams = new URLSearchParams(location.search);
      const provider = urlParams.get('provider');
      const name = urlParams.get('name');
      const email = urlParams.get('email');
      const status = urlParams.get('status') || 'success';
      const message = urlParams.get('message');

      console.log('SuccessPage URL params:', { provider, name, email, status, message });

      setPageData({
        provider,
        name,
        email,
        status,
        message
      });
    }
  }, [data, location.search]);

  const getAppDisplayName = (provider) => {
    const displayNames = {
      gmail: 'Gmail',
      hubspot: 'HubSpot',
      outlook: 'Outlook',
      streak: 'Streak',
    };
    return displayNames[provider] || provider || 'the app';
  };

  const getStatusMessage = () => {
    if (!pageData) return '';

    if (pageData.status === 'error') {
      return pageData.message || 'An error occurred while processing your request.';
    }

    if (pageData.provider && pageData.name) {
      return (
        <>
          <strong>{pageData.name}</strong>, your <strong>{getAppDisplayName(pageData.provider)}</strong> account 
          has been successfully connected and saved to n8n automation platform.
          <br /><br />
          You can now create powerful automated workflows using your connected account.
        </>
      );
    }

    return 'Your account has been successfully connected to our automation platform.';
  };

  const getStatusTitle = () => {
    return pageData?.status === 'error' ? 'Connection Failed' : 'Successfully Connected!';
  };

  const getStatusType = () => {
    return pageData?.status === 'error' ? 'error' : 'success';
  };

  // Get the correct robot image based on status
  const getRobotImage = () => {
    return pageData?.status === 'error' 
      ? '/icons/error.png'  // Error robot
      : '/icons/success.png'; // Success robot
  };

  const getRobotAlt = () => {
    return pageData?.status === 'error' ? 'Error Robot' : 'Success Robot';
  };

  const handleClose = () => {
    if (onClose) {
      // Called from MainApp component
      onClose();
    } else {
      // Called from URL route
      navigate('/');
    }
  };

  if (!pageData) {
    return null; // Don't render anything until we have data
  }

  return (
    <div className="success-page-root">
      <AnimatedBackground>
        <NavigationBar />
        
        <div className="success-left-panel">
          <StatusCard
            type={getStatusType()}
            title={getStatusTitle()}
            message={getStatusMessage()}
            redirectAfterMs={10000}
            redirectTo="/"
            onClose={handleClose}
          />
        </div>

        {/* Always show robot - success.png or error.png */}
        <div className="success-robot-wrapper">
          <div className="success-robot-shadow"></div>
          <img
            src={getRobotImage()}
            alt={getRobotAlt()}
            className="success-robot-image"
            onError={(e) => {
              console.error('Robot image failed to load:', e.target.src);
              // Fallback - hide image if it fails to load
              e.target.style.display = 'none';
            }}
          />
        </div>
      </AnimatedBackground>
    </div>
  );
};

export default SuccessPage;
