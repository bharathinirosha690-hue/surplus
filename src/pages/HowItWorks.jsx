import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  FiLayers, 
  FiPlusCircle, 
  FiCompass, 
  FiClock, 
  FiAward, 
  FiCheckCircle, 
  FiShield, 
  FiTruck, 
  FiHeart, 
  FiArrowRight 
} from 'react-icons/fi';

const HowItWorks = () => {
  const [activeRole, setActiveRole] = useState('provider'); // 'provider' or 'receiver'

  return (
    <div className="page-container container">
      {/* Header */}
      <div className="section-header text-center" style={{ maxWidth: '720px', margin: '0 auto 3rem' }}>
        <div className="section-tag">
          <FiLayers /> Operational Architecture
        </div>
        <h1 className="section-title">How RePlate Works</h1>
        <p className="section-subtitle">
          A synchronized coordination network bridging daily commercial food surplus with immediate community receivers.
        </p>

        {/* Role Switcher */}
        <div style={{
          display: 'inline-flex',
          background: 'var(--bg-secondary)',
          padding: '0.35rem',
          borderRadius: 'var(--radius-full)',
          border: '1px solid var(--border-subtle)',
          marginTop: '1.75rem'
        }}>
          <button
            type="button"
            className={`btn btn-sm ${activeRole === 'provider' ? 'btn-primary' : 'btn-secondary'}`}
            style={{ borderRadius: 'var(--radius-full)' }}
            onClick={() => setActiveRole('provider')}
          >
            For Food Businesses & Donors
          </button>
          <button
            type="button"
            className={`btn btn-sm ${activeRole === 'receiver' ? 'btn-primary' : 'btn-secondary'}`}
            style={{ borderRadius: 'var(--radius-full)' }}
            onClick={() => setActiveRole('receiver')}
          >
            For Receivers, Shelters & Pantries
          </button>
        </div>
      </div>

      {/* Steps Flow */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '2rem',
        maxWidth: '860px',
        margin: '0 auto 4rem'
      }}>
        {activeRole === 'provider' ? (
          <>
            {/* Step 1 */}
            <div style={{
              background: 'var(--bg-card)',
              border: '1px solid var(--border-subtle)',
              borderRadius: 'var(--radius-xl)',
              padding: '2rem 2.5rem',
              display: 'flex',
              gap: '2rem',
              alignItems: 'flex-start'
            }}>
              <div style={{
                width: '52px',
                height: '52px',
                borderRadius: '50%',
                background: 'rgba(16, 185, 129, 0.15)',
                color: 'var(--emerald-light)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.5rem',
                flexShrink: 0
              }}>
                <FiPlusCircle />
              </div>
              <div>
                <span style={{ fontSize: '0.8rem', color: 'var(--emerald-light)', fontWeight: 800, textTransform: 'uppercase' }}>
                  Stage 01
                </span>
                <h3 style={{ fontSize: '1.35rem', color: 'var(--text-primary)', margin: '0.25rem 0 0.5rem' }}>
                  Log Surplus Food Lots in 60 Seconds
                </h3>
                <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6, fontSize: '0.925rem' }}>
                  When dinner service wraps or fresh morning bake batches exceed projections, enter portion counts, storage conditions, and a strict collection deadline.
                </p>
              </div>
            </div>

            {/* Step 2 */}
            <div style={{
              background: 'var(--bg-card)',
              border: '1px solid var(--border-subtle)',
              borderRadius: 'var(--radius-xl)',
              padding: '2rem 2.5rem',
              display: 'flex',
              gap: '2rem',
              alignItems: 'flex-start'
            }}>
              <div style={{
                width: '52px',
                height: '52px',
                borderRadius: '50%',
                background: 'rgba(45, 212, 191, 0.15)',
                color: 'var(--mint-accent)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.5rem',
                flexShrink: 0
              }}>
                <FiClock />
              </div>
              <div>
                <span style={{ fontSize: '0.8rem', color: 'var(--mint-accent)', fontWeight: 800, textTransform: 'uppercase' }}>
                  Stage 02
                </span>
                <h3 style={{ fontSize: '1.35rem', color: 'var(--text-primary)', margin: '0.25rem 0 0.5rem' }}>
                  Automated Urgency Badges & Local Broadcast
                </h3>
                <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6, fontSize: '0.925rem' }}>
                  The system dynamically calculates remaining safety margins. Items approaching deadlines are highlighted with “Rescue Now” priority pulsing to nearby drivers.
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div style={{
              background: 'var(--bg-card)',
              border: '1px solid var(--border-subtle)',
              borderRadius: 'var(--radius-xl)',
              padding: '2rem 2.5rem',
              display: 'flex',
              gap: '2rem',
              alignItems: 'flex-start'
            }}>
              <div style={{
                width: '52px',
                height: '52px',
                borderRadius: '50%',
                background: 'rgba(139, 92, 246, 0.15)',
                color: '#c084fc',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.5rem',
                flexShrink: 0
              }}>
                <FiTruck />
              </div>
              <div>
                <span style={{ fontSize: '0.8rem', color: '#c084fc', fontWeight: 800, textTransform: 'uppercase' }}>
                  Stage 03
                </span>
                <h3 style={{ fontSize: '1.35rem', color: 'var(--text-primary)', margin: '0.25rem 0 0.5rem' }}>
                  Committed ETA & Scheduled Handover
                </h3>
                <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6, fontSize: '0.925rem' }}>
                  A verified receiver locks in the surplus lot and states their arrival window (e.g. 30 mins). You receive receiver contact details and a unique verification code.
                </p>
              </div>
            </div>

            {/* Step 4 */}
            <div style={{
              background: 'var(--bg-card)',
              border: '1px solid var(--border-subtle)',
              borderRadius: 'var(--radius-xl)',
              padding: '2rem 2.5rem',
              display: 'flex',
              gap: '2rem',
              alignItems: 'flex-start'
            }}>
              <div style={{
                width: '52px',
                height: '52px',
                borderRadius: '50%',
                background: 'rgba(59, 130, 246, 0.15)',
                color: '#60a5fa',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.5rem',
                flexShrink: 0
              }}>
                <FiAward />
              </div>
              <div>
                <span style={{ fontSize: '0.8rem', color: '#60a5fa', fontWeight: 800, textTransform: 'uppercase' }}>
                  Stage 04
                </span>
                <h3 style={{ fontSize: '1.35rem', color: 'var(--text-primary)', margin: '0.25rem 0 0.5rem' }}>
                  Earn Prevention Points & ESG Metrics
                </h3>
                <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6, fontSize: '0.925rem' }}>
                  Verify the code upon collection. Your dashboard updates with kilograms rescued, meals served, and certified carbon offset data for sustainability reporting.
                </p>
              </div>
            </div>
          </>
        ) : (
          <>
            {/* Receiver Steps */}
            <div style={{
              background: 'var(--bg-card)',
              border: '1px solid var(--border-subtle)',
              borderRadius: 'var(--radius-xl)',
              padding: '2rem 2.5rem',
              display: 'flex',
              gap: '2rem',
              alignItems: 'flex-start'
            }}>
              <div style={{
                width: '52px',
                height: '52px',
                borderRadius: '50%',
                background: 'rgba(16, 185, 129, 0.15)',
                color: 'var(--emerald-light)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.5rem',
                flexShrink: 0
              }}>
                <FiCompass />
              </div>
              <div>
                <span style={{ fontSize: '0.8rem', color: 'var(--emerald-light)', fontWeight: 800, textTransform: 'uppercase' }}>
                  Step 01
                </span>
                <h3 style={{ fontSize: '1.35rem', color: 'var(--text-primary)', margin: '0.25rem 0 0.5rem' }}>
                  Explore Fresh Surplus by Proximity & Urgency
                </h3>
                <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6, fontSize: '0.925rem' }}>
                  Filter through cooked meals, artisan bread, or fresh produce near your shelter, student pantry, or community kitchen.
                </p>
              </div>
            </div>

            <div style={{
              background: 'var(--bg-card)',
              border: '1px solid var(--border-subtle)',
              borderRadius: 'var(--radius-xl)',
              padding: '2rem 2.5rem',
              display: 'flex',
              gap: '2rem',
              alignItems: 'flex-start'
            }}>
              <div style={{
                width: '52px',
                height: '52px',
                borderRadius: '50%',
                background: 'rgba(45, 212, 191, 0.15)',
                color: 'var(--mint-accent)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.5rem',
                flexShrink: 0
              }}>
                <FiCheckCircle />
              </div>
              <div>
                <span style={{ fontSize: '0.8rem', color: 'var(--mint-accent)', fontWeight: 800, textTransform: 'uppercase' }}>
                  Step 02
                </span>
                <h3 style={{ fontSize: '1.35rem', color: 'var(--text-primary)', margin: '0.25rem 0 0.5rem' }}>
                  Initiate Rescue Commitment Flow
                </h3>
                <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6, fontSize: '0.925rem' }}>
                  Select your estimated transit time (e.g. 30 mins) and volunteer driver details to reserve the food immediately.
                </p>
              </div>
            </div>

            <div style={{
              background: 'var(--bg-card)',
              border: '1px solid var(--border-subtle)',
              borderRadius: 'var(--radius-xl)',
              padding: '2rem 2.5rem',
              display: 'flex',
              gap: '2rem',
              alignItems: 'flex-start'
            }}>
              <div style={{
                width: '52px',
                height: '52px',
                borderRadius: '50%',
                background: 'rgba(59, 130, 246, 0.15)',
                color: '#60a5fa',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.5rem',
                flexShrink: 0
              }}>
                <FiShield />
              </div>
              <div>
                <span style={{ fontSize: '0.8rem', color: '#60a5fa', fontWeight: 800, textTransform: 'uppercase' }}>
                  Step 03
                </span>
                <h3 style={{ fontSize: '1.35rem', color: 'var(--text-primary)', margin: '0.25rem 0 0.5rem' }}>
                  Show Digital Pass & Collect Food
                </h3>
                <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6, fontSize: '0.925rem' }}>
                  Arrive at the kitchen with thermal transport bags. Present your secure verification code for a smooth, contactless handover.
                </p>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Bottom CTA */}
      <div style={{ textAlign: 'center' }}>
        <Link to={activeRole === 'provider' ? '/add-surplus' : '/discover'} className="btn btn-primary btn-lg">
          {activeRole === 'provider' ? 'Share Surplus Food' : 'Find Available Food Now'} <FiArrowRight />
        </Link>
      </div>
    </div>
  );
};

export default HowItWorks;
