export const digitsOnly = (str: string): string => {
  return str.replace(/\D/g, '');
};

export const getUtmParams = (): Record<string, string> => {
  const params = new URLSearchParams(window.location.search);
  const utmParams: Record<string, string> = {};
  
  for (const [key, value] of params.entries()) {
    if (key.startsWith('utm_')) {
      utmParams[key] = value;
    }
  }
  
  return utmParams;
};

export const generateIdempotencyKey = (phone: string, service: string): string => {
  const today = new Date().toISOString().split('T')[0];
  const data = `${phone}-${today}-${service}`;
  
  // Simple hash function
  let hash = 0;
  for (let i = 0; i < data.length; i++) {
    const char = data.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32-bit integer
  }
  
  return Math.abs(hash).toString(36);
};

export const logEvent = (eventName: string, data?: Record<string, any>) => {
  console.log(`[Analytics] ${eventName}`, data);
};