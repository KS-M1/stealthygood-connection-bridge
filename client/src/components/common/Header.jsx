const Header = () => {
  return (
    <header style={{
      background: 'var(--white)',
      borderBottom: '1px solid var(--gray-200)',
      position: 'sticky',
      top: 0,
      zIndex: 1000,
      boxShadow: 'var(--shadow-sm)'
    }}>
      <nav style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 'var(--space-4) var(--space-6)',
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        {/* Logo */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: 'var(--space-3)'
        }}>
          <div style={{
            width: '40px',
            height: '40px',
            background: `linear-gradient(135deg, var(--primary-pink) 0%, var(--primary-pink-dark) 100%)`,
            borderRadius: 'var(--radius-lg)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontSize: 'var(--text-xl)',
            fontWeight: 'var(--font-bold)'
          }}>
            SG
          </div>
          <span style={{
            fontSize: 'var(--text-xl)',
            fontWeight: 'var(--font-bold)',
            color: 'var(--primary-pink-dark)'
          }}>
            Stealthy Good
          </span>
        </div>

        {/* Navigation Menu */}
        <div style={{
          display: 'flex',
          gap: 'var(--space-8)',
          alignItems: 'center'
        }}>
          <a href="#work" style={{
            color: 'var(--gray-700)',
            fontSize: 'var(--text-base)',
            fontWeight: 'var(--font-medium)',
            textDecoration: 'none',
            transition: 'color var(--transition-normal)'
          }}>
            Work
          </a>
          <a href="#blogs" style={{
            color: 'var(--gray-700)',
            fontSize: 'var(--text-base)',
            fontWeight: 'var(--font-medium)',
            textDecoration: 'none',
            transition: 'color var(--transition-normal)'
          }}>
            Blogs
          </a>
          <a href="#about" style={{
            color: 'var(--gray-700)',
            fontSize: 'var(--text-base)',
            fontWeight: 'var(--font-medium)',
            textDecoration: 'none',
            transition: 'color var(--transition-normal)'
          }}>
            About
          </a>
          <a href="#pricing" style={{
            color: 'var(--gray-700)',
            fontSize: 'var(--text-base)',
            fontWeight: 'var(--font-medium)',
            textDecoration: 'none',
            transition: 'color var(--transition-normal)'
          }}>
            Pricing
          </a>
        </div>
      </nav>
    </header>
  );
};

export default Header;
