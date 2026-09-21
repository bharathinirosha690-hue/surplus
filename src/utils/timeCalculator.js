/**
 * Time and Urgency Utility for RePlate
 */

export const calculateTimeRemaining = (deadline) => {
  if (!deadline) return { diffMs: 0, hours: 0, minutes: 0, isExpired: true, text: 'No deadline' };
  
  const target = new Date(deadline).getTime();
  const now = new Date().getTime();
  const diffMs = target - now;

  if (diffMs <= 0) {
    return {
      diffMs: 0,
      hours: 0,
      minutes: 0,
      isExpired: true,
      text: 'Expired'
    };
  }

  const totalMinutes = Math.floor(diffMs / (1000 * 60));
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  const days = Math.floor(hours / 24);

  let text = '';
  if (days > 0) {
    text = `${days}d ${hours % 24}h remaining`;
  } else if (hours > 0) {
    text = `${hours}h ${minutes}m remaining`;
  } else {
    text = `${minutes}m remaining`;
  }

  return {
    diffMs,
    totalMinutes,
    hours,
    minutes,
    days,
    isExpired: false,
    text
  };
};

export const getUrgencyLevel = (deadline, status) => {
  if (status === 'collected' || status === 'completed') {
    return {
      level: 'collected',
      label: 'Rescue Completed',
      badgeClass: 'badge-collected',
      description: 'Successfully rescued and distributed'
    };
  }

  if (status === 'reserved' || status === 'pickup_scheduled') {
    return {
      level: 'reserved',
      label: 'Reserved & Awaiting Pickup',
      badgeClass: 'badge-reserved',
      description: 'Rescue commitment confirmed'
    };
  }

  const { diffMs, hours, isExpired } = calculateTimeRemaining(deadline);

  if (isExpired) {
    return {
      level: 'expired',
      label: 'Expired',
      badgeClass: 'badge-expired',
      description: 'Pickup window has elapsed'
    };
  }

  const hoursRemaining = diffMs / (1000 * 60 * 60);

  if (hoursRemaining < 1) {
    return {
      level: 'critical',
      label: 'Rescue Now',
      badgeClass: 'badge-rescue-now',
      description: 'Less than 1 hour remaining — urgent pickup required'
    };
  }

  if (hoursRemaining <= 4) {
    return {
      level: 'warning',
      label: 'Attention Needed',
      badgeClass: 'badge-attention',
      description: 'Between 1 and 4 hours remaining'
    };
  }

  return {
    level: 'safe',
    label: 'Safe Window',
    badgeClass: 'badge-safe',
    description: 'More than 4 hours remaining'
  };
};

export const formatDateTime = (isoString) => {
  if (!isoString) return 'N/A';
  try {
    const date = new Date(isoString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  } catch {
    return isoString;
  }
};

export const formatTimeOnly = (isoString) => {
  if (!isoString) return 'N/A';
  try {
    const date = new Date(isoString);
    return date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  } catch {
    return isoString;
  }
};
