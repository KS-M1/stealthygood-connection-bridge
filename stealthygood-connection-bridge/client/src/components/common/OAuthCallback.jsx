import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

const OAuthCallback = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleCallback = async () => {
      try {
        const urlParams = new URLSearchParams(location.search);
        const code = urlParams.get('code');
        const rawState = urlParams.get('state');

        if (!code) {
          // Redirect to error page immediately
          const params = new URLSearchParams({
            status: 'error',
            message: 'Authorization code not found'
          });
          window.location.replace(`/success?${params.toString()}`);
          return;
        }

        let userInfo = {};
        if (rawState) {
          try {
            userInfo = JSON.parse(rawState);
          } catch {
            userInfo = { provider: urlParams.get('provider') || 'gmail' };
          }
        }

        // Process callback in background
        const response = await fetch(`${API_BASE}/api/auth/callback`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            code,
            state: userInfo,
            provider: userInfo.provider,
          }),
        });

        const result = await response.json();

        if (result.success) {
          // Redirect to beautiful success page immediately
          const params = new URLSearchParams({
            provider: userInfo.provider,
            name: userInfo.name || '',
            email: userInfo.email || '',
            status: 'success'
          });
          window.location.replace(`/success?${params.toString()}`);
        } else {
          // Redirect to error page immediately
          const params = new URLSearchParams({
            provider: userInfo.provider,
            status: 'error',
            message: result.message || 'Failed to save credentials'
          });
          window.location.replace(`/success?${params.toString()}`);
        }
      } catch (error) {
        console.error('Callback error:', error);
        // Redirect to error page immediately
        const params = new URLSearchParams({
          status: 'error',
          message: 'An error occurred while processing your authentication'
        });
        window.location.replace(`/success?${params.toString()}`);
      }
    };

    handleCallback();
  }, [location, navigate]);

  // Show absolutely minimal loading state - no UI components
  return null; // Return nothing to avoid any flicker
};

export default OAuthCallback;
