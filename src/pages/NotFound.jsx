import React from 'react';
import { Link } from 'react-router-dom';
import { FiAlertTriangle, FiHome, FiCompass } from 'react-icons/fi';

const NotFound = () => {
  return (
    <div className="page-container container" style={{ textAlign: 'center', padding: '6rem 1.5rem' }}>
      <div style={{
        width: '80px',
        height: '80px',
        borderRadius: '50%',
        background: 'rgba(239, 68, 68, 0.15)',
        color: '#ef4444',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '2.5rem',
        margin: '0 auto 1.5rem'
      }}>
        <FiAlertTriangle />
      </div>

      <h1 style={{ fontSize: '3rem', fontWeight: 800, color: '#ffffff', marginBottom: '0.75rem' }}>
        404
      </h1>

      <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.75rem' }}>
        Destination Not Found
      </h2>

      <p style={{ color: 'var(--text-secondary)', maxWidth: '480px', margin: '0 auto 2rem', fontSize: '1rem' }}>
        The page or surplus food resource you are looking for might have been moved, expired, or doesn't exist.
      </p>

      <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
        <Link to="/" className="btn btn-primary">
          <FiHome /> Back to Homepage
        </Link>
        <Link to="/discover" className="btn btn-secondary">
          <FiCompass /> Discover Active Food
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
