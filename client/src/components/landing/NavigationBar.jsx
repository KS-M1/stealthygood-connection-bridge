import React from "react";
import "./NavigationBar.css";

const NavigationBar = () => {
  return (
    <nav className="navigation-bar">
      {/* Logo */}
      <div className="nav-logo">
        <a href="https://stealthygood.com/">
          <img
            src="/icons/Logo.png"
            alt="Stealthy Good"
            className="logo-image"
          />
        </a>
      </div>

      {/* Center Menu Items */}
      <div className="nav-center">
        <a href="https://stealthygood.com/" className="nav-link">
          Home
        </a>
        <a href="https://stealthygood.com/works" className="nav-link">
          Work
        </a>
        <a href="https://stealthygood.com/blogs" className="nav-link">
          Blog
        </a>
        <a href="https://stealthygood.com/about" className="nav-link">
          About
        </a>
        <a
          href="https://stealthygood.com/#pricing-section"
          className="nav-link"
        >
          Pricing
        </a>
      </div>

      {/* Contact Button */}
      <div className="nav-contact">
        <a href="https://stealthygood.com/contact" className="contact-button">
          Contact
        </a>
      </div>
    </nav>
  );
};

export default NavigationBar;
