/**
 * Food Lifecycle and Match Level Utilities for RePlate
 */

export const RESCUE_STAGES = [
  { id: 'listed', label: 'Listed', step: 1, description: 'Surplus registered by food provider' },
  { id: 'available', label: 'Available', step: 2, description: 'Live on discover map & ready for rescue' },
  { id: 'reserved', label: 'Reserved', step: 3, description: 'Receiver committed with verified pickup window' },
  { id: 'pickup_scheduled', label: 'Pickup Scheduled', step: 4, description: 'Receiver en route with ETA' },
  { id: 'collected', label: 'Collected', step: 5, description: 'Safely handed over and waste prevented' }
];

export const getStageIndex = (status) => {
  switch (status?.toLowerCase()) {
    case 'listed': return 0;
    case 'available': return 1;
    case 'reserved': return 2;
    case 'pickup_scheduled': return 3;
    case 'collected':
    case 'completed': return 4;
    default: return 1;
  }
};

/**
 * Calculates a match score and explanation based on quantity, deadline window, and condition
 */
export const calculateMatchLevel = (food) => {
  if (!food) return { level: 'Good Match', score: 75, tagClass: 'match-good', reason: 'Suitable for immediate rescue.' };

  let score = 50;
  const reasons = [];

  // Quantity factor
  const qty = Number(food.quantity) || 0;
  if (qty >= 20) {
    score += 25;
    reasons.push('high volume impact');
  } else if (qty >= 10) {
    score += 15;
    reasons.push('optimal portion size');
  } else {
    score += 5;
    reasons.push('quick single pickup');
  }

  // Time remaining factor
  if (food.pickupDeadline) {
    const target = new Date(food.pickupDeadline).getTime();
    const now = Date.now();
    const diffHours = (target - now) / (1000 * 60 * 60);

    if (diffHours > 3) {
      score += 20;
      reasons.push('generous pickup window');
    } else if (diffHours > 1) {
      score += 15;
      reasons.push('active time window');
    } else if (diffHours > 0) {
      score += 5;
      reasons.push('urgent pickup window');
    } else {
      score -= 30;
      reasons.push('deadline passed');
    }
  }

  // Status factor
  if (food.status === 'available') {
    score += 10;
  }

  if (score >= 80) {
    return {
      level: 'High Match',
      score,
      tagClass: 'match-high',
      reason: `High Match: ${reasons.slice(0, 2).join(' + ')}.`
    };
  } else if (score >= 50) {
    return {
      level: 'Good Match',
      score,
      tagClass: 'match-good',
      reason: `Good Match: ${reasons.slice(0, 2).join(' + ')}.`
    };
  } else {
    return {
      level: 'Limited Match',
      score,
      tagClass: 'match-limited',
      reason: `Limited Match: tight timing or pending status.`
    };
  }
};
