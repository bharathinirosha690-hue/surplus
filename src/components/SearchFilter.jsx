import React from 'react';
import { FiSearch, FiFilter, FiSliders } from 'react-icons/fi';

const CATEGORIES = ['All', 'Meals', 'Bakery', 'Produce', 'Prepared', 'Beverages', 'Dairy'];
const URGENCY_OPTIONS = [
  { value: 'all', label: 'All Urgencies' },
  { value: 'critical', label: 'Rescue Now (< 1 hr)' },
  { value: 'warning', label: 'Attention Needed (1-4 hrs)' },
  { value: 'safe', label: 'Safe Window (> 4 hrs)' }
];
const STATUS_OPTIONS = [
  { value: 'all', label: 'All Statuses' },
  { value: 'available', label: 'Available Now' },
  { value: 'reserved', label: 'Reserved' },
  { value: 'collected', label: 'Collected' }
];
const SORT_OPTIONS = [
  { value: 'urgency', label: 'Sort: Most Urgent First' },
  { value: 'quantity', label: 'Sort: Highest Quantity' },
  { value: 'newest', label: 'Sort: Recently Added' }
];

const SearchFilter = ({
  searchQuery,
  setSearchQuery,
  selectedCategory,
  setSelectedCategory,
  selectedUrgency,
  setSelectedUrgency,
  selectedStatus,
  setSelectedStatus,
  sortBy,
  setSortBy,
  showStatusFilter = true
}) => {
  return (
    <div className="search-filter-container">
      <div className="search-bar-row">
        {/* Search text */}
        <div className="search-input-wrapper">
          <FiSearch className="search-icon-inside" />
          <input
            type="text"
            className="search-input"
            placeholder="Search surplus by food name, bakery, restaurant, location..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            aria-label="Search surplus food"
          />
        </div>

        {/* Urgency select */}
        <select 
          className="filter-select"
          value={selectedUrgency}
          onChange={(e) => setSelectedUrgency(e.target.value)}
          aria-label="Filter by urgency"
        >
          {URGENCY_OPTIONS.map(opt => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>

        {/* Status select (optional) */}
        {showStatusFilter && (
          <select 
            className="filter-select"
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            aria-label="Filter by status"
          >
            {STATUS_OPTIONS.map(opt => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        )}

        {/* Sort select */}
        {sortBy !== undefined && setSortBy && (
          <select 
            className="filter-select"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            aria-label="Sort food listings"
          >
            {SORT_OPTIONS.map(opt => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        )}
      </div>

      {/* Category Pills */}
      <div className="filter-chips-row" role="tablist" aria-label="Filter by category">
        {CATEGORIES.map(cat => (
          <button
            key={cat}
            type="button"
            className={`filter-chip ${selectedCategory === cat ? 'active' : ''}`}
            onClick={() => setSelectedCategory(cat)}
            role="tab"
            aria-selected={selectedCategory === cat}
          >
            {cat}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SearchFilter;
