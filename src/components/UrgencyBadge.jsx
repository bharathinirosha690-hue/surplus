import React from 'react';
import { FiClock, FiAlertCircle, FiCheckCircle, FiPackage } from 'react-icons/fi';
import { getUrgencyLevel } from '../utils/timeCalculator';

const UrgencyBadge = ({ deadline, status, showText = true }) => {
  const urgency = getUrgencyLevel(deadline, status);

  const getIcon = () => {
    switch (urgency.level) {
      case 'critical':
        return <FiAlertCircle />;
      case 'warning':
      case 'safe':
        return <FiClock />;
      case 'reserved':
        return <FiPackage />;
      case 'collected':
        return <FiCheckCircle />;
      default:
        return <FiClock />;
    }
  };

  return (
    <div 
      className={`urgency-badge ${urgency.badgeClass}`}
      title={urgency.description}
      role="status"
    >
      <span className="urgency-dot" />
      {getIcon()}
      {showText && <span>{urgency.label}</span>}
    </div>
  );
};

export default UrgencyBadge;
