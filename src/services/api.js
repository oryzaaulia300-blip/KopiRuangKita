// API Service Client for Kopi Ruang Kita
// Connects to Express Backend deployed on Render / localhost

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const handleResponse = async (response) => {
  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    const errorMsg = data.message || `Request failed with status ${response.status}`;
    throw new Error(errorMsg);
  }
  return data;
};

export const api = {
  // Health check
  checkHealth: async () => {
    const res = await fetch(`${API_BASE_URL}/health`);
    return handleResponse(res);
  },

  // Auth
  login: async (username, password) => {
    const res = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    });
    return handleResponse(res);
  },

  // Menus
  getMenus: async (params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    const url = `${API_BASE_URL}/menus${queryString ? `?${queryString}` : ''}`;
    const res = await fetch(url);
    return handleResponse(res);
  },

  // Orders
  createOrder: async (orderPayload) => {
    const res = await fetch(`${API_BASE_URL}/orders`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(orderPayload)
    });
    return handleResponse(res);
  },

  getOrderByCode: async (orderCode) => {
    const res = await fetch(`${API_BASE_URL}/orders/${orderCode}`);
    return handleResponse(res);
  },

  // Promos
  getPromos: async () => {
    const res = await fetch(`${API_BASE_URL}/promos`);
    return handleResponse(res);
  },

  // Contacts
  sendContactMessage: async ({ nama, noHp, pesan }) => {
    const res = await fetch(`${API_BASE_URL}/contacts`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nama, noHp, pesan })
    });
    return handleResponse(res);
  }
};

export default api;
