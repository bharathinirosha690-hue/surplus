import React, { useState, useEffect } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { 
  FiCompass, 
  FiLayers, 
  FiActivity, 
  FiInfo, 
  FiPlusCircle, 
  FiList, 
  FiMenu, 
  FiX, 
  FiRotateCw 
} from 'react-icons/fi';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  return (
    <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
      <div className="container navbar-container">
        {/* Brand Logo */}
        <Link to="/" className="nav-brand" aria-label="RePlate Homepage">
          <div className="brand-icon">
            <FiRotateCw />
          </div>
          <span>RePlate<span className="brand-dot">.</span></span>
        </Link>

        {/* Desktop Links */}
        <ul className="nav-links-desktop">
          <li>
            <NavLink to="/" end className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/discover" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
              <FiCompass /> Discover Food
            </NavLink>
          </li>
          <li>
            <NavLink to="/how-it-works" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
              <FiLayers /> How It Works
            </NavLink>
          </li>
          <li>
            <NavLink to="/impact" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
              <FiActivity /> Impact
            </NavLink>
          </li>
          <li>
            <NavLink to="/about" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
              <FiInfo /> About
            </NavLink>
          </li>
          <li>
            <NavLink to="/my-listings" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
              <FiList /> My Listings
            </NavLink>
          </li>
        </ul>

        {/* Action Button */}
        <div className="nav-actions">
          <Link to="/add-surplus" className="btn btn-primary btn-sm desktop-only">
            <FiPlusCircle /> Add Surplus
          </Link>
          
          {/* Mobile Menu Toggle Button */}
          <button 
            type="button" 
            className="mobile-toggle-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <div className={`mobile-menu ${mobileMenuOpen ? 'open' : ''}`}>
        <NavLink to="/" end className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
          Home
        </NavLink>
        <NavLink to="/discover" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
          <FiCompass /> Discover Food
        </NavLink>
        <NavLink to="/how-it-works" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
          <FiLayers /> How It Works
        </NavLink>
        <NavLink to="/impact" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
          <FiActivity /> Impact
        </NavLink>
        <NavLink to="/about" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
          <FiInfo /> About
        </NavLink>
        <NavLink to="/my-listings" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
          <FiList /> My Listings
        </NavLink>
        <Link to="/add-surplus" className="btn btn-primary btn-block" style={{ marginTop: '0.5rem' }}>
          <FiPlusCircle /> Add Surplus Food
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
