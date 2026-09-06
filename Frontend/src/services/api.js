const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Helper for HTTP requests
async function request(endpoint, options = {}) {
  const token = localStorage.getItem('rentease_token');

  const headers = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  };

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Something went wrong');
  }

  return data;
}

export const api = {
  // Auth
  register: (userData) => request('/auth/register', { method: 'POST', body: JSON.stringify(userData) }),
  login: (credentials) => request('/auth/login', { method: 'POST', body: JSON.stringify(credentials) }),
  getProfile: () => request('/auth/me'),

  // Properties
  getProperties: (params = {}) => {
    const query = new URLSearchParams(params).toString();
    return request(`/properties${query ? `?${query}` : ''}`);
  },
  getPropertyById: (id) => request(`/properties/${id}`),
  createProperty: (propertyData) => request('/properties', { method: 'POST', body: JSON.stringify(propertyData) }),
  getMyListings: () => request('/properties/my-listings'),

  // Saved Properties
  getSavedProperties: () => request('/users/saved'),
  toggleSaveProperty: (id) => request(`/users/saved/${id}`, { method: 'POST' }),

  // Enquiries
  sendEnquiry: (enquiryData) => request('/enquiries', { method: 'POST', body: JSON.stringify(enquiryData) }),
  getMyEnquiries: () => request('/enquiries/my-enquiries'),
};
