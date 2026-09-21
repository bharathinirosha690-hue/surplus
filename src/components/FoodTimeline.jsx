import React from 'react';
import { FiCheck, FiPlusCircle, FiEye, FiBookmark, FiTruck, FiCheckSquare } from 'react-icons/fi';
import { RESCUE_STAGES, getStageIndex } from '../utils/foodStatus';

const FoodTimeline = ({ status = 'available' }) => {
  const currentIndex = getStageIndex(status);

  const getStepIcon = (index, isCompleted, isActive) => {
    if (isCompleted) return <FiCheck />;
    switch (index) {
      case 0: return <FiPlusCircle />;
      case 1: return <FiEye />;
      case 2: return <FiBookmark />;
      case 3: return <FiTruck />;
      case 4: return <FiCheckSquare />;
      default: return <FiCheck />;
    }
  };

  const progressPercent = Math.min(100, Math.max(0, (currentIndex / (RESCUE_STAGES.length - 1)) * 100));

  return (
    <div className="food-timeline-wrapper">
      <h3 className="timeline-title">
        <FiTruck className="text-emerald" style={{ color: 'var(--emerald-light)' }} />
        Food Rescue Lifecycle
      </h3>
      
      <div className="timeline-track">
        <div className="timeline-line-bg" />
        <div 
          className="timeline-line-progress" 
          style={{ width: `calc(${progressPercent}% * 0.85)` }}
        />

        {RESCUE_STAGES.map((stage, idx) => {
          const isCompleted = idx < currentIndex;
          const isActive = idx === currentIndex;
          const isUpcoming = idx > currentIndex;

          let nodeClass = 'timeline-node';
          if (isActive) nodeClass += ' active';
          if (isCompleted) nodeClass += ' completed';
          if (isUpcoming) nodeClass += ' upcoming';

          return (
            <div key={stage.id} className={nodeClass}>
              <div className="node-icon-circle">
                {getStepIcon(idx, isCompleted, isActive)}
              </div>
              <span className="node-label">{stage.label}</span>
              <p className="node-desc">{stage.description}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FoodTimeline;
