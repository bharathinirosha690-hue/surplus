import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  FiAward, 
  FiPackage, 
  FiTrendingUp, 
  FiClock, 
  FiCheckCircle, 
  FiDroplet, 
  FiWind, 
  FiUsers, 
  FiPlusCircle,
  FiCompass,
  FiShield
} from 'react-icons/fi';
import ImpactCounter from '../components/ImpactCounter';
import LoadingState from '../components/LoadingState';
import { getFoods, getReservations } from '../services/api';
import { calculateImpactStats } from '../utils/impactCalculator';

const Impact = () => {
  const [foods, setFoods] = useState([]);
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadImpactData = async () => {
      try {
        setLoading(true);
        const [foodsData, resData] = await Promise.all([
          getFoods().catch(() => []),
          getReservations().catch(() => [])
        ]);
        setFoods(foodsData || []);
        setReservations(resData || []);
      } catch (err) {
        console.error('Error calculating platform impact:', err);
      } finally {
        setLoading(false);
      }
    };

    loadImpactData();
  }, []);

  const stats = calculateImpactStats(foods, reservations);

  return (
    <div className="page-container container">
      {/* Header */}
      <div className="section-header text-center" style={{ maxWidth: '720px', margin: '0 auto 3rem' }}>
        <div className="section-tag">
          <FiAward /> Environmental & Social Impact
        </div>
        <h1 className="section-title">Waste Prevention Metrics</h1>
        <p className="section-subtitle">
          Real-time metrics measuring food surplus diverted from landfills into local community consumption.
        </p>
      </div>

      {loading ? (
        <LoadingState message="Aggregating live platform waste prevention statistics..." />
      ) : (
        <>
          {/* Main Prevention Score Showcase */}
          <div className="prevention-score-card" style={{ marginBottom: '3.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1.5rem' }}>
              <div>
                <div className="score-badge-pill">
                  <FiAward /> Certified Prevention Score
                </div>
                <div className="score-number-display">
                  {stats.preventionScore} <span>PTS</span>
                </div>
                <p style={{ color: 'var(--text-secondary)', maxWidth: '480px', fontSize: '0.95rem' }}>
                  Our proprietary scoring model credits prompt coordination, high volume rescues, and penalized expired lots to incentivize fast redistribution.
                </p>
              </div>

              {/* Progress Summary Pill */}
              <div style={{
                background: 'rgba(11, 15, 23, 0.6)',
                border: '1px solid rgba(16, 185, 129, 0.3)',
                borderRadius: 'var(--radius-lg)',
                padding: '1.5rem',
                minWidth: '220px'
              }}>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                  Rescue Success Rate
                </div>
                <div style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--emerald-light)', margin: '0.2rem 0' }}>
                  {stats.rescueRate}%
                </div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                  Of all listed surplus collected
                </div>
              </div>
            </div>

            {/* Score Breakdown */}
            <div className="score-breakdown-grid">
              {stats.breakdown.map((item) => (
                <div key={item.label} className="score-item-box">
                  <div className="score-item-label">{item.label} ({item.count})</div>
                  <div className="score-item-value">{item.value}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Key Impact Counters Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '1.5rem',
            marginBottom: '4rem'
          }}>
            <ImpactCounter
              endValue={stats.totalMealsRedirected}
              suffix="+"
              label="Nutritious Meals Redirected"
              icon={FiPackage}
            />
            <ImpactCounter
              endValue={stats.totalRescuedWeight}
              suffix=" kg"
              label="Surplus Food Diverted from Waste"
              icon={FiTrendingUp}
            />
            <ImpactCounter
              endValue={stats.co2PreventedKg}
              suffix=" kg"
              label="CO₂e Greenhouse Emissions Avoided"
              icon={FiWind}
            />
            <ImpactCounter
              endValue={stats.waterConservedLiters}
              suffix=" L"
              label="Agricultural Water Conserved"
              icon={FiDroplet}
            />
          </div>

          {/* Environmental Equivalency Context */}
          <div style={{
            background: 'var(--bg-secondary)',
            border: '1px solid var(--border-subtle)',
            borderRadius: 'var(--radius-xl)',
            padding: '2.5rem',
            marginBottom: '4rem'
          }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '1.25rem', color: 'var(--text-primary)' }}>
              How We Calculate Environmental Equivalents
            </h2>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '2rem'
            }}>
              <div>
                <h3 style={{ fontSize: '1.1rem', color: 'var(--emerald-light)', marginBottom: '0.4rem' }}>
                  <FiWind /> Carbon Offset (~2.5 kg CO₂e / kg food)
                </h3>
                <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                  Decomposing organic food in landfills produces concentrated methane gas. By redistributing food before spoilage, methane emissions are fully eliminated.
                </p>
              </div>

              <div>
                <h3 style={{ fontSize: '1.1rem', color: 'var(--mint-accent)', marginBottom: '0.4rem' }}>
                  <FiDroplet /> Virtual Water Savings (~850 L / kg)
                </h3>
                <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                  Every kilogram of bread, dairy, or cooked meal required substantial irrigation to grow. Rescuing food honors the water embedded in its production.
                </p>
              </div>

              <div>
                <h3 style={{ fontSize: '1.1rem', color: '#fbbf24', marginBottom: '0.4rem' }}>
                  <FiShield /> Prevention Scoring Formula
                </h3>
                <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                  Food listings earn +5 pts, successful collections add +20 pts with speed bonuses (+10 pts), while unrescued expired listings incur -10 pts.
                </p>
              </div>
            </div>
          </div>

          {/* Action CTAs */}
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '1rem',
            flexWrap: 'wrap'
          }}>
            <Link to="/discover" className="btn btn-primary btn-lg">
              <FiCompass /> Discover Active Surplus
            </Link>
            <Link to="/add-surplus" className="btn btn-secondary btn-lg">
              <FiPlusCircle /> Contribute Surplus Food
            </Link>
          </div>
        </>
      )}
    </div>
  );
};

export default Impact;
