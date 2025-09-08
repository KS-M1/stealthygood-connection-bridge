import { useState } from 'react';
import './AppCard.css';

const AppCard = ({ app, onSelect, isSelected }) => {
  const [imageError, setImageError] = useState(false);

  const handleClick = () => {
    onSelect(app);
  };

  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <div 
      className={`app-card ${isSelected ? 'selected' : ''} ${app.status === 'coming-soon' ? 'coming-soon' : ''}`}
      onClick={handleClick}
    >
      <div className="app-icon">
        {!imageError ? (
          <img 
            src={app.icon} 
            alt={app.displayName}
            onError={handleImageError}
          />
        ) : (
          <div className="icon-fallback">
            {app.displayName.charAt(0)}
          </div>
        )}
      </div>
      
      <div className="app-info">
        <h3 className="app-name">{app.displayName}</h3>
        <p className="app-description">{app.description}</p>
      </div>

      {app.status === 'coming-soon' && (
        <span className="status-badge">Coming Soon</span>
      )}

      <div className="app-card-hover">
        <span>Connect</span>
      </div>
    </div>
  );
};

export default AppCard;
