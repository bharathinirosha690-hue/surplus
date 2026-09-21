import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { 
  FiClock, 
  FiMapPin, 
  FiPackage, 
  FiShield, 
  FiCheckCircle, 
  FiArrowLeft, 
  FiArrowRight, 
  FiAlertCircle, 
  FiInfo,
  FiShare2,
  FiAward
} from 'react-icons/fi';
import UrgencyBadge from '../components/UrgencyBadge';
import FoodTimeline from '../components/FoodTimeline';
import LoadingState from '../components/LoadingState';
import { getFoodById } from '../services/api';
import { calculateTimeRemaining, formatDateTime } from '../utils/timeCalculator';
import { calculateMatchLevel } from '../utils/foodStatus';

const FoodDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [food, setFood] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getFoodById(id);
        if (!data) {
          setError('The requested surplus food listing could not be found.');
        } else {
          setFood(data);
        }
      } catch (err) {
        console.error('Error fetching food details:', err);
        setError('Could not retrieve food details. It may have been removed or expired.');
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [id]);

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  if (loading) {
    return (
      <div className="page-container container">
        <LoadingState message="Loading surplus item specifications..." />
      </div>
    );
  }

  if (error || !food) {
    return (
      <div className="page-container container">
        <div className="empty-state-box">
          <div className="empty-icon-circle" style={{ color: '#ef4444' }}>
            <FiAlertCircle />
          </div>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '0.5rem', color: 'var(--text-primary)' }}>
            Listing Not Found
          </h2>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
            {error || 'This surplus item does not exist or has already been fulfilled.'}
          </p>
          <Link to="/discover" className="btn btn-primary">
            <FiArrowLeft /> Back to Discover
          </Link>
        </div>
      </div>
    );
  }

  const timeRemaining = calculateTimeRemaining(food.pickupDeadline);
  const matchInfo = calculateMatchLevel(food);
  const isAvailable = food.status === 'available' && !timeRemaining.isExpired;

  return (
    <div className="page-container container">
      {/* Top back navigation */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.75rem' }}>
        <Link to="/discover" className="btn btn-secondary btn-sm">
          <FiArrowLeft /> Back to Discover
        </Link>
        <button type="button" onClick={handleShare} className="btn btn-secondary btn-sm">
          <FiShare2 /> {copied ? 'Link Copied!' : 'Share Listing'}
        </button>
      </div>

      {/* Main Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
        gap: '2.5rem',
        marginBottom: '3rem'
      }}>
        {/* Left Col: Media & Quick Specs */}
        <div>
          <div style={{
            position: 'relative',
            borderRadius: 'var(--radius-xl)',
            overflow: 'hidden',
            background: 'var(--bg-muted)',
            border: '1px solid var(--border-subtle)',
            boxShadow: 'var(--shadow-md)',
            marginBottom: '1.5rem'
          }}>
            <img 
              src={food.image || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80'} 
              alt={food.name}
              style={{ width: '100%', height: '380px', objectFit: 'cover' }}
            />
            <div style={{ position: 'absolute', top: '16px', left: '16px' }}>
              <UrgencyBadge deadline={food.pickupDeadline} status={food.status} />
            </div>
            <div style={{ position: 'absolute', top: '16px', right: '16px' }}>
              <span className="category-pill" style={{ background: 'rgba(11, 15, 23, 0.85)', padding: '0.4rem 0.85rem' }}>
                {food.category}
              </span>
            </div>
          </div>

          {/* Match Rationale Card */}
          <div style={{
            background: 'rgba(22, 30, 46, 0.7)',
            border: '1px solid var(--border-subtle)',
            borderRadius: 'var(--radius-lg)',
            padding: '1.25rem',
            backdropFilter: 'blur(8px)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.6rem' }}>
              <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                Smart Rescue Match
              </span>
              <span className={`match-indicator ${matchInfo.tagClass}`}>
                <FiAward /> {matchInfo.level} ({matchInfo.score}%)
              </span>
            </div>
            <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
              {matchInfo.reason}
            </p>
          </div>
        </div>

        {/* Right Col: Details & Rescue Actions */}
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--emerald-light)', fontSize: '0.875rem', fontWeight: 600, marginBottom: '0.5rem' }}>
            <FiShield /> {food.provider} {food.providerType ? `• ${food.providerType}` : ''}
          </div>

          <h1 style={{ fontSize: 'clamp(1.75rem, 3vw, 2.35rem)', fontWeight: 800, marginBottom: '1rem', color: '#ffffff' }}>
            {food.name}
          </h1>

          <p style={{ fontSize: '1rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '1.75rem' }}>
            {food.description}
          </p>

          {/* Key Metric Blocks */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
            gap: '1rem',
            marginBottom: '1.75rem'
          }}>
            <div style={{ background: 'var(--bg-card)', padding: '1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
              <span className="spec-label">Surplus Volume</span>
              <div style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-primary)', marginTop: '0.25rem', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                <FiPackage style={{ color: 'var(--emerald-light)' }} />
                {food.quantity} {food.unit}
              </div>
            </div>

            <div style={{ background: 'var(--bg-card)', padding: '1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
              <span className="spec-label">Pickup Deadline</span>
              <div style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-primary)', marginTop: '0.25rem', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                <FiClock style={{ color: 'var(--mint-accent)' }} />
                {timeRemaining.text}
              </div>
            </div>

            {food.dietary && (
              <div style={{ background: 'var(--bg-card)', padding: '1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
                <span className="spec-label">Dietary Type</span>
                <div style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-primary)', marginTop: '0.25rem' }}>
                  {food.dietary}
                </div>
              </div>
            )}
          </div>

          {/* Condition & Pickup Notes */}
          <div style={{
            background: 'var(--bg-card)',
            border: '1px solid var(--border-subtle)',
            borderRadius: 'var(--radius-lg)',
            padding: '1.25rem',
            marginBottom: '2rem'
          }}>
            <div style={{ marginBottom: '0.85rem' }}>
              <span style={{ fontSize: '0.775rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                Food Condition & Packaging
              </span>
              <p style={{ fontSize: '0.925rem', color: 'var(--text-primary)', marginTop: '0.25rem' }}>
                {food.condition || 'Freshly prepared and safely stored according to food safety guidelines.'}
              </p>
            </div>

            <div style={{ paddingTop: '0.75rem', borderTop: '1px solid var(--border-subtle)' }}>
              <span style={{ fontSize: '0.775rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                Pickup Location & Coordination
              </span>
              <p style={{ fontSize: '0.925rem', color: 'var(--text-primary)', marginTop: '0.25rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <FiMapPin style={{ color: 'var(--emerald-light)' }} />
                {food.location}
              </p>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
                Deadline: {formatDateTime(food.pickupDeadline)}
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div style={{ marginTop: 'auto' }}>
            {isAvailable ? (
              <button
                type="button"
                className="btn btn-primary btn-lg btn-block"
                onClick={() => navigate(`/rescue/${food.id}`)}
              >
                Start Rescue Commitment <FiArrowRight />
              </button>
            ) : (
              <div style={{
                textAlign: 'center',
                padding: '1rem',
                background: 'rgba(255, 255, 255, 0.04)',
                border: '1px solid var(--border-subtle)',
                borderRadius: 'var(--radius-md)',
                color: 'var(--text-muted)'
              }}>
                {food.status === 'reserved' 
                  ? '🔒 This surplus lot is currently reserved and awaiting pickup.'
                  : 'This surplus listing is no longer active.'}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Unique Feature: Rescue Lifecycle Timeline */}
      <FoodTimeline status={food.status} />
    </div>
  );
};

export default FoodDetails;
