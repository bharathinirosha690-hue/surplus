import React from 'react';
import { Link } from 'react-router-dom';
import { 
  FiInfo, 
  FiShield, 
  FiTarget, 
  FiTrendingUp, 
  FiGlobe, 
  FiHeart, 
  FiCheckCircle, 
  FiCompass, 
  FiPlusCircle 
} from 'react-icons/fi';

const About = () => {
  return (
    <div className="page-container container">
      {/* Header */}
      <div className="section-header text-center" style={{ maxWidth: '720px', margin: '0 auto 3.5rem' }}>
        <div className="section-tag">
          <FiInfo /> About RePlate
        </div>
        <h1 className="section-title">Good Food Deserves a Second Destination.</h1>
        <p className="section-subtitle">
          Over 30% of edible food in urban centers is discarded simply due to timing and logistical disconnection. RePlate solves this with synchronized real-time redistribution.
        </p>
      </div>

      {/* Core Mission Cards */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
        gap: '1.75rem',
        marginBottom: '4rem'
      }}>
        <div style={{
          background: 'var(--bg-card)',
          border: '1px solid var(--border-subtle)',
          borderRadius: 'var(--radius-xl)',
          padding: '2rem'
        }}>
          <div style={{
            width: '46px',
            height: '46px',
            borderRadius: 'var(--radius-md)',
            background: 'rgba(16, 185, 129, 0.15)',
            color: 'var(--emerald-light)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1.35rem',
            marginBottom: '1.25rem'
          }}>
            <FiTarget />
          </div>
          <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem', color: 'var(--text-primary)' }}>
            Eliminating Avoidable Waste
          </h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.6 }}>
            Surplus food is not waste; it is high-quality nutrition waiting for a faster channel. We prioritize time-sensitive listings before freshness windows expire.
          </p>
        </div>

        <div style={{
          background: 'var(--bg-card)',
          border: '1px solid var(--border-subtle)',
          borderRadius: 'var(--radius-xl)',
          padding: '2rem'
        }}>
          <div style={{
            width: '46px',
            height: '46px',
            borderRadius: 'var(--radius-md)',
            background: 'rgba(45, 212, 191, 0.15)',
            color: 'var(--mint-accent)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1.35rem',
            marginBottom: '1.25rem'
          }}>
            <FiGlobe />
          </div>
          <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem', color: 'var(--text-primary)' }}>
            Hyperlocal Visibility
          </h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.6 }}>
            Making surplus food instantly discoverable across neighborhood boundaries, matching capacity between donors and nearby verified community pantries.
          </p>
        </div>

        <div style={{
          background: 'var(--bg-card)',
          border: '1px solid var(--border-subtle)',
          borderRadius: 'var(--radius-xl)',
          padding: '2rem'
        }}>
          <div style={{
            width: '46px',
            height: '46px',
            borderRadius: 'var(--radius-md)',
            background: 'rgba(139, 92, 246, 0.15)',
            color: '#c084fc',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1.35rem',
            marginBottom: '1.25rem'
          }}>
            <FiTrendingUp />
          </div>
          <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem', color: 'var(--text-primary)' }}>
            Data-Driven Prevention
          </h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.6 }}>
            Our Prevention Score motivates consistent, rapid logistics while providing corporate food services with verifiable carbon offset and ESG data.
          </p>
        </div>
      </div>

      {/* Trust & Food Safety Guidelines */}
      <div style={{
        background: 'var(--bg-secondary)',
        border: '1px solid var(--border-subtle)',
        borderRadius: 'var(--radius-xl)',
        padding: '2.5rem',
        marginBottom: '4rem'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
          <FiShield style={{ color: 'var(--emerald-light)', fontSize: '1.5rem' }} />
          <h2 style={{ fontSize: '1.45rem', fontWeight: 700, color: '#ffffff' }}>
            Food Safety & Integrity Standards
          </h2>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: '1.5rem',
          marginTop: '1.5rem'
        }}>
          <div style={{ display: 'flex', gap: '0.75rem' }}>
            <FiCheckCircle style={{ color: 'var(--emerald-light)', flexShrink: 0, marginTop: '0.2rem' }} />
            <div>
              <h4 style={{ color: 'var(--text-primary)', fontSize: '0.95rem', marginBottom: '0.25rem' }}>Strict Temperature Logging</h4>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>Food items specify hot-holding or cold-chilled status upon listing.</p>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '0.75rem' }}>
            <FiCheckCircle style={{ color: 'var(--emerald-light)', flexShrink: 0, marginTop: '0.2rem' }} />
            <div>
              <h4 style={{ color: 'var(--text-primary)', fontSize: '0.95rem', marginBottom: '0.25rem' }}>Tamper-Evident Packaging</h4>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>All listed food lots must be packaged in food-grade sealed containers.</p>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '0.75rem' }}>
            <FiCheckCircle style={{ color: 'var(--emerald-light)', flexShrink: 0, marginTop: '0.2rem' }} />
            <div>
              <h4 style={{ color: 'var(--text-primary)', fontSize: '0.95rem', marginBottom: '0.25rem' }}>Verified Pickup Pass</h4>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>Receivers authenticate handover via unique cryptographic verification codes.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom CTA */}
      <div style={{ textAlign: 'center' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '1rem', color: '#ffffff' }}>
          Ready to join the waste-prevention movement?
        </h2>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link to="/discover" className="btn btn-primary btn-lg">
            <FiCompass /> Discover Surplus Food
          </Link>
          <Link to="/add-surplus" className="btn btn-secondary btn-lg">
            <FiPlusCircle /> Share Surplus Food
          </Link>
        </div>
      </div>
    </div>
  );
};

export default About;
