import React, { useEffect } from 'react';
import { FiAlertTriangle, FiX } from 'react-icons/fi';

const ConfirmModal = ({
  isOpen,
  title = 'Are you sure?',
  message = 'This action cannot be undone.',
  confirmText = 'Delete Listing',
  cancelText = 'Cancel',
  onConfirm,
  onCancel,
  isDangerous = true,
  isLoading = false
}) => {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen && !isLoading) {
        onCancel();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, isLoading, onCancel]);

  if (!isOpen) return null;

  return (
    <div className="modal-backdrop" onClick={isLoading ? undefined : onCancel} role="dialog" aria-modal="true">
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              background: isDangerous ? 'rgba(239, 68, 68, 0.15)' : 'rgba(16, 185, 129, 0.15)',
              color: isDangerous ? '#ef4444' : '#10b981',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.2rem'
            }}>
              <FiAlertTriangle />
            </div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-primary)' }}>{title}</h3>
          </div>
          <button 
            type="button" 
            onClick={onCancel}
            disabled={isLoading}
            style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', fontSize: '1.2rem' }}
            aria-label="Close modal"
          >
            <FiX />
          </button>
        </div>

        <p style={{ color: 'var(--text-secondary)', fontSize: '0.925rem', marginBottom: '1.75rem', lineHeight: 1.6 }}>
          {message}
        </p>

        <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end' }}>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={onCancel}
            disabled={isLoading}
          >
            {cancelText}
          </button>
          <button
            type="button"
            className={`btn ${isDangerous ? 'btn-danger' : 'btn-primary'}`}
            onClick={onConfirm}
            disabled={isLoading}
          >
            {isLoading ? 'Processing...' : confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
