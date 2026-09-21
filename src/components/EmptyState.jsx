import React from 'react';
import { Link } from 'react-router-dom';
import { FiInbox, FiPlusCircle } from 'react-icons/fi';

const EmptyState = ({
  title = 'No surplus food available right now',
  message = 'Check again shortly or help list surplus food to prevent waste.',
  actionLabel = 'Share Surplus Food',
  actionLink = '/add-surplus',
  icon: Icon = FiInbox
}) => {
  return (
    <div className="empty-state-box">
      <div className="empty-icon-circle">
        <Icon />
      </div>
      <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem', color: 'var(--text-primary)' }}>
        {title}
      </h3>
      <p style={{ fontSize: '0.925rem', color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
        {message}
      </p>
      {actionLabel && actionLink && (
        <Link to={actionLink} className="btn btn-primary">
          <FiPlusCircle /> {actionLabel}
        </Link>
      )}
    </div>
  );
};

export default EmptyState;
