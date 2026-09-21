import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { 
  FiCheck, 
  FiClock, 
  FiMapPin, 
  FiPackage, 
  FiShield, 
  FiUser, 
  FiPhone, 
  FiFileText, 
  FiArrowRight, 
  FiArrowLeft,
  FiCheckCircle,
  FiAward
} from 'react-icons/fi';
import LoadingState from '../components/LoadingState';
import { getFoodById, updateFood, createReservation } from '../services/api';
import { formatDateTime } from '../utils/timeCalculator';

const PICKUP_TIMES = [
  { id: '15m', label: '15 Minutes', sub: 'Immediate dispatch' },
  { id: '30m', label: '30 Minutes', sub: 'Standard travel time' },
  { id: '45m', label: '45 Minutes', sub: 'Transit / van logistics' },
  { id: '60m', label: '1 Hour', sub: 'Scheduled window' }
];

const RescueFlow = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [food, setFood] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  // Workflow State
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedTime, setSelectedTime] = useState('30m');
  const [receiverName, setReceiverName] = useState('Community Food Pantry / Volunteer');
  const [contactPhone, setContactPhone] = useState('+91 98450 77123');
  const [contactPerson, setContactPerson] = useState('Ananya Sen');
  const [rescueNotes, setRescueNotes] = useState('Arriving with food-grade insulated bags.');
  const [completedReservation, setCompletedReservation] = useState(null);

  useEffect(() => {
    const fetchFood = async () => {
      try {
        setLoading(true);
        const data = await getFoodById(id);
        if (!data) {
          setError('Food item not found.');
        } else if (data.status !== 'available') {
          setError('This surplus item is currently reserved or already collected.');
        } else {
          setFood(data);
        }
      } catch (err) {
        console.error('Error fetching food for rescue:', err);
        setError('Unable to load food details.');
      } finally {
        setLoading(false);
      }
    };

    fetchFood();
  }, [id]);

  const handleConfirmRescue = async (e) => {
    e.preventDefault();
    if (!food) return;

    try {
      setSubmitting(true);
      setError(null);

      // 1. Prepare reservation payload
      const reservationData = {
        foodId: String(food.id),
        foodName: food.name,
        provider: food.provider,
        receiverName,
        contactPerson,
        phone: contactPhone,
        estimatedPickupTime: PICKUP_TIMES.find(t => t.id === selectedTime)?.label || selectedTime,
        status: 'reserved',
        pickupLocation: food.location,
        notes: rescueNotes
      };

      // 2. Create reservation via POST
      const res = await createReservation(reservationData);

      // 3. Update food status to 'reserved' via PUT (as required)
      const updatedFood = {
        ...food,
        status: 'reserved'
      };
      await updateFood(food.id, updatedFood);

      setCompletedReservation(res);
      setCurrentStep(4); // Success view
    } catch (err) {
      console.error('Failed to commit rescue:', err);
      setError('An error occurred while confirming your commitment. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="page-container container">
        <LoadingState message="Initializing rescue commitment flow..." />
      </div>
    );
  }

  if (error && !completedReservation) {
    return (
      <div className="page-container container">
        <div className="empty-state-box">
          <h2 style={{ fontSize: '1.4rem', color: 'var(--text-primary)', marginBottom: '0.75rem' }}>
            Rescue Unavailable
          </h2>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
            {error}
          </p>
          <Link to="/discover" className="btn btn-primary">
            <FiArrowLeft /> Return to Discover
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="page-container container rescue-flow-container">
      {/* Title */}
      <div className="section-header text-center" style={{ marginBottom: '2rem' }}>
        <div className="section-tag">
          <FiShield /> Rescue Commitment Process
        </div>
        <h1 className="section-title" style={{ fontSize: '2rem' }}>
          {currentStep === 4 ? 'Commitment Confirmed!' : 'Confirm Food Rescue'}
        </h1>
        <p className="section-subtitle">
          {currentStep === 4 
            ? 'Your pickup code has been generated. Please coordinate timely collection.'
            : 'Lock in this surplus batch and prevent edible food waste.'}
        </p>
      </div>

      {/* Step Indicator */}
      {currentStep < 4 && (
        <div className="step-indicator-bar">
          <div className={`step-item ${currentStep >= 1 ? 'active' : ''} ${currentStep > 1 ? 'completed' : ''}`}>
            <div className="step-bubble">
              {currentStep > 1 ? <FiCheck /> : '1'}
            </div>
            <span className="step-title">Review Surplus</span>
          </div>

          <div className={`step-item ${currentStep >= 2 ? 'active' : ''} ${currentStep > 2 ? 'completed' : ''}`}>
            <div className="step-bubble">
              {currentStep > 2 ? <FiCheck /> : '2'}
            </div>
            <span className="step-title">Select ETA</span>
          </div>

          <div className={`step-item ${currentStep >= 3 ? 'active' : ''}`}>
            <div className="step-bubble">
              3
            </div>
            <span className="step-title">Confirm & Code</span>
          </div>
        </div>
      )}

      {/* Step 1: Review Food Details */}
      {currentStep === 1 && food && (
        <div className="form-card">
          <h2 style={{ fontSize: '1.35rem', marginBottom: '1.25rem', color: 'var(--text-primary)' }}>
            Step 1: Review Surplus Food Details
          </h2>

          <div style={{
            display: 'flex',
            gap: '1.25rem',
            padding: '1.25rem',
            background: 'var(--bg-secondary)',
            borderRadius: 'var(--radius-lg)',
            border: '1px solid var(--border-subtle)',
            marginBottom: '1.5rem',
            alignItems: 'center'
          }}>
            <img 
              src={food.image || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80'} 
              alt={food.name}
              style={{ width: '90px', height: '90px', borderRadius: 'var(--radius-md)', objectFit: 'cover' }}
            />
            <div>
              <h3 style={{ fontSize: '1.15rem', color: 'var(--text-primary)', marginBottom: '0.25rem' }}>{food.name}</h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--emerald-light)', fontWeight: 600 }}>{food.provider}</p>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '0.25rem' }}>
                <strong>{food.quantity} {food.unit}</strong> • {food.category}
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', marginBottom: '2rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
              <FiMapPin style={{ color: 'var(--emerald-light)' }} />
              <span><strong>Pickup Location:</strong> {food.location}</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
              <FiClock style={{ color: 'var(--mint-accent)' }} />
              <span><strong>Must Collect Before:</strong> {formatDateTime(food.pickupDeadline)}</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
              <FiPackage style={{ color: '#fbbf24' }} />
              <span><strong>Condition:</strong> {food.condition}</span>
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Link to={`/food/${food.id}`} className="btn btn-secondary">
              <FiArrowLeft /> Back to Details
            </Link>
            <button type="button" className="btn btn-primary" onClick={() => setCurrentStep(2)}>
              Proceed to ETA <FiArrowRight />
            </button>
          </div>
        </div>
      )}

      {/* Step 2: Select Pickup ETA */}
      {currentStep === 2 && food && (
        <div className="form-card">
          <h2 style={{ fontSize: '1.35rem', marginBottom: '0.5rem', color: 'var(--text-primary)' }}>
            Step 2: Estimated Pickup Arrival Time
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
            Select how soon you or your transport volunteer will arrive at <strong>{food.provider}</strong>.
          </p>

          <div className="pickup-time-grid">
            {PICKUP_TIMES.map((slot) => (
              <div
                key={slot.id}
                className={`pickup-time-card ${selectedTime === slot.id ? 'selected' : ''}`}
                onClick={() => setSelectedTime(slot.id)}
                role="button"
                tabIndex={0}
                aria-pressed={selectedTime === slot.id}
              >
                <div className="time-val">{slot.label}</div>
                <div className="time-desc">{slot.sub}</div>
              </div>
            ))}
          </div>

          <div style={{
            background: 'rgba(16, 185, 129, 0.08)',
            border: '1px solid rgba(16, 185, 129, 0.25)',
            borderRadius: 'var(--radius-md)',
            padding: '1rem',
            fontSize: '0.85rem',
            color: 'var(--text-secondary)',
            marginBottom: '2rem'
          }}>
            <strong style={{ color: 'var(--emerald-light)' }}>Commitment Protocol:</strong> Once confirmed, the provider will package and keep the food reserved exclusively for your scheduled window.
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <button type="button" className="btn btn-secondary" onClick={() => setCurrentStep(1)}>
              <FiArrowLeft /> Back
            </button>
            <button type="button" className="btn btn-primary" onClick={() => setCurrentStep(3)}>
              Enter Receiver Info <FiArrowRight />
            </button>
          </div>
        </div>
      )}

      {/* Step 3: Receiver Info & Final Confirmation */}
      {currentStep === 3 && food && (
        <form onSubmit={handleConfirmRescue} className="form-card">
          <h2 style={{ fontSize: '1.35rem', marginBottom: '0.5rem', color: 'var(--text-primary)' }}>
            Step 3: Contact & Receiver Confirmation
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '1.75rem' }}>
            Provide pickup coordination details for the food donor.
          </p>

          <div className="form-grid" style={{ marginBottom: '1.5rem' }}>
            <div className="form-group form-grid-full">
              <label className="form-label" htmlFor="rec-name">
                <FiShield style={{ color: 'var(--emerald-light)' }} /> Organization / Receiver Name
              </label>
              <input
                id="rec-name"
                type="text"
                className="form-control"
                value={receiverName}
                onChange={(e) => setReceiverName(e.target.value)}
                required
                placeholder="e.g. Hope Community Shelter or Volunteer Driver"
              />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="rec-person">
                <FiUser style={{ color: 'var(--emerald-light)' }} /> Contact Person Name
              </label>
              <input
                id="rec-person"
                type="text"
                className="form-control"
                value={contactPerson}
                onChange={(e) => setContactPerson(e.target.value)}
                required
                placeholder="e.g. Rahul Sharma"
              />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="rec-phone">
                <FiPhone style={{ color: 'var(--emerald-light)' }} /> Contact Phone Number
              </label>
              <input
                id="rec-phone"
                type="tel"
                className="form-control"
                value={contactPhone}
                onChange={(e) => setContactPhone(e.target.value)}
                required
                placeholder="+91 98450 00000"
              />
            </div>

            <div className="form-group form-grid-full">
              <label className="form-label" htmlFor="rec-notes">
                <FiFileText style={{ color: 'var(--emerald-light)' }} /> Transport / Vehicle Notes (Optional)
              </label>
              <input
                id="rec-notes"
                type="text"
                className="form-control"
                value={rescueNotes}
                onChange={(e) => setRescueNotes(e.target.value)}
                placeholder="e.g. White delivery van, bringing cold thermal boxes"
              />
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <button type="button" className="btn btn-secondary" onClick={() => setCurrentStep(2)} disabled={submitting}>
              <FiArrowLeft /> Back
            </button>
            <button type="submit" className="btn btn-primary" disabled={submitting}>
              {submitting ? 'Confirming Reservation...' : 'Lock In Rescue Commitment'}
            </button>
          </div>
        </form>
      )}

      {/* Step 4: Success Voucher & Handover Pass */}
      {currentStep === 4 && completedReservation && food && (
        <div className="form-card" style={{ textAlign: 'center', borderColor: 'rgba(16, 185, 129, 0.4)' }}>
          <div style={{
            width: '68px',
            height: '68px',
            borderRadius: '50%',
            background: 'rgba(16, 185, 129, 0.15)',
            border: '2px solid var(--emerald-primary)',
            color: 'var(--emerald-light)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '2rem',
            margin: '0 auto 1.5rem'
          }}>
            <FiCheckCircle />
          </div>

          <span className="section-tag" style={{ marginBottom: '1rem' }}>
            <FiAward /> +20 Prevention Points Awarded
          </span>

          <h2 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#ffffff', marginBottom: '0.5rem' }}>
            Rescue Verified & Scheduled!
          </h2>

          <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', maxWidth: '520px', margin: '0 auto 2rem' }}>
            The food donor has been notified of your <strong>{completedReservation.estimatedPickupTime}</strong> ETA.
          </p>

          {/* Verification Pass Box */}
          <div style={{
            background: 'var(--bg-secondary)',
            border: '2px dashed rgba(16, 185, 129, 0.4)',
            borderRadius: 'var(--radius-lg)',
            padding: '1.75rem',
            maxWidth: '480px',
            margin: '0 auto 2rem',
            textAlign: 'left'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '0.75rem' }}>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Handover Verification Code
              </span>
              <span style={{ fontSize: '1.25rem', fontFamily: 'monospace', fontWeight: 800, color: 'var(--emerald-light)', background: 'rgba(16, 185, 129, 0.15)', padding: '0.2rem 0.6rem', borderRadius: 'var(--radius-sm)' }}>
                {completedReservation.verificationCode}
              </span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.875rem' }}>
              <div><strong>Item:</strong> {food.name} ({food.quantity} {food.unit})</div>
              <div><strong>Donor:</strong> {food.provider}</div>
              <div><strong>Pickup Location:</strong> {food.location}</div>
              <div><strong>Estimated Arrival:</strong> {completedReservation.estimatedPickupTime}</div>
              <div><strong>Receiver:</strong> {completedReservation.receiverName} ({completedReservation.contactPerson})</div>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/discover" className="btn btn-primary">
              <FiCompass /> Discover More Surplus
            </Link>
            <Link to="/impact" className="btn btn-secondary">
              View Community Impact
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default RescueFlow;
