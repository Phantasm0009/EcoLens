import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container footer-container">
        <div className="footer-section">
          <h3 className="footer-title">EcoLens</h3>
          <p>AI-powered waste classification for smarter recycling.</p>
        </div>
        
        <div className="footer-section">
          <h3 className="footer-title">Navigation</h3>
          <ul className="footer-links">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/scan">Scan</Link></li>
            <li><Link to="/history">History</Link></li>
            <li><Link to="/learn">Learn</Link></li>
          </ul>
        </div>
        
        <div className="footer-section">
          <h3 className="footer-title">About</h3>
          <ul className="footer-links">
            <li><Link to="/Mission">Our Mission</Link></li>
            <li><Link to="/Privacy">Privacy Policy</Link></li>
            <li><Link to="/Terms">Terms of Service</Link></li>
            <li><Link to="/Contact">Contact Us</Link></li>
          </ul>
        </div>
      </div>
      
      <div className="copyright">
        <div className="container">
          <p>&copy; {new Date().getFullYear()} EcoLens. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;