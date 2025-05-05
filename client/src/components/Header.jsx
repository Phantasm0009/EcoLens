import React, { useState, useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import '../assets/styles.css';

const Header = () => {
  const { user, logout } = useContext(AuthContext);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const isActive = (path) => location.pathname === path ? 'active-link' : '';

  return (
    <header className="header">
      <div className="container header-container">
        <div className="logo">
          <Link to="/">
            <span className="logo-icon">♻️</span>
            <span className="logo-text">EcoLens</span>
          </Link>
        </div>

        <button className="mobile-menu-btn" onClick={toggleMobileMenu}>
          <span className={`hamburger ${mobileMenuOpen ? 'open' : ''}`}></span>
        </button>

        <nav className={`nav-menu ${mobileMenuOpen ? 'open' : ''}`}>
          <ul>
            <li><Link to="/" className={isActive('/')}>Home</Link></li>
            <li><Link to="/scan" className={isActive('/scan')}>Scan</Link></li>
            <li><Link to="/history" className={isActive('/history')}>History</Link></li>
            <li><Link to="/learn" className={isActive('/learn')}>Learn</Link></li>
            {user ? (
              <>
                <li><Link to="/profile" className={isActive('/profile')}>Profile</Link></li>
                <li><button className="btn-logout" onClick={logout}>Logout</button></li>
              </>
            ) : (
              <li><Link to="/login" className="btn btn-login">Login</Link></li>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;