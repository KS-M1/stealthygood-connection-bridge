import React, { useState } from 'react';
import './AppSelectionPanel.css';
import BrowseModal from './BrowseModal';
import DynamicFormPanel from './DynamicFormPanel';

const apps = [
  { id: 'gmail', label: 'Connect with Gmail', icon: 'gmail' },
  { id: 'hubspot', label: 'Connect with Hubspot', icon: 'hubspot' },
  { id: 'outlook', label: 'Connect with Outlook', icon: 'outlook' },
  { id: "streak", label: "Connect with Streak", icon: "streak" },
];

const AppSelectionPanel = ({ onClose, onBrowseMore }) => {
  const [showBrowseModal, setShowBrowseModal] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [selectedApp, setSelectedApp] = useState(null);

  const handleAppClick = (app) => {
    setSelectedApp(app);
    setShowForm(true);
  };

  const handleBrowseMore = () => {
    setShowBrowseModal(true);
  };

  const handleModalClose = () => {
    setShowBrowseModal(false);
  };

  const handleSelectApp = (app) => {
    setSelectedApp(app);
    setShowBrowseModal(false);
    setShowForm(true);
  };

  const handleFormBack = () => {
    setShowForm(false);
    setSelectedApp(null);
  };

  const handleFormClose = () => {
    setShowForm(false);
    setSelectedApp(null);
    onClose();
  };

  const handleFormSubmit = (app, formData) => {
    console.log('Integration successful!', { app, formData });
    // Here you would typically:
    // 1. Send data to your backend
    // 2. Show success message
    // 3. Update UI to show connected state
    // 4. Close the form
    
    // For now, just close the form
    setTimeout(() => {
      setShowForm(false);
      setSelectedApp(null);
      onClose();
    }, 1000);
  };

  // Don't render app selection if form is showing
  if (showForm) {
    return (
      <DynamicFormPanel
        selectedApp={selectedApp}
        isOpen={showForm}
        onClose={handleFormClose}
        onBack={handleFormBack}
        onSubmit={handleFormSubmit}
      />
    );
  }

  return (
    <>
      <div className="app-selection-panel">
        <button className="close-btn" onClick={onClose} aria-label="Close panel">
          ×
        </button>
        
        <h2 className="panel-title">Choose an app to connect</h2>
        
        <div className="app-list">
          {apps.map(app => (
            <button 
              key={app.id} 
              className="app-button"
              onClick={() => handleAppClick(app)}
            >
              <div className="app-icon-section">
                <img 
                  src={`/src/assets/icons/${app.icon}.svg`} 
                  alt={`${app.label} icon`}
                  className="app-icon"
                />
              </div>
              <div className="app-label-section">
                <span className="app-label">{app.label}</span>
              </div>
            </button>
          ))}
        </div>
        
        <div className="separator">or</div>
        
        <button className="browse-more-btn" onClick={handleBrowseMore}>
          Browse more integrations
        </button>
        
        <p className="panel-footer">
          For any inquiries, please reach out to your administration.
        </p>
      </div>

      <BrowseModal 
        isOpen={showBrowseModal}
        onClose={handleModalClose}
        onSelectApp={handleSelectApp}
      />
    </>
  );
};

export default AppSelectionPanel;
