import React from 'react';
import './AnimatedBackground.css';

const AnimatedBackground = ({ children }) => {
  return (
    <div className="animated-background">
      <div className="gradient-orb orb-1"></div>
      <div className="gradient-orb orb-2"></div>
      <div className="gradient-orb orb-3"></div>
      <div className="gradient-orb orb-4"></div>
      <div className="wave-overlay"></div>
      {children}
    </div>
  );
};

export default AnimatedBackground;
