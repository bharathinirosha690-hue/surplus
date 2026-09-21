import React, { useState, useEffect, useMemo } from 'react';
import { FiCompass, FiRefreshCw, FiAlertCircle } from 'react-icons/fi';
import FoodCard from '../components/FoodCard';
import SearchFilter from '../components/SearchFilter';
import LoadingState from '../components/LoadingState';
import EmptyState from '../components/EmptyState';
import { getFoods } from '../services/api';
import { getUrgencyLevel, calculateTimeRemaining } from '../utils/timeCalculator';

const DiscoverFood = () => {
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Search & Filter States
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedUrgency, setSelectedUrgency] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [sortBy, setSortBy] = useState('urgency');

  const fetchFoodListings = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getFoods();
      setFoods(data || []);
    } catch (err) {
      console.error('Error fetching food listings:', err);
      setError('Unable to reach surplus food registry. Please check your connection or try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFoodListings();
  }, []);

  // Filter and Sort using array methods
  const filteredFoods = useMemo(() => {
    return foods
      .filter((food) => {
        // Search query filter (name, provider, location, category)
        if (searchQuery.trim()) {
          const query = searchQuery.toLowerCase();
          const matchName = food.name?.toLowerCase().includes(query);
          const matchProvider = food.provider?.toLowerCase().includes(query);
          const matchLocation = food.location?.toLowerCase().includes(query);
          const matchCategory = food.category?.toLowerCase().includes(query);
          if (!matchName && !matchProvider && !matchLocation && !matchCategory) {
            return false;
          }
        }

        // Category filter
        if (selectedCategory !== 'All') {
          if (food.category?.toLowerCase() !== selectedCategory.toLowerCase()) {
            return false;
          }
        }

        // Urgency filter
        if (selectedUrgency !== 'all') {
          const urgency = getUrgencyLevel(food.pickupDeadline, food.status);
          if (urgency.level !== selectedUrgency) {
            return false;
          }
        }

        // Status filter
        if (selectedStatus !== 'all') {
          if (food.status?.toLowerCase() !== selectedStatus.toLowerCase()) {
            return false;
          }
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'urgency') {
          // Items with closest deadline first
          const timeA = new Date(a.pickupDeadline).getTime() || Infinity;
          const timeB = new Date(b.pickupDeadline).getTime() || Infinity;
          return timeA - timeB;
        }
        if (sortBy === 'quantity') {
          return (Number(b.quantity) || 0) - (Number(a.quantity) || 0);
        }
        if (sortBy === 'newest') {
          const createdA = new Date(a.createdAt).getTime() || 0;
          const createdB = new Date(b.createdAt).getTime() || 0;
          return createdB - createdA;
        }
        return 0;
      });
  }, [foods, searchQuery, selectedCategory, selectedUrgency, selectedStatus, sortBy]);

  return (
    <div className="page-container container">
      {/* Header */}
      <div className="section-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <div className="section-tag">
            <FiCompass /> Live Registry
          </div>
          <h1 className="section-title">Discover Surplus Food</h1>
          <p className="section-subtitle">
            Browse available surplus meals and fresh lots ready for immediate community pickup.
          </p>
        </div>

        <button 
          type="button" 
          onClick={fetchFoodListings} 
          className="btn btn-secondary btn-sm"
          title="Refresh food listings"
          disabled={loading}
        >
          <FiRefreshCw className={loading ? 'loading-spinner' : ''} /> Refresh Listings
        </button>
      </div>

      {/* Search and Filters */}
      <SearchFilter
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        selectedUrgency={selectedUrgency}
        setSelectedUrgency={setSelectedUrgency}
        selectedStatus={selectedStatus}
        setSelectedStatus={setSelectedStatus}
        sortBy={sortBy}
        setSortBy={setSortBy}
      />

      {/* Content Area */}
      {loading ? (
        <LoadingState message="Discovering nearby surplus food opportunities..." />
      ) : error ? (
        <div className="empty-state-box" style={{ borderColor: 'rgba(239, 68, 68, 0.3)' }}>
          <div className="empty-icon-circle" style={{ background: 'rgba(239, 68, 68, 0.15)', color: '#ef4444' }}>
            <FiAlertCircle />
          </div>
          <h3 style={{ color: '#f87171', marginBottom: '0.5rem' }}>Failed to Load Data</h3>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>{error}</p>
          <button type="button" onClick={fetchFoodListings} className="btn btn-primary">
            Try Again
          </button>
        </div>
      ) : filteredFoods.length > 0 ? (
        <>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '1.25rem',
            color: 'var(--text-muted)',
            fontSize: '0.875rem'
          }}>
            <span>Showing <strong>{filteredFoods.length}</strong> surplus items</span>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
            gap: '1.75rem'
          }}>
            {filteredFoods.map((food) => (
              <FoodCard key={food.id} food={food} />
            ))}
          </div>
        </>
      ) : (
        <EmptyState
          title="No food matches your filters"
          message="Try adjusting your search terms, urgency window, or selected food categories."
          actionLabel="Clear Filters"
          actionLink=""
          // onClick clear function
        />
      )}
    </div>
  );
};

export default DiscoverFood;
