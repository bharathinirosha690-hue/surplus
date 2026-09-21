import axios from 'axios';
import image from '../../data/images/image.png';
import imageCopy from '../../data/images/image copy.png';
import imageCopy2 from '../../data/images/image copy 2.png';
import imageCopy3 from '../../data/images/image copy 3.png';
import imageCopy4 from '../../data/images/image copy 4.png';
import imageCopy5 from '../../data/images/image copy 5.png';
import imageCopy6 from '../../data/images/image copy 6.png';
import imageCopy7 from '../../data/images/image copy 7.png';

// Base API URL targeting JSON-Server instance or a deployed API URL
const API_URL = (import.meta.env.VITE_API_URL || 'http://localhost:5000').replace(/\/$/, '');

const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  },
  timeout: 8000
});

// Resilient fallback storage key if server is unreachable
const LOCAL_STORAGE_KEY = 'replate_db_fallback';

const getLocalFallback = () => {
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch (e) {
    console.warn('Could not read fallback storage', e);
  }
  return null;
};

const saveLocalFallback = (data) => {
  try {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(data));
  } catch (e) {
    console.warn('Could not save fallback storage', e);
  }
};

const localImages = {
  './images/image.png': image,
  './images/image copy.png': imageCopy,
  './images/image copy 2.png': imageCopy2,
  './images/image copy 3.png': imageCopy3,
  './images/image copy 4.png': imageCopy4,
  './images/image copy 5.png': imageCopy5,
  './images/image copy 6.png': imageCopy6,
  './images/image copy 7.png': imageCopy7
};

const resolveFoodImage = (food) => ({
  ...food,
  image: localImages[food.image] || food.image
});

/* ==========================================================================
   Food APIs (GET, POST, PUT, DELETE)
   ========================================================================== */

export const getFoods = async (params = {}) => {
  try {
    const response = await apiClient.get('/foods', { params });
    // Update local cache
    const current = getLocalFallback() || {};
    saveLocalFallback({ ...current, foods: response.data });
    return response.data.map(resolveFoodImage);
  } catch (error) {
    console.warn('Server error on getFoods, attempting local fallback:', error.message);
    const fallback = getLocalFallback();
    if (fallback && fallback.foods) {
      return fallback.foods.map(resolveFoodImage);
    }
    throw error;
  }
};

export const getFoodById = async (id) => {
  try {
    const response = await apiClient.get(`/foods/${id}`);
    return resolveFoodImage(response.data);
  } catch (error) {
    console.warn(`Server error on getFoodById (${id}), attempting local fallback:`, error.message);
    const fallback = getLocalFallback();
    if (fallback && fallback.foods) {
      const found = fallback.foods.find(f => String(f.id) === String(id));
      if (found) return resolveFoodImage(found);
    }
    throw error;
  }
};

export const addFood = async (foodData) => {
  const newFood = {
    ...foodData,
    id: foodData.id || String(Date.now()),
    status: foodData.status || 'available',
    createdAt: foodData.createdAt || new Date().toISOString()
  };

  try {
    const response = await apiClient.post('/foods', newFood);
    // Update cache
    const current = getLocalFallback() || { foods: [] };
    const updatedFoods = [...(current.foods || []), response.data];
    saveLocalFallback({ ...current, foods: updatedFoods });
    return response.data;
  } catch (error) {
    console.warn('Server error on addFood, saving to local state:', error.message);
    const current = getLocalFallback() || { foods: [] };
    const updatedFoods = [...(current.foods || []), newFood];
    saveLocalFallback({ ...current, foods: updatedFoods });
    return newFood;
  }
};

export const updateFood = async (id, foodData) => {
  try {
    // Strictly PUT request
    const response = await apiClient.put(`/foods/${id}`, foodData);
    // Update cache
    const current = getLocalFallback() || { foods: [] };
    const updatedFoods = (current.foods || []).map(item => 
      String(item.id) === String(id) ? response.data : item
    );
    saveLocalFallback({ ...current, foods: updatedFoods });
    return response.data;
  } catch (error) {
    console.warn(`Server error on updateFood (${id}), updating local state:`, error.message);
    const current = getLocalFallback() || { foods: [] };
    const updatedFoods = (current.foods || []).map(item => 
      String(item.id) === String(id) ? { ...item, ...foodData } : item
    );
    saveLocalFallback({ ...current, foods: updatedFoods });
    return { ...foodData, id };
  }
};

export const deleteFood = async (id) => {
  try {
    const response = await apiClient.delete(`/foods/${id}`);
    // Update cache
    const current = getLocalFallback() || { foods: [] };
    const updatedFoods = (current.foods || []).filter(item => String(item.id) !== String(id));
    saveLocalFallback({ ...current, foods: updatedFoods });
    return response.data;
  } catch (error) {
    console.warn(`Server error on deleteFood (${id}), removing from local state:`, error.message);
    const current = getLocalFallback() || { foods: [] };
    const updatedFoods = (current.foods || []).filter(item => String(item.id) !== String(id));
    saveLocalFallback({ ...current, foods: updatedFoods });
    return { success: true, id };
  }
};

/* ==========================================================================
   Reservation APIs (GET, POST, PUT)
   ========================================================================== */

export const getReservations = async () => {
  try {
    const response = await apiClient.get('/reservations');
    const current = getLocalFallback() || {};
    saveLocalFallback({ ...current, reservations: response.data });
    return response.data;
  } catch (error) {
    console.warn('Server error on getReservations, reading fallback:', error.message);
    const fallback = getLocalFallback();
    return fallback?.reservations || [];
  }
};

export const createReservation = async (reservationData) => {
  const newReservation = {
    ...reservationData,
    id: reservationData.id || `res-${Date.now().toString(36)}`,
    reservedAt: new Date().toISOString(),
    status: 'reserved',
    verificationCode: `REP-${Math.floor(1000 + Math.random() * 9000)}`
  };

  try {
    const response = await apiClient.post('/reservations', newReservation);
    const current = getLocalFallback() || { reservations: [] };
    const updated = [...(current.reservations || []), response.data];
    saveLocalFallback({ ...current, reservations: updated });
    return response.data;
  } catch (error) {
    console.warn('Server error on createReservation, saving fallback:', error.message);
    const current = getLocalFallback() || { reservations: [] };
    const updated = [...(current.reservations || []), newReservation];
    saveLocalFallback({ ...current, reservations: updated });
    return newReservation;
  }
};

export const updateReservation = async (id, reservationData) => {
  try {
    // Strictly PUT request
    const response = await apiClient.put(`/reservations/${id}`, reservationData);
    return response.data;
  } catch (error) {
    console.warn(`Server error on updateReservation (${id}):`, error.message);
    return { ...reservationData, id };
  }
};

/* ==========================================================================
   Provider APIs (GET)
   ========================================================================== */

export const getProviders = async () => {
  try {
    const response = await apiClient.get('/providers');
    return response.data;
  } catch (error) {
    console.warn('Server error on getProviders:', error.message);
    const fallback = getLocalFallback();
    return fallback?.providers || [];
  }
};

export default apiClient;
