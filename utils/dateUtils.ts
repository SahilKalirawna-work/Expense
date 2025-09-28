
// Formats an ISO date string to "DD MMM YY" (e.g., "25 Jul 24")
export const formatDate = (isoString: string): string => {
  const date = new Date(isoString);
  return date.toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: '2-digit',
  });
};

// Gets the full day of the week from an ISO date string (e.g., "Thursday")
export const getDayOfWeek = (isoString: string): string => {
  const date = new Date(isoString);
  return date.toLocaleDateString('en-US', { weekday: 'long' });
};
