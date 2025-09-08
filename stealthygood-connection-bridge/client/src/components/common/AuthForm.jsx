import { useState } from 'react';
import './AuthForm.css';

const AuthForm = ({ app, onSubmit, onCancel, loading }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    apiKey: '',
    token: ''
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const getFieldsToShow = () => {
    const baseFields = ['name', 'email'];
    
    switch(app.id) {
      case 'gmail':
      case 'outlook':
        return baseFields; // OAuth only needs name and email
      case 'hubspot':
        return [...baseFields, 'apiKey'];
      case 'streak':
        return [...baseFields, 'token'];
      default:
        return baseFields;
    }
  };

  const fieldsToShow = getFieldsToShow();

  return (
    <div className="auth-form-overlay">
      <div className="auth-form-container">
        <div className="auth-form-header">
          <h2>Connect to {app.displayName}</h2>
          <p>{app.description}</p>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          {fieldsToShow.includes('name') && (
            <div className="form-group">
              <label htmlFor="name">Full Name *</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Enter your full name"
                required
              />
            </div>
          )}

          {fieldsToShow.includes('email') && (
            <div className="form-group">
              <label htmlFor="email">Email Address *</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Enter your email address"
                required
              />
            </div>
          )}

          {fieldsToShow.includes('apiKey') && (
            <div className="form-group">
              <label htmlFor="apiKey">HubSpot API Key *</label>
              <input
                type="text"
                id="apiKey"
                name="apiKey"
                value={formData.apiKey}
                onChange={handleInputChange}
                placeholder="Enter your HubSpot API key"
                required
              />
              <small>Find your API key in HubSpot Settings → Integrations → API Key</small>
            </div>
          )}

          {fieldsToShow.includes('token') && (
            <div className="form-group">
              <label htmlFor="token">Streak API Token *</label>
              <input
                type="text"
                id="token"
                name="token"
                value={formData.token}
                onChange={handleInputChange}
                placeholder="Enter your Streak API token"
                required
              />
              <small>Find your API token in Streak Settings → API</small>
            </div>
          )}

          <div className="form-actions">
            <button type="button" onClick={onCancel} className="btn-cancel">
              Cancel
            </button>
            console.log('AuthForm render - loading:', loading, 'showForm:', showForm);
            <button type="submit" disabled={loading} className="btn-connect">
              {loading ? 'Connecting...' : `Connect to ${app.displayName}`}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AuthForm;
