import React, { useState, useEffect, useMemo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  FiList, 
  FiPlusCircle, 
  FiEdit, 
  FiTrash2, 
  FiCheckCircle, 
  FiClock, 
  FiAward, 
  FiPackage, 
  FiMapPin, 
  FiSearch,
  FiFilter,
  FiExternalLink
} from 'react-icons/fi';
import UrgencyBadge from '../components/UrgencyBadge';
import ConfirmModal from '../components/ConfirmModal';
import LoadingState from '../components/LoadingState';
import EmptyState from '../components/EmptyState';
import { getFoods, deleteFood, updateFood } from '../services/api';
import { calculateImpactStats } from '../utils/impactCalculator';
import { calculateTimeRemaining, formatDateTime } from '../utils/timeCalculator';

const MyListings = () => {
  const location = useLocation();
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [feedbackMsg, setFeedbackMsg] = useState(location.state?.message || null);

  // Search & Filter
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [sortBy, setSortBy] = useState('newest');

  // Delete modal state
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const fetchListings = async () => {
    try {
      setLoading(true);
      const data = await getFoods();
      setFoods(data || []);
    } catch (err) {
      console.error('Error loading provider listings:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchListings();
  }, []);

  // Clear feedback msg after 4s
  useEffect(() => {
    if (feedbackMsg) {
      const timer = setTimeout(() => setFeedbackMsg(null), 4000);
      return () => clearTimeout(timer);
    }
  }, [feedbackMsg]);

  // Handle Delete
  const handleConfirmDelete = async () => {
    if (!deleteTarget) return;

    try {
      setIsDeleting(true);
      await deleteFood(deleteTarget.id);
      setFoods(prev => prev.filter(item => String(item.id) !== String(deleteTarget.id)));
      setFeedbackMsg(`Successfully deleted listing "${deleteTarget.name}".`);
      setDeleteTarget(null);
    } catch (err) {
      console.error('Failed to delete listing:', err);
      alert('Failed to delete listing. Please try again.');
    } finally {
      setIsDeleting(false);
    }
  };

  // Quick Action: Mark as Collected
  const handleMarkCollected = async (food) => {
    try {
      const updated = { ...food, status: 'collected' };
      await updateFood(food.id, updated);
      setFoods(prev => prev.map(item => String(item.id) === String(food.id) ? updated : item));
      setFeedbackMsg(`"${food.name}" marked as safely collected! +20 Prevention Points logged.`);
    } catch (err) {
      console.error('Error marking as collected:', err);
    }
  };

  // Stats calculation
  const stats = calculateImpactStats(foods);

  // Filtered & Sorted Listings
  const filteredListings = useMemo(() => {
    return foods
      .filter(item => {
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchName = item.name?.toLowerCase().includes(q);
          const matchProvider = item.provider?.toLowerCase().includes(q);
          if (!matchName && !matchProvider) return false;
        }
        if (selectedCategory !== 'All' && item.category !== selectedCategory) {
          return false;
        }
        if (selectedStatus !== 'all' && item.status !== selectedStatus) {
          return false;
        }
        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'urgency') {
          return new Date(a.pickupDeadline).getTime() - new Date(b.pickupDeadline).getTime();
        }
        if (sortBy === 'quantity') {
          return (Number(b.quantity) || 0) - (Number(a.quantity) || 0);
        }
        if (sortBy === 'newest') {
          return new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime();
        }
        return 0;
      });
  }, [foods, searchQuery, selectedCategory, selectedStatus, sortBy]);

  return (
    <div className="page-container container">
      {/* Toast Notification */}
      {feedbackMsg && (
        <div style={{
          padding: '1rem 1.5rem',
          background: 'rgba(16, 185, 129, 0.15)',
          border: '1px solid rgba(16, 185, 129, 0.4)',
          borderRadius: 'var(--radius-md)',
          color: 'var(--emerald-light)',
          marginBottom: '1.5rem',
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem',
          animation: 'fadeIn 0.2s ease'
        }}>
          <FiCheckCircle style={{ fontSize: '1.2rem' }} />
          <span>{feedbackMsg}</span>
        </div>
      )}

      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1.25rem', marginBottom: '2.5rem' }}>
        <div>
          <div className="section-tag">
            <FiList /> Provider Operations
          </div>
          <h1 className="section-title">My Surplus Food Listings</h1>
          <p className="section-subtitle">
            Manage your food donations, monitor pickup countdowns, and track rescue handovers.
          </p>
        </div>

        <Link to="/add-surplus" className="btn btn-primary btn-lg">
          <FiPlusCircle /> Add New Surplus Listing
        </Link>
      </div>

      {/* Provider Prevention Score Banner */}
      <div style={{
        background: 'linear-gradient(135deg, rgba(22, 30, 46, 0.95), rgba(16, 24, 38, 0.85))',
        border: '1px solid rgba(16, 185, 129, 0.25)',
        borderRadius: 'var(--radius-lg)',
        padding: '1.5rem',
        marginBottom: '2.5rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '1.5rem'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
          <div style={{
            width: '54px',
            height: '54px',
            borderRadius: 'var(--radius-md)',
            background: 'rgba(16, 185, 129, 0.15)',
            color: 'var(--emerald-light)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1.75rem'
          }}>
            <FiAward />
          </div>
          <div>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              Your Prevention Score
            </span>
            <div style={{ fontSize: '1.85rem', fontWeight: 800, color: '#ffffff' }}>
              {stats.preventionScore} <span style={{ fontSize: '1rem', color: 'var(--emerald-light)', fontWeight: 600 }}>pts</span>
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
          <div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Total Listings</div>
            <div style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-primary)' }}>{stats.totalListings}</div>
          </div>
          <div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Rescued / Reserved</div>
            <div style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--emerald-light)' }}>{stats.rescuedCount}</div>
          </div>
          <div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Active Right Now</div>
            <div style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--mint-accent)' }}>{stats.activeCount}</div>
          </div>
        </div>
      </div>

      {/* Search & Filter Toolbar */}
      <div style={{
        background: 'var(--bg-card)',
        border: '1px solid var(--border-subtle)',
        borderRadius: 'var(--radius-lg)',
        padding: '1.25rem',
        marginBottom: '2rem',
        display: 'flex',
        gap: '1rem',
        flexWrap: 'wrap',
        alignItems: 'center'
      }}>
        <div style={{ position: 'relative', flex: 1, minWidth: '240px' }}>
          <FiSearch style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
          <input
            type="text"
            className="search-input"
            placeholder="Search your food listings..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <select
          className="filter-select"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="All">All Categories</option>
          <option value="Meals">Meals</option>
          <option value="Bakery">Bakery</option>
          <option value="Produce">Produce</option>
          <option value="Prepared">Prepared</option>
          <option value="Beverages">Beverages</option>
          <option value="Dairy">Dairy</option>
        </select>

        <select
          className="filter-select"
          value={selectedStatus}
          onChange={(e) => setSelectedStatus(e.target.value)}
        >
          <option value="all">All Statuses</option>
          <option value="available">Available</option>
          <option value="reserved">Reserved</option>
          <option value="collected">Collected</option>
        </select>

        <select
          className="filter-select"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value="newest">Newest First</option>
          <option value="urgency">Most Urgent</option>
          <option value="quantity">Highest Quantity</option>
        </select>
      </div>

      {/* Listing Cards / Table */}
      {loading ? (
        <LoadingState message="Loading your listings inventory..." />
      ) : filteredListings.length > 0 ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {filteredListings.map((food) => {
            const timeRemaining = calculateTimeRemaining(food.pickupDeadline);

            return (
              <div 
                key={food.id}
                style={{
                  background: 'var(--bg-card)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: 'var(--radius-lg)',
                  padding: '1.25rem 1.5rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  flexWrap: 'wrap',
                  gap: '1.25rem',
                  transition: 'border-color var(--transition-fast)'
                }}
              >
                {/* Image & Main Info */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', flex: '1 1 300px' }}>
                  <img
                    src={food.image || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80'}
                    alt={food.name}
                    style={{ width: '80px', height: '80px', borderRadius: 'var(--radius-md)', objectFit: 'cover', flexShrink: 0 }}
                  />
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.35rem', flexWrap: 'wrap' }}>
                      <UrgencyBadge deadline={food.pickupDeadline} status={food.status} />
                      <span className="category-pill">{food.category}</span>
                    </div>

                    <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.25rem' }}>
                      <Link to={`/food/${food.id}`} style={{ color: 'inherit' }}>{food.name}</Link>
                    </h3>

                    <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
                      <span><strong>{food.quantity} {food.unit}</strong></span>
                      <span>•</span>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                        <FiClock style={{ color: 'var(--mint-accent)' }} /> {timeRemaining.text}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Status & Actions */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
                  {food.status === 'reserved' && (
                    <button
                      type="button"
                      className="btn btn-outline btn-sm"
                      onClick={() => handleMarkCollected(food)}
                      title="Mark as successfully collected"
                    >
                      <FiCheckCircle /> Mark Collected
                    </button>
                  )}

                  <Link 
                    to={`/food/${food.id}`} 
                    className="btn btn-secondary btn-sm"
                    title="View public food details"
                  >
                    <FiExternalLink /> View
                  </Link>

                  <Link 
                    to={`/edit-food/${food.id}`} 
                    className="btn btn-secondary btn-sm"
                    title="Edit listing details"
                  >
                    <FiEdit /> Edit
                  </Link>

                  <button
                    type="button"
                    className="btn btn-danger btn-sm"
                    onClick={() => setDeleteTarget(food)}
                    title="Delete listing"
                  >
                    <FiTrash2 /> Delete
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <EmptyState
          title="No food listings found"
          message="You haven't listed any surplus food matching the selected criteria."
          actionLabel="Add a Surplus Listing"
          actionLink="/add-surplus"
          icon={FiPackage}
        />
      )}

      {/* Custom Confirmation Modal for Deleting (No browser default confirm!) */}
      <ConfirmModal
        isOpen={Boolean(deleteTarget)}
        title="Delete Surplus Food Listing"
        message={deleteTarget ? `Are you sure you want to delete "${deleteTarget.name}"? This will remove the listing from the live rescue discovery map.` : ''}
        confirmText="Yes, Delete Listing"
        cancelText="Keep Listing"
        onConfirm={handleConfirmDelete}
        onCancel={() => setDeleteTarget(null)}
        isDangerous={true}
        isLoading={isDeleting}
      />
    </div>
  );
};

export default MyListings;
