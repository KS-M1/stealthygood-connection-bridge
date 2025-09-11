import React, { useState, useEffect } from "react";
import "./DynamicFormPanel.css";

const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

const appFormConfigs = {
  gmail: {
    title: "Connect your Gmail Account",
    icon: "gmail",
    fields: [
      { type: "text", name: "name", placeholder: "Full name", required: true },
      {
        type: "email",
        name: "email",
        placeholder: "Gmail address",
        required: true,
      },
    ],
    submitText: "Connect Gmail Account",
    description: "We'll securely connect to your Gmail using OAuth 2.0.",
    endpoint: "/api/auth/gmail",
    type: "oauth",
  },
  hubspot: {
    title: "Connect your HubSpot Account",
    icon: "hubspot",
    fields: [
      { type: "text", name: "name", placeholder: "Full name", required: true },
      {
        type: "email",
        name: "email",
        placeholder: "Email address",
        required: true,
      },
      {
        type: "text",
        name: "apiKey",
        placeholder: "HubSpot Private App Token",
        required: true,
      },
    ],
    submitText: "Connect HubSpot Account",
    description: "Enter your HubSpot Private App Token.",
    endpoint: "/api/auth/hubspot",
    type: "api",
  },
  outlook: {
    title: "Connect your Outlook Account",
    icon: "outlook",
    fields: [
      { type: "text", name: "name", placeholder: "Full name", required: true },
      {
        type: "email",
        name: "email",
        placeholder: "Outlook email",
        required: true,
      },
    ],
    submitText: "Connect Outlook Account",
    description: "We will redirect you to Microsoft to authorize access.",
    endpoint: "/api/auth/outlook",
    type: "oauth",
  },
  streak: {
    title: "Connect your Streak Account",
    icon: "streak",
    fields: [
      { type: "text", name: "name", placeholder: "Full name", required: true },
      {
        type: "email",
        name: "email",
        placeholder: "Email address",
        required: true,
      },
      {
        type: "text",
        name: "token",
        placeholder: "Streak API Key",
        required: true,
      },
    ],
    submitText: "Connect Streak Account",
    description: "Enter your Streak API Key.",
    endpoint: "/api/auth/streak",
    type: "api",
  },
};

const DynamicFormPanel = ({
  selectedApp,
  isOpen,
  onClose,
  onBack,
  onSubmit,
}) => {
  const config = appFormConfigs[selectedApp?.id] || null;

  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (config) {
      const initialData = {};
      config.fields.forEach((f) => {
        initialData[f.name] =
          f.defaultValue ?? (f.type === "checkbox" ? false : "");
      });
      setFormData(initialData);
      setErrors({});
    }
  }, [config, selectedApp]);

  const handleInputChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validateForm = () => {
    const newErrors = {};
    config.fields.forEach((field) => {
      const val = formData[field.name];
      if (field.required && !val) {
        newErrors[field.name] = "This field is required";
      }
      if (field.type === "email" && val) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(val))
          newErrors[field.name] = "Please enter a valid email address";
      }
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const submitToBackend = async () => {
    const endpoint = config.endpoint;
    const url = `${API_BASE}${endpoint}`;

    if (config.type === "oauth") {
      const resp = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: formData.name, email: formData.email }),
      });
      const result = await resp.json();
      if (!result.success)
        throw new Error(result.message || "Failed to generate OAuth URL");
      window.location.href = result.authUrl; // Redirect to provider (Google/MS etc.)
      return;
    }

    // API key/token services
    const resp = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
    const result = await resp.json();
    if (!result.success)
      throw new Error(result.message || "Failed to save credentials");
    return result;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("👉 Submitting form for app:", selectedApp?.id);
    console.log("Form data:", formData);
    if (!validateForm()) return;
    setIsSubmitting(true);
    try {
      const result = await submitToBackend();
      console.log("✅ Backend responded:", result);
      if (onSubmit) onSubmit(selectedApp, { ...formData, result });

      if (!config.type === "oauth") {
        const params = new URLSearchParams({
          provider: selectedApp?.id,
          name: formData.name || "",
          email: formData.email || "",
          status: "success",
        });
        window.location.replace("/success?" + params.toString());
      }
    } catch (err) {
      console.error("Submission error:", err);
      alert(err.message || "Submission failed");
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderField = (field) => {
    const hasError = errors[field.name];
    if (field.type === "checkbox") {
      return (
        <div key={field.name} className="form-field checkbox-field">
          <label className="checkbox-label">
            <input
              type="checkbox"
              className="form-checkbox"
              checked={!!formData[field.name]}
              onChange={(e) => handleInputChange(field.name, e.target.checked)}
            />
            <span className="checkbox-custom"></span>
            <span className="checkbox-text">{field.label}</span>
          </label>
        </div>
      );
    }

    return (
      <div key={field.name} className="form-field">
        <input
          type={field.type}
          className={`form-input ${hasError ? "error" : ""}`}
          value={formData[field.name] || ""}
          onChange={(e) => handleInputChange(field.name, e.target.value)}
          placeholder={field.placeholder}
          required={field.required}
        />
        {hasError && <span className="form-error">{hasError}</span>}
      </div>
    );
  };

  if (!config || !isOpen) return null;

  return (
    <div className="form-panel">
      <button
        className="form-close-btn"
        onClick={onClose}
        aria-label="Close form"
      >
        ×
      </button>
      <button
        className="form-back-btn"
        onClick={onBack}
        aria-label="Back to app selection"
      >
        ← Back
      </button>

      <div className="form-header">
        <div className="form-app-icon">
          <img
            src={`/icons/${config.icon}.svg`}
            alt={`${config.title} icon`}
            className="form-icon"
          />
        </div>
        <h2 className="form-title">{config.title}</h2>
        <p className="form-description">{config.description}</p>
      </div>

      <form onSubmit={handleSubmit} className="dynamic-form">
        <div className="form-fields">{config.fields.map(renderField)}</div>
        <button
          type="submit"
          className={`form-submit-btn ${isSubmitting ? "submitting" : ""}`}
          disabled={isSubmitting}
        >
          {isSubmitting ? "Connecting..." : config.submitText}
        </button>
      </form>
    </div>
  );
};

export default DynamicFormPanel;
