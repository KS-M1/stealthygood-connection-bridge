import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './StatusCard.css'; // we'll add this next

/**
 * Props:
 * - type: 'success' | 'error' (controls icon/color)
 * - title: string (display title)
 * - message: string | ReactNode (main dynamic message)
 * - redirectAfterMs: number (milliseconds to auto-redirect). 10000 = 10s
 * - redirectTo: string (path to navigate after timeout). default '/'
 * - onClose: optional callback (called when user clicks close). If not provided, component navigates to redirectTo immediately.
 */
const StatusCard = ({
  type = 'success',
  title,
  message,
  redirectAfterMs = 1000,
  redirectTo = '/',
  onClose
}) => {
  const navigate = useNavigate();
  const timerRef = useRef(null);

  useEffect(() => {
    // Start the redirect timer (only if redirectAfterMs > 0)
    if (redirectAfterMs > 0) {
      timerRef.current = setTimeout(() => {
        // Use react-router navigation for SPA behavior
        navigate(redirectTo);
      }, redirectAfterMs);
    }

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [redirectAfterMs, navigate, redirectTo]);

  const handleClose = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    if (typeof onClose === 'function') {
      onClose();
    } else {
      navigate(redirectTo);
    }
  };

  const renderIcon = () => {
    if (type === 'success') {
      return (
        <svg width="36" height="36" viewBox="0 0 24 24" fill="none" className="status-icon-svg">
          <path d="M9 12L11 14L15 10" stroke="#22C55E" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    }
    return (
      <svg width="36" height="36" viewBox="0 0 24 24" fill="none" className="status-icon-svg">
        <path d="M18 6L6 18M6 6L18 18" stroke="#dd7afd" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  };

  const defaultTitle = type === 'success' ? 'Success' : 'Error';

  return (
    <div
      className="status-panel-wrapper"
      // inline style ensures exact placement independent of other code
      style={{
        position: 'fixed',
        top: '50%',
        right: '20px',
        width: '400px',
        maxHeight: '90vh',
        transform: 'translateY(-50%)',
        zIndex: 1000,
      }}
      aria-live="polite"
    >
      <div className="status-panel-card" role="dialog" aria-modal="true" aria-label={title || defaultTitle}>
        <button className="status-close-btn" aria-label="Close" onClick={handleClose}>
          ×
        </button>

        <div className="status-panel-content">
          <div className="status-icon-circle">
            {renderIcon()}
          </div>

          <h2 className="status-title">
            {title || defaultTitle}
          </h2>

          <div className="status-message">
            {message}
          </div>

          <div style={{ marginTop: 20 }}>
            <button className="status-action-btn" onClick={handleClose}>
              Back to main page
            </button>
          </div>

          <p className="status-footer">
            For any kind of query, kindly contact your administration.
          </p>
        </div>
      </div>
    </div>
  );
};

export default StatusCard;
