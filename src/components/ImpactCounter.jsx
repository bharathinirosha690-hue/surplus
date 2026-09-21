import React, { useState, useEffect } from 'react';

const ImpactCounter = ({ endValue = 0, duration = 1500, prefix = '', suffix = '', label, icon: Icon }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTimestamp = null;
    const target = Number(endValue) || 0;
    
    // Avoid animation if zero or negative
    if (target <= 0) {
      setCount(0);
      return;
    }

    let animationFrame;
    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      
      // Ease out cubic
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(easeProgress * target));

      if (progress < 1) {
        animationFrame = window.requestAnimationFrame(step);
      } else {
        setCount(target);
      }
    };

    animationFrame = window.requestAnimationFrame(step);

    return () => {
      if (animationFrame) {
        window.cancelAnimationFrame(animationFrame);
      }
    };
  }, [endValue, duration]);

  return (
    <div className="stat-metric-card">
      {Icon && (
        <div className="stat-metric-icon">
          <Icon />
        </div>
      )}
      <div className="stat-metric-val">
        {prefix}{count.toLocaleString()}{suffix}
      </div>
      {label && <div className="stat-metric-title">{label}</div>}
    </div>
  );
};

export default ImpactCounter;
