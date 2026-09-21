import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { 
  FiEdit, 
  FiClock, 
  FiMapPin, 
  FiShield, 
  FiPackage, 
  FiArrowLeft,
  FiAlertCircle,
  FiSave
} from 'react-icons/fi';
import LoadingState from '../components/LoadingState';
import { getFoodById, updateFood } from '../services/api';

const EditSurplus = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    category: 'Meals',
    description: '',
    quantity: '',
    unit: 'portions',
    provider: '',
    providerType: 'Restaurant',
    location: '',
    pickupDeadline: '',
    condition: '',
    image: '',
    dietary: 'Vegetarian',
    status: 'available'
  });

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const [submitError, setSubmitError] = useState(null);

  useEffect(() => {
    const fetchExisting = async () => {
      try {
        setLoading(true);
        const data = await getFoodById(id);
        if (data) {
          // Format deadline to datetime-local format if needed
          let formattedDeadline = data.pickupDeadline || '';
          if (formattedDeadline.length > 16) {
            formattedDeadline = formattedDeadline.slice(0, 16);
          }

          setFormData({
            name: data.name || '',
            category: data.category || 'Meals',
            description: data.description || '',
            quantity: data.quantity || '',
            unit: data.unit || 'portions',
            provider: data.provider || '',
            providerType: data.providerType || 'Restaurant',
            location: data.location || '',
            pickupDeadline: formattedDeadline,
            condition: data.condition || '',
            image: data.image || '',
            dietary: data.dietary || 'Vegetarian',
            status: data.status || 'available',
            createdAt: data.createdAt,
            estimatedWeightKg: data.estimatedWeightKg
          });
        }
      } catch (err) {
        console.error('Error fetching food for edit:', err);
        setSubmitError('Unable to load listing details.');
      } finally {
        setLoading(false);
      }
    };

    fetchExisting();
  }, [id]);

  const validateForm = () => {
    const errs = {};
    if (!formData.name.trim()) errs.name = 'Food item name is required.';
    if (!formData.description.trim()) errs.description = 'Please describe the surplus items.';
    if (!formData.quantity || Number(formData.quantity) <= 0) errs.quantity = 'Provide a valid quantity.';
    if (!formData.provider.trim()) errs.provider = 'Business name is required.';
    if (!formData.location.trim()) errs.location = 'Pickup address is required.';
    if (!formData.pickupDeadline) errs.pickupDeadline = 'Pickup deadline is required.';

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      setSubmitting(true);
      setSubmitError(null);

      const updatedPayload = {
        ...formData,
        id: String(id),
        quantity: Number(formData.quantity),
        estimatedWeightKg: formData.estimatedWeightKg ? Number(formData.estimatedWeightKg) : (Number(formData.quantity) * 0.4)
      };

      // Strict PUT request
      await updateFood(id, updatedPayload);
      navigate('/my-listings', { state: { message: 'Listing updated successfully!' } });
    } catch (err) {
      console.error('Failed to update food listing:', err);
      setSubmitError('Failed to save updates. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="page-container container">
        <LoadingState message="Loading listing data for editing..." />
      </div>
    );
  }

  return (
    <div className="page-container container">
      {/* Header */}
      <div className="section-header text-center" style={{ maxWidth: '640px', margin: '0 auto 2.5rem' }}>
        <div className="section-tag">
          <FiEdit /> Listing Editor
        </div>
        <h1 className="section-title">Edit Surplus Food</h1>
        <p className="section-subtitle">
          Update availability, portion counts, or pickup time windows.
        </p>
      </div>

      {submitError && (
        <div style={{
          maxWidth: '800px',
          margin: '0 auto 1.5rem',
          padding: '1rem',
          background: 'rgba(239, 68, 68, 0.15)',
          border: '1px solid rgba(239, 68, 68, 0.4)',
          borderRadius: 'var(--radius-md)',
          color: '#f87171',
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem'
        }}>
          <FiAlertCircle />
          <span>{submitError}</span>
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} className="form-card" noValidate>
        <div className="form-grid">
          {/* Food Name */}
          <div className="form-group form-grid-full">
            <label className="form-label" htmlFor="name">Food Title *</label>
            <input
              id="name"
              name="name"
              type="text"
              className="form-control"
              value={formData.name}
              onChange={handleChange}
            />
            {errors.name && <span className="form-error-msg">{errors.name}</span>}
          </div>

          {/* Status Override */}
          <div className="form-group">
            <label className="form-label" htmlFor="status">Current Status</label>
            <select
              id="status"
              name="status"
              className="form-control filter-select"
              value={formData.status}
              onChange={handleChange}
            >
              <option value="available">Available</option>
              <option value="reserved">Reserved</option>
              <option value="collected">Collected / Handed Over</option>
            </select>
          </div>

          {/* Category */}
          <div className="form-group">
            <label className="form-label" htmlFor="category">Food Category *</label>
            <select
              id="category"
              name="category"
              className="form-control filter-select"
              value={formData.category}
              onChange={handleChange}
            >
              <option value="Meals">Prepared Meals</option>
              <option value="Bakery">Bakery & Breads</option>
              <option value="Produce">Raw Produce & Fruits</option>
              <option value="Prepared">Deli / Finger Foods</option>
              <option value="Beverages">Cold Juices / Beverages</option>
              <option value="Dairy">Dairy & Cheese</option>
            </select>
          </div>

          {/* Description */}
          <div className="form-group form-grid-full">
            <label className="form-label" htmlFor="description">Description *</label>
            <textarea
              id="description"
              name="description"
              rows={3}
              className="form-control"
              value={formData.description}
              onChange={handleChange}
            />
            {errors.description && <span className="form-error-msg">{errors.description}</span>}
          </div>

          {/* Quantity */}
          <div className="form-group">
            <label className="form-label" htmlFor="quantity">Quantity *</label>
            <input
              id="quantity"
              name="quantity"
              type="number"
              min="1"
              className="form-control"
              value={formData.quantity}
              onChange={handleChange}
            />
            {errors.quantity && <span className="form-error-msg">{errors.quantity}</span>}
          </div>

          {/* Unit */}
          <div className="form-group">
            <label className="form-label" htmlFor="unit">Unit *</label>
            <select
              id="unit"
              name="unit"
              className="form-control filter-select"
              value={formData.unit}
              onChange={handleChange}
            >
              <option value="portions">Portions / Meals</option>
              <option value="kg">Kilograms (kg)</option>
              <option value="items">Items / Loaves</option>
              <option value="packs">Packs / Platters</option>
              <option value="boxes">Boxes</option>
              <option value="bottles">Bottles</option>
            </select>
          </div>

          {/* Provider */}
          <div className="form-group">
            <label className="form-label" htmlFor="provider">Provider Business Name *</label>
            <input
              id="provider"
              name="provider"
              type="text"
              className="form-control"
              value={formData.provider}
              onChange={handleChange}
            />
            {errors.provider && <span className="form-error-msg">{errors.provider}</span>}
          </div>

          {/* Location */}
          <div className="form-group">
            <label className="form-label" htmlFor="location">Pickup Location *</label>
            <input
              id="location"
              name="location"
              type="text"
              className="form-control"
              value={formData.location}
              onChange={handleChange}
            />
            {errors.location && <span className="form-error-msg">{errors.location}</span>}
          </div>

          {/* Deadline */}
          <div className="form-group">
            <label className="form-label" htmlFor="pickupDeadline">Pickup Deadline *</label>
            <input
              id="pickupDeadline"
              name="pickupDeadline"
              type="datetime-local"
              className="form-control"
              value={formData.pickupDeadline}
              onChange={handleChange}
            />
            {errors.pickupDeadline && <span className="form-error-msg">{errors.pickupDeadline}</span>}
          </div>

          {/* Condition */}
          <div className="form-group">
            <label className="form-label" htmlFor="condition">Storage & Packaging Condition</label>
            <input
              id="condition"
              name="condition"
              type="text"
              className="form-control"
              value={formData.condition}
              onChange={handleChange}
            />
          </div>

          {/* Image */}
          <div className="form-group form-grid-full">
            <label className="form-label" htmlFor="image">Image URL</label>
            <input
              id="image"
              name="image"
              type="url"
              className="form-control"
              value={formData.image}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div style={{ marginTop: '2.5rem', paddingTop: '1.5rem', borderTop: '1px solid var(--border-subtle)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Link to="/my-listings" className="btn btn-secondary">
            <FiArrowLeft /> Back to My Listings
          </Link>
          <button
            type="submit"
            className="btn btn-primary btn-lg"
            disabled={submitting}
          >
            <FiSave /> {submitting ? 'Saving Changes...' : 'Save & Update Listing'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditSurplus;
