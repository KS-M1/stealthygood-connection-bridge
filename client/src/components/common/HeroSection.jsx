const HeroSection = () => {
  return (
    <section style={{
      textAlign: 'center',
      maxWidth: '900px',
      margin: '0 auto',
      padding: 'var(--space-10) var(--space-4) var(--space-12) var(--space-4)'
    }}>
      {/* Main Hero Content */}
      <div style={{ marginBottom: 'var(--space-8)' }}>
        <h1 style={{
          fontSize: 'var(--text-5xl)',
          fontWeight: 'var(--font-bold)',
          color: 'var(--primary-pink)',
          marginBottom: 'var(--space-4)',
          background: 'linear-gradient(135deg, var(--primary-pink) 0%, var(--primary-pink-dark) 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text'
        }}>
          Connect Once. Automate the Rest The.
        </h1>
        
        <p style={{
          fontSize: 'var(--text-xl)',
          color: 'var(--gray-700)',
          marginBottom: 'var(--space-6)',
          fontWeight: 'var(--font-medium)'
        }}>
          Experience powerful automation built on a foundation of uncompromising security.
        </p>
        
        <p style={{
          fontSize: 'var(--text-base)',
          color: 'var(--gray-600)',
          maxWidth: '600px',
          margin: '0 auto',
          lineHeight: '1.6'
        }}>
          Stealthy Good is engineered for trust. We use OAuth 2.0 and enforce least-privilege access to power your workflows—no passwords are stored, and we never train AI models on your data. You retain full control and can revoke access anytime.
        </p>
      </div>

      {/* Trust Bar */}
      <div style={{
        maxWidth: '650px',
        margin: '0 auto var(--space-8) auto',
        backgroundColor: 'var(--primary-pink-bg)',
        borderRadius: 'var(--radius-xl)',
        padding: 'var(--space-6)',
        boxShadow: 'var(--shadow-md)',
        border: '1px solid var(--primary-pink-light)'
      }}>
        <h3 style={{
          fontSize: 'var(--text-lg)',
          fontWeight: 'var(--font-semibold)',
          color: 'var(--primary-pink-dark)',
          marginBottom: 'var(--space-4)',
          margin: '0 0 var(--space-4) 0'
        }}>
          🔒 Automate with Confidence
        </h3>
        
        <ul style={{
          listStyle: 'none',
          padding: '0',
          margin: '0',
          fontSize: 'var(--text-sm)',
          color: 'var(--primary-pink-dark)',
          textAlign: 'left'
        }}>
          <li style={{
            marginBottom: 'var(--space-2)',
            display: 'flex',
            alignItems: 'center',
            gap: 'var(--space-2)'
          }}>
            <span style={{ color: 'var(--success)', fontWeight: 'bold' }}>✓</span>
            Connect securely with industry-standard OAuth 2.0
          </li>
          <li style={{
            marginBottom: 'var(--space-2)',
            display: 'flex',
            alignItems: 'center',
            gap: 'var(--space-2)'
          }}>
            <span style={{ color: 'var(--success)', fontWeight: 'bold' }}>✓</span>
            Maintain control with granular, minimal access permissions
          </li>
          <li style={{
            marginBottom: 'var(--space-2)',
            display: 'flex',
            alignItems: 'center',
            gap: 'var(--space-2)'
          }}>
            <span style={{ color: 'var(--success)', fontWeight: 'bold' }}>✓</span>
            Integrate with 12+ apps and growing
          </li>
          <li style={{
            marginBottom: '0',
            display: 'flex',
            alignItems: 'center',
            gap: 'var(--space-2)'
          }}>
            <span style={{ color: 'var(--success)', fontWeight: 'bold' }}>✓</span>
            Leverage a platform with over 2 million tasks automated
          </li>
        </ul>
      </div>

      {/* Works with your stack section */}
      <div style={{ textAlign: 'center', marginBottom: 'var(--space-6)' }}>
        <h2 style={{
          fontSize: 'var(--text-2xl)',
          fontWeight: 'var(--font-semibold)',
          color: 'var(--gray-800)',
          marginBottom: 'var(--space-2)'
        }}>
          Works with your stack
        </h2>
        <p style={{
          fontSize: 'var(--text-lg)',
          color: 'var(--gray-600)',
          marginBottom: 'var(--space-6)'
        }}>
          Choose an app to connect
        </p>
      </div>
    </section>
  );
};

export default HeroSection;
