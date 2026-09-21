import React from 'react';
import { Link } from 'react-router-dom';
import { FiMapPin, FiClock, FiPackage, FiArrowRight, FiShield } from 'react-icons/fi';
import UrgencyBadge from './UrgencyBadge';
import { calculateTimeRemaining } from '../utils/timeCalculator';
import { calculateMatchLevel } from '../utils/foodStatus';

const FoodCard = ({ food, showActions = true }) => {
  if (!food) return null;

  const timeRemaining = calculateTimeRemaining(food.pickupDeadline);
  const matchInfo = calculateMatchLevel(food);
  const isAvailable = food.status === 'available' && !timeRemaining.isExpired;

  return (
    <div className="food-card">
      <div className="card-image-wrapper">
        <img 
          src={food.image || 'https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&w=800&q=80'} 
          alt={food.name} 
          className="card-image"
          loading="lazy"
        />
        <div className="card-badge-top-left">
          <UrgencyBadge deadline={food.pickupDeadline} status={food.status} />
        </div>
        <div className="card-badge-top-right">
          <span className="category-pill">{food.category}</span>
        </div>
      </div>

      <div className="card-body">
        <div className="card-provider-row">
          <span className="card-provider-name">
            <FiShield style={{ color: 'var(--emerald-light)' }} />
            {food.provider}
          </span>
          <span className={`match-indicator ${matchInfo.tagClass}`} title={matchInfo.reason}>
            {matchInfo.level}
          </span>
        </div>

        <h3 className="card-title" title={food.name}>
          <Link to={`/food/${food.id}`}>{food.name}</Link>
        </h3>

        <p className="card-description">{food.description}</p>

        <div className="card-specs">
          <div className="spec-item">
            <span className="spec-label">Surplus Volume</span>
            <span className="spec-value">
              <FiPackage style={{ color: 'var(--emerald-light)' }} />
              {food.quantity} {food.unit}
            </span>
          </div>

          <div className="spec-item">
            <span className="spec-label">Pickup Window</span>
            <span className="spec-value">
              <FiClock style={{ color: 'var(--mint-accent)' }} />
              {timeRemaining.text}
            </span>
          </div>

          <div className="spec-item" style={{ gridColumn: '1 / -1' }}>
            <span className="spec-label">Location</span>
            <span className="spec-value" style={{ fontSize: '0.825rem', fontWeight: 500, color: 'var(--text-secondary)' }}>
              <FiMapPin style={{ color: 'var(--text-muted)' }} />
              {food.location}
            </span>
          </div>
        </div>

        {showActions && (
          <div className="card-footer">
            <Link 
              to={`/food/${food.id}`} 
              className="btn btn-secondary btn-sm"
              style={{ flex: 1 }}
            >
              Details
            </Link>
            
            {isAvailable ? (
              <Link 
                to={`/rescue/${food.id}`} 
                className="btn btn-primary btn-sm"
                style={{ flex: 1.2 }}
              >
                Rescue Now <FiArrowRight />
              </Link>
            ) : (
              <span 
                className="btn btn-secondary btn-sm"
                style={{ flex: 1.2, opacity: 0.6, cursor: 'not-allowed' }}
              >
                {food.status === 'reserved' ? 'Reserved' : 'Unavailable'}
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default FoodCard;
