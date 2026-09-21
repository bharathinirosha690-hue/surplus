import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  FiArrowRight, 
  FiPlusCircle, 
  FiCompass, 
  FiClock, 
  FiShield, 
  FiCheckCircle, 
  FiAward, 
  FiUsers, 
  FiTrendingUp,
  FiZap,
  FiPackage
} from 'react-icons/fi';
import FoodCard from '../components/FoodCard';
import ImpactCounter from '../components/ImpactCounter';
import LoadingState from '../components/LoadingState';
import { getFoods } from '../services/api';
import { calculateImpactStats } from '../utils/impactCalculator';

const Home = () => {
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadHomeData = async () => {
      try {
        setLoading(true);
        const data = await getFoods();
        setFoods(data || []);
      } catch (err) {
        console.error('Failed to load homepage foods:', err);
        setError('Unable to load latest surplus listings right now.');
      } finally {
        setLoading(false);
      }
    };

    loadHomeData();
  }, []);

  const stats = calculateImpactStats(foods);
  // Get urgent/available items
  const availableFoods = foods.filter(f => f.status === 'available');
  const featuredListings = availableFoods.slice(0, 3);

  return (
    <div className="home-page">
      {/* ==========================================================================
          Hero Section
          ========================================================================== */}
      <section className="hero-section" style={{
        position: 'relative',
        padding: '5rem 0 4.5rem',
        overflow: 'hidden'
      }}>
        {/* Subtle Ambient CSS Glow Elements */}
        <div style={{
          position: 'absolute',
          top: '-10%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '700px',
          height: '400px',
          background: 'radial-gradient(circle, rgba(16, 185, 129, 0.12) 0%, rgba(45, 212, 191, 0.03) 60%, transparent 80%)',
          filter: 'blur(50px)',
          pointerEvents: 'none',
          zIndex: 0
        }} />

        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ maxWidth: '820px', margin: '0 auto', textAlign: 'center' }}>
            <div className="section-tag" style={{ margin: '0 auto 1.25rem' }}>
              <FiZap /> Real-Time Food Waste Prevention
            </div>

            <h1 style={{
              fontSize: 'clamp(2.5rem, 5.5vw, 4.25rem)',
              fontWeight: 800,
              letterSpacing: '-0.03em',
              lineHeight: 1.15,
              marginBottom: '1.5rem',
              color: '#ffffff'
            }}>
              Surplus food.<br />
              <span style={{
                background: 'linear-gradient(135deg, #10b981 0%, #34d399 50%, #2dd4bf 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}>
                A better destination.
              </span>
            </h1>

            <p style={{
              fontSize: 'clamp(1.05rem, 2vw, 1.25rem)',
              color: 'var(--text-secondary)',
              lineHeight: 1.6,
              maxWidth: '680px',
              margin: '0 auto 2.5rem'
            }}>
              RePlate helps restaurants, bakeries, hostels, and caterers turn excess edible meals into immediate community meals before they go to waste.
            </p>

            <div style={{
              display: 'flex',
              gap: '1rem',
              justifyContent: 'center',
              flexWrap: 'wrap'
            }}>
              <Link to="/discover" className="btn btn-primary btn-lg">
                <FiCompass /> Explore Available Food
              </Link>
              <Link to="/add-surplus" className="btn btn-secondary btn-lg">
                <FiPlusCircle /> Share Surplus Food
              </Link>
            </div>

            {/* Quick trust metrics */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '2rem',
              marginTop: '3.5rem',
              paddingTop: '2rem',
              borderTop: '1px solid rgba(255, 255, 255, 0.07)',
              flexWrap: 'wrap'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                <FiShield style={{ color: 'var(--emerald-light)', fontSize: '1.1rem' }} />
                <span>Verified Providers</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                <FiClock style={{ color: 'var(--mint-accent)', fontSize: '1.1rem' }} />
                <span>Real-Time Deadlines</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                <FiAward style={{ color: '#fbbf24', fontSize: '1.1rem' }} />
                <span>Waste Prevention Score</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==========================================================================
          Live Impact & Prevention Score Highlight
          ========================================================================== */}
      <section className="container" style={{ marginBottom: '5rem' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '1.25rem'
        }}>
          <ImpactCounter 
            endValue={stats.totalMealsRedirected}
            suffix="+"
            label="Edible Meals Redirected"
            icon={FiPackage}
          />
          <ImpactCounter 
            endValue={stats.preventionScore}
            suffix=" pts"
            label="Platform Prevention Score"
            icon={FiAward}
          />
          <ImpactCounter 
            endValue={stats.co2PreventedKg}
            suffix=" kg"
            label="CO₂ Emissions Prevented"
            icon={FiTrendingUp}
          />
          <ImpactCounter 
            endValue={stats.activeCount}
            suffix=" lots"
            label="Active Food Lots Available"
            icon={FiClock}
          />
        </div>
      </section>

      {/* ==========================================================================
          Featured / Urgent Surplus Listings
          ========================================================================== */}
      <section className="container" style={{ marginBottom: '5.5rem' }}>
        <div style={{
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'space-between',
          marginBottom: '2rem',
          flexWrap: 'wrap',
          gap: '1rem'
        }}>
          <div>
            <div className="section-tag">
              <FiClock /> Time-Sensitive Availability
            </div>
            <h2 className="section-title">Ready for Rescue</h2>
            <p className="section-subtitle">
              High-quality surplus food with active pickup windows near you.
            </p>
          </div>
          <Link to="/discover" className="btn btn-outline">
            View All ({foods.length}) <FiArrowRight />
          </Link>
        </div>

        {loading ? (
          <LoadingState message="Fetching live surplus food items..." />
        ) : featuredListings.length > 0 ? (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
            gap: '1.75rem'
          }}>
            {featuredListings.map(food => (
              <FoodCard key={food.id} food={food} />
            ))}
          </div>
        ) : (
          <div style={{
            textAlign: 'center',
            padding: '3rem 1.5rem',
            background: 'var(--bg-card)',
            borderRadius: 'var(--radius-lg)',
            border: '1px solid var(--border-subtle)'
          }}>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '1.25rem' }}>
              All current surplus food lots have been rescued or reserved!
            </p>
            <Link to="/add-surplus" className="btn btn-primary">
              <FiPlusCircle /> Add a New Surplus Food Listing
            </Link>
          </div>
        )}
      </section>

      {/* ==========================================================================
          How RePlate Works — 4 Step Story
          ========================================================================== */}
      <section style={{
        background: 'linear-gradient(180deg, var(--bg-secondary) 0%, var(--bg-primary) 100%)',
        padding: '5rem 0',
        borderTop: '1px solid var(--border-subtle)',
        borderBottom: '1px solid var(--border-subtle)',
        marginBottom: '5rem'
      }}>
        <div className="container">
          <div className="section-header text-center">
            <div className="section-tag">
              <FiCheckCircle /> Structured Workflow
            </div>
            <h2 className="section-title">How Food Rescue Works</h2>
            <p className="section-subtitle">
              From commercial kitchen surplus to local distribution in 4 transparent stages.
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '1.5rem',
            marginTop: '3rem'
          }}>
            {[
              {
                step: '01',
                title: 'Businesses List Surplus',
                desc: 'Restaurants, bakeries, and hostels log extra portions, freshness conditions, and a strict pickup deadline.',
                icon: FiPlusCircle
              },
              {
                step: '02',
                title: 'Receivers Discover',
                desc: 'Nearby shelters, charities, and community kitchens see real-time urgency windows and match indicators.',
                icon: FiCompass
              },
              {
                step: '03',
                title: 'Time Commitment',
                desc: 'Receivers schedule a definitive pickup window (e.g. 30 mins) generating a verified handover code.',
                icon: FiClock
              },
              {
                step: '04',
                title: 'Pickup & Prevention Log',
                desc: 'Surplus is safely collected. Prevention Scores and carbon savings are logged in real-time.',
                icon: FiAward
              }
            ].map(item => {
              const Icon = item.icon;
              return (
                <div key={item.step} style={{
                  background: 'var(--bg-card)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: 'var(--radius-lg)',
                  padding: '1.75rem',
                  position: 'relative'
                }}>
                  <div style={{
                    fontSize: '0.825rem',
                    fontWeight: 800,
                    color: 'var(--emerald-light)',
                    letterSpacing: '0.05em',
                    marginBottom: '1rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                  }}>
                    <span>STEP {item.step}</span>
                    <Icon style={{ fontSize: '1.25rem', color: 'var(--text-muted)' }} />
                  </div>
                  <h3 style={{ fontSize: '1.15rem', marginBottom: '0.5rem', color: 'var(--text-primary)' }}>
                    {item.title}
                  </h3>
                  <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                    {item.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ==========================================================================
          CTA Banner
          ========================================================================== */}
      <section className="container" style={{ marginBottom: '3rem' }}>
        <div style={{
          background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.15), rgba(15, 118, 110, 0.25))',
          border: '1px solid rgba(16, 185, 129, 0.35)',
          borderRadius: 'var(--radius-xl)',
          padding: '3.5rem 2rem',
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden'
        }}>
          <h2 style={{
            fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)',
            fontWeight: 800,
            marginBottom: '1rem',
            color: '#ffffff'
          }}>
            Have surplus food prepared today?
          </h2>
          <p style={{
            color: 'var(--text-secondary)',
            maxWidth: '560px',
            margin: '0 auto 2rem',
            fontSize: '1.05rem'
          }}>
            It takes under 60 seconds to list surplus meals. Keep good food in the human food chain and boost your establishment's Waste Prevention Score.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/add-surplus" className="btn btn-primary btn-lg">
              <FiPlusCircle /> List Surplus Food
            </Link>
            <Link to="/how-it-works" className="btn btn-secondary btn-lg">
              Learn How It Works
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
