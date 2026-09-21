import React from 'react';
import { Link } from 'react-router-dom';
import { FiRotateCw, FiGithub, FiTwitter, FiLinkedin, FiInstagram, FiHeart } from 'react-icons/fi';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          {/* Brand Col */}
          <div className="footer-brand">
            <Link to="/" className="nav-brand" style={{ display: 'inline-flex' }}>
              <div className="brand-icon">
                <FiRotateCw />
              </div>
              <span>RePlate<span className="brand-dot">.</span></span>
            </Link>
            <p>
              “Good food deserves a second destination.”
            </p>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem', marginTop: '0.5rem' }}>
              Empowering food businesses, restaurants, bakeries, and hostels to coordinate surplus food redistribution and eliminate avoidable organic waste.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="footer-col-title">Platform</h4>
            <ul className="footer-links">
              <li><Link to="/discover" className="footer-link">Discover Food</Link></li>
              <li><Link to="/add-surplus" className="footer-link">Share Surplus</Link></li>
              <li><Link to="/my-listings" className="footer-link">Provider Dashboard</Link></li>
              <li><Link to="/how-it-works" className="footer-link">How It Works</Link></li>
            </ul>
          </div>

          {/* Impact & About */}
          <div>
            <h4 className="footer-col-title">Impact & Mission</h4>
            <ul className="footer-links">
              <li><Link to="/impact" className="footer-link">Prevention Score</Link></li>
              <li><Link to="/about" className="footer-link">About RePlate</Link></li>
              <li><Link to="/impact" className="footer-link">Carbon Analytics</Link></li>
              <li><Link to="/about" className="footer-link">Community Partners</Link></li>
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h4 className="footer-col-title">Connect</h4>
            <div className="social-links" style={{ marginBottom: '1rem' }}>
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="social-btn" aria-label="GitHub">
                <FiGithub />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="social-btn" aria-label="Twitter">
                <FiTwitter />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="social-btn" aria-label="LinkedIn">
                <FiLinkedin />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="social-btn" aria-label="Instagram">
                <FiInstagram />
              </a>
            </div>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              Built for real-world sustainable urban food logistics.
            </p>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="footer-bottom">
          <div>
            &copy; {new Date().getFullYear()} RePlate Technologies. All rights reserved.
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
            Committed to Zero Waste with <FiHeart style={{ color: '#ef4444' }} /> for the planet.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
