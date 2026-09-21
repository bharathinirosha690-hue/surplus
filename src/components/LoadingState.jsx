import React from 'react';

const LoadingState = ({ message = 'Loading surplus data...' }) => {
  return (
    <div className="loading-container" role="status" aria-live="polite">
      <div className="loading-spinner" />
      <p style={{ color: 'var(--text-secondary)', fontSize: '0.925rem' }}>{message}</p>
    </div>
  );
};

export default LoadingState;
