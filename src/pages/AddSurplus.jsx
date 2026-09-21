import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  FiPlusCircle, 
  FiUploadCloud, 
  FiClock, 
  FiMapPin, 
  FiShield, 
  FiPackage, 
  FiCheckCircle, 
  FiAlertCircle,
  FiImage
} from 'react-icons/fi';
import { addFood } from '../services/api';

const SAMPLE_PRESET_IMAGES = [
  { name: 'Bakery & Bread', url: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80' },
  { name: 'Cooked Meals / Biryani', url: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=800&q=80' },
  { name: 'Fresh Produce / Veggies', url: 'https://images.unsplash.com/photo-1610348725531-843dff563e2c?auto=format&fit=crop&w=800&q=80' },
  { name: 'Mezze / Salads', url: 'https://images.unsplash.com/photo-1541518763669-27fef04b14ea?auto=format&fit=crop&w=800&q=80' },
  { name: 'Juices & Smoothies', url: 'https://images.unsplash.com/photo-1613478223719-2ab802602423?auto=format&fit=crop&w=800&q=80' }
];

const AddSurplus = () => {
  const navigate = useNavigate();

  // Helper to get default deadline (e.g. 4 hours from now in YYYY-MM-DDTHH:mm format)
  const getDefaultDeadline = () => {
    const d = new Date();
    d.setHours(d.getHours() + 4);
    d.setMinutes(0);
    return d.toISOString().slice(0, 16);
  };

  const [formData, setFormData] = useState({
    name: '',
    category: 'Meals',
    description: '',
    quantity: '',
    unit: 'portions',
    provider: '',
    providerType: 'Restaurant',
    location: '',
    pickupDeadline: getDefaultDeadline(),
    condition: 'Freshly prepared and packed in thermal insulated containers',
    image: SAMPLE_PRESET_IMAGES[1].url,
    dietary: 'Vegetarian',
    estimatedWeightKg: ''
  });

  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);

  const validateForm = () => {
    const errs = {};
    if (!formData.name.trim()) errs.name = 'Food name is required.';
    if (!formData.description.trim()) errs.description = 'Please describe the surplus items.';
    if (!formData.quantity || Number(formData.quantity) <= 0) errs.quantity = 'Provide a valid positive quantity.';
    if (!formData.provider.trim()) errs.provider = 'Provider or business name is required.';
    if (!formData.location.trim()) errs.location = 'Pickup address is required.';
    if (!formData.pickupDeadline) errs.pickupDeadline = 'Pickup deadline is required.';
    if (!formData.condition.trim()) errs.condition = 'Specify food temperature / storage condition.';
    
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

      const payload = {
        ...formData,
        quantity: Number(formData.quantity),
        estimatedWeightKg: formData.estimatedWeightKg ? Number(formData.estimatedWeightKg) : (Number(formData.quantity) * 0.4),
        status: 'available',
        createdAt: new Date().toISOString()
      };

      await addFood(payload);
      navigate('/my-listings', { state: { message: 'Surplus food listing published successfully!' } });
    } catch (err) {
      console.error('Error listing surplus food:', err);
      setSubmitError('Failed to publish food listing. Please check your data and retry.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="page-container container">
      {/* Header */}
      <div className="section-header text-center" style={{ maxWidth: '640px', margin: '0 auto 2.5rem' }}>
        <div className="section-tag">
          <FiUploadCloud /> Food Rescue Registration
        </div>
        <h1 className="section-title">List Surplus Food</h1>
        <p className="section-subtitle">
          Connect your excess prepared meals, bakery batches, or produce with community receivers before it spoils.
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
            <label className="form-label" htmlFor="name">
              Food Item Title *
            </label>
            <input
              id="name"
              name="name"
              type="text"
              className="form-control"
              placeholder="e.g. Artisanal Sourdough & Croissants or Vegetable Pulao"
              value={formData.name}
              onChange={handleChange}
            />
            {errors.name && <span className="form-error-msg">{errors.name}</span>}
          </div>

          {/* Category */}
          <div className="form-group">
            <label className="form-label" htmlFor="category">
              Food Category *
            </label>
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

          {/* Dietary */}
          <div className="form-group">
            <label className="form-label" htmlFor="dietary">
              Dietary Specification
            </label>
            <select
              id="dietary"
              name="dietary"
              className="form-control filter-select"
              value={formData.dietary}
              onChange={handleChange}
            >
              <option value="Vegetarian">Vegetarian</option>
              <option value="Vegan">Vegan</option>
              <option value="Halal">Halal</option>
              <option value="Non-Veg">Non-Vegetarian</option>
              <option value="Gluten-Free">Gluten-Free</option>
            </select>
          </div>

          {/* Description */}
          <div className="form-group form-grid-full">
            <label className="form-label" htmlFor="description">
              Item Details & Ingredients *
            </label>
            <textarea
              id="description"
              name="description"
              rows={3}
              className="form-control"
              placeholder="Explain how it was prepared, packaged, and stored..."
              value={formData.description}
              onChange={handleChange}
            />
            {errors.description && <span className="form-error-msg">{errors.description}</span>}
          </div>

          {/* Quantity */}
          <div className="form-group">
            <label className="form-label" htmlFor="quantity">
              Quantity / Volume *
            </label>
            <input
              id="quantity"
              name="quantity"
              type="number"
              min="1"
              className="form-control"
              placeholder="e.g. 25"
              value={formData.quantity}
              onChange={handleChange}
            />
            {errors.quantity && <span className="form-error-msg">{errors.quantity}</span>}
          </div>

          {/* Unit */}
          <div className="form-group">
            <label className="form-label" htmlFor="unit">
              Unit Type *
            </label>
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

          {/* Provider Name */}
          <div className="form-group">
            <label className="form-label" htmlFor="provider">
              <FiShield style={{ color: 'var(--emerald-light)' }} /> Business / Establishment Name *
            </label>
            <input
              id="provider"
              name="provider"
              type="text"
              className="form-control"
              placeholder="e.g. Green Leaf Bistro"
              value={formData.provider}
              onChange={handleChange}
            />
            {errors.provider && <span className="form-error-msg">{errors.provider}</span>}
          </div>

          {/* Provider Type */}
          <div className="form-group">
            <label className="form-label" htmlFor="providerType">
              Provider Classification
            </label>
            <select
              id="providerType"
              name="providerType"
              className="form-control filter-select"
              value={formData.providerType}
              onChange={handleChange}
            >
              <option value="Restaurant">Restaurant</option>
              <option value="Bakery">Bakery</option>
              <option value="Hostel">Hostel / Campus Mess</option>
              <option value="Caterer">Caterer / Banquet</option>
              <option value="Grocery Store">Grocery Store</option>
              <option value="Cafe">Cafe</option>
            </select>
          </div>

          {/* Location */}
          <div className="form-group form-grid-full">
            <label className="form-label" htmlFor="location">
              <FiMapPin style={{ color: 'var(--emerald-light)' }} /> Pickup Address & Landmark *
            </label>
            <input
              id="location"
              name="location"
              type="text"
              className="form-control"
              placeholder="e.g. 100ft Road, Indiranagar, Bangalore"
              value={formData.location}
              onChange={handleChange}
            />
            {errors.location && <span className="form-error-msg">{errors.location}</span>}
          </div>

          {/* Pickup Deadline */}
          <div className="form-group">
            <label className="form-label" htmlFor="pickupDeadline">
              <FiClock style={{ color: 'var(--mint-accent)' }} /> Pickup Deadline (Must collect before) *
            </label>
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
            <label className="form-label" htmlFor="condition">
              <FiPackage style={{ color: '#fbbf24' }} /> Storage Condition & Packaging *
            </label>
            <input
              id="condition"
              name="condition"
              type="text"
              className="form-control"
              placeholder="e.g. Chilled at 4°C, sealed in containers"
              value={formData.condition}
              onChange={handleChange}
            />
            {errors.condition && <span className="form-error-msg">{errors.condition}</span>}
          </div>

          {/* Image Presets & Input */}
          <div className="form-group form-grid-full">
            <label className="form-label" htmlFor="image">
              <FiImage style={{ color: 'var(--emerald-light)' }} /> Listing Image URL
            </label>
            <input
              id="image"
              name="image"
              type="url"
              className="form-control"
              placeholder="https://..."
              value={formData.image}
              onChange={handleChange}
            />
            <span className="form-help-text" style={{ marginTop: '0.4rem' }}>
              Select a quick preset image or paste a custom photo URL:
            </span>

            {/* Quick preset selector */}
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginTop: '0.5rem' }}>
              {SAMPLE_PRESET_IMAGES.map((preset) => (
                <button
                  key={preset.name}
                  type="button"
                  className={`btn btn-secondary btn-sm ${formData.image === preset.url ? 'btn-outline' : ''}`}
                  onClick={() => setFormData(prev => ({ ...prev, image: preset.url }))}
                >
                  {preset.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Submit */}
        <div style={{ marginTop: '2.5rem', paddingTop: '1.5rem', borderTop: '1px solid var(--border-subtle)', display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => navigate(-1)}
            disabled={submitting}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="btn btn-primary btn-lg"
            disabled={submitting}
          >
            <FiPlusCircle /> {submitting ? 'Publishing Listing...' : 'Publish Surplus Food Listing'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddSurplus;
