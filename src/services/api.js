// API service for CMMS backend communication

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// Helper function to get auth token
const getAuthToken = () => {
  return localStorage.getItem('accessToken');
};

// Helper function to handle API responses
const handleResponse = async (response) => {
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error || errorData.message || `HTTP ${response.status}`);
  }
  return response.json();
};

// Helper function to make authenticated requests
const makeRequest = async (endpoint, options = {}) => {
  const token = getAuthToken();
  const config = {
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    },
    ...options,
  };

  const response = await fetch(`${API_BASE_URL}${endpoint}`, config);
  return handleResponse(response);
};

// Authentication API
export const authAPI = {
  login: async (credentials) => {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials),
    });
    const data = await handleResponse(response);

    // Store tokens
    if (data.accessToken) {
      localStorage.setItem('accessToken', data.accessToken);
      localStorage.setItem('refreshToken', data.refreshToken);
      localStorage.setItem('user', JSON.stringify(data.user));
    }

    return data;
  },

  register: async (userData) => {
    const response = await fetch(`${API_BASE_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData),
    });
    return handleResponse(response);
  },

  logout: async () => {
    try {
      await makeRequest('/auth/logout', { method: 'POST' });
    } finally {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('user');
    }
  },

  getCurrentUser: async () => {
    return makeRequest('/auth/me');
  },

  refreshToken: async () => {
    const refreshToken = localStorage.getItem('refreshToken');
    if (!refreshToken) throw new Error('No refresh token available');

    const response = await fetch(`${API_BASE_URL}/auth/refresh`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ refreshToken }),
    });
    const data = await handleResponse(response);

    if (data.accessToken) {
      localStorage.setItem('accessToken', data.accessToken);
    }

    return data;
  }
};

// Engines API
export const enginesAPI = {
  getAll: async (params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    return makeRequest(`/engines${queryString ? `?${queryString}` : ''}`);
  },

  getById: async (id) => {
    return makeRequest(`/engines/${id}`);
  },

  create: async (engineData) => {
    return makeRequest('/engines', {
      method: 'POST',
      body: JSON.stringify(engineData),
    });
  },

  update: async (id, engineData) => {
    return makeRequest(`/engines/${id}`, {
      method: 'PUT',
      body: JSON.stringify(engineData),
    });
  },

  delete: async (id) => {
    return makeRequest(`/engines/${id}`, {
      method: 'DELETE',
    });
  },

  search: async (query, limit = 20) => {
    return makeRequest(`/engines/search?q=${encodeURIComponent(query)}&limit=${limit}`);
  },

  getStats: async () => {
    return makeRequest('/engines/stats');
  },

  getHistory: async (id, params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    return makeRequest(`/engines/${id}/history${queryString ? `?${queryString}` : ''}`);
  },

  bulkCreate: async (engines) => {
    return makeRequest('/engines/bulk', {
      method: 'POST',
      body: JSON.stringify({ engines }),
    });
  },

  bulkUpdate: async (engines) => {
    return makeRequest('/engines/bulk', {
      method: 'PUT',
      body: JSON.stringify({ engines }),
    });
  },

  bulkDelete: async (engineIds) => {
    return makeRequest('/engines/bulk', {
      method: 'DELETE',
      body: JSON.stringify({ engineIds }),
    });
  },

  // Import engines from Excel/CSV data
  importFromExcel: async (engines) => {
    return makeRequest('/engines/bulk', {
      method: 'POST',
      body: JSON.stringify({ engines }),
    });
  },

  // Export engines to Excel format
  exportToExcel: async (params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    const response = await fetch(`${API_BASE_URL}/engines/export${queryString ? `?${queryString}` : ''}`, {
      headers: {
        Authorization: `Bearer ${getAuthToken()}`,
      },
    });

    if (!response.ok) {
      throw new Error('Export failed');
    }

    return response.blob();
  },

  // Get Excel template for import
  getImportTemplate: async () => {
    const response = await fetch(`${API_BASE_URL}/engines/template`, {
      headers: {
        Authorization: `Bearer ${getAuthToken()}`,
      },
    });

    if (!response.ok) {
      throw new Error('Template download failed');
    }

    return response.blob();
  }
};

// Disponibility API
export const disponibilityAPI = {
  getAll: async (params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    return makeRequest(`/disponibility${queryString ? `?${queryString}` : ''}`);
  },

  getAvailable: async (params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    return makeRequest(`/disponibility/available${queryString ? `?${queryString}` : ''}`);
  },

  getUnavailable: async (params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    return makeRequest(`/disponibility/unavailable${queryString ? `?${queryString}` : ''}`);
  },

  addToAvailable: async (data) => {
    return makeRequest('/disponibility/available', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  addToUnavailable: async (data) => {
    return makeRequest('/disponibility/unavailable', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  moveEngine: async (data) => {
    return makeRequest('/disponibility/move', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  getStats: async (params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    return makeRequest(`/disponibility/stats${queryString ? `?${queryString}` : ''}`);
  }
};

// Affectation API
export const affectationAPI = {
  getAll: async (params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    return makeRequest(`/affectation${queryString ? `?${queryString}` : ''}`);
  },

  getAvailableForAffectation: async (params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    return makeRequest(`/affectation/available${queryString ? `?${queryString}` : ''}`);
  },

  getAffected: async (params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    return makeRequest(`/affectation/affected${queryString ? `?${queryString}` : ''}`);
  },

  create: async (data) => {
    return makeRequest('/affectation', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  assignEngine: async (data) => {
    return makeRequest('/affectation/assign', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  unassignEngine: async (data) => {
    return makeRequest('/affectation/unassign', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  getStats: async (params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    return makeRequest(`/affectation/stats${queryString ? `?${queryString}` : ''}`);
  },

  getByDemandeur: async (demandeur, params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    return makeRequest(`/affectation/demandeur/${demandeur}${queryString ? `?${queryString}` : ''}`);
  }
};

// Dashboard API
export const dashboardAPI = {
  getOverview: async (params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    return makeRequest(`/dashboard/overview${queryString ? `?${queryString}` : ''}`);
  },

  getStats: async (params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    return makeRequest(`/dashboard/stats${queryString ? `?${queryString}` : ''}`);
  },

  getTrends: async (params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    return makeRequest(`/dashboard/trends${queryString ? `?${queryString}` : ''}`);
  },

  getEngineTypeStats: async (params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    return makeRequest(`/dashboard/engine-types${queryString ? `?${queryString}` : ''}`);
  },

  getPerformanceMetrics: async (params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    return makeRequest(`/dashboard/performance${queryString ? `?${queryString}` : ''}`);
  },

  getAlerts: async () => {
    return makeRequest('/dashboard/alerts');
  },

  getRecentActivity: async (limit = 20) => {
    return makeRequest(`/dashboard/recent-activity?limit=${limit}`);
  },

  getKPIs: async (params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    return makeRequest(`/dashboard/kpis${queryString ? `?${queryString}` : ''}`);
  },

  getDisponibilityTrendChart: async (params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    return makeRequest(`/dashboard/charts/disponibility-trend${queryString ? `?${queryString}` : ''}`);
  },

  getAffectationStatusChart: async (params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    return makeRequest(`/dashboard/charts/affectation-status${queryString ? `?${queryString}` : ''}`);
  },

  getEngineUtilizationChart: async (params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    return makeRequest(`/dashboard/charts/engine-utilization${queryString ? `?${queryString}` : ''}`);
  },

  exportData: async (params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    return makeRequest(`/dashboard/export${queryString ? `?${queryString}` : ''}`);
  }
};

// Users API (for admin functionality)
export const usersAPI = {
  getAll: async (params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    return makeRequest(`/users${queryString ? `?${queryString}` : ''}`);
  },

  getById: async (id) => {
    return makeRequest(`/users/${id}`);
  },

  create: async (userData) => {
    return makeRequest('/users', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  },

  update: async (id, userData) => {
    return makeRequest(`/users/${id}`, {
      method: 'PUT',
      body: JSON.stringify(userData),
    });
  },

  delete: async (id) => {
    return makeRequest(`/users/${id}`, {
      method: 'DELETE',
    });
  },

  getRoles: async (id) => {
    return makeRequest(`/users/${id}/roles`);
  },

  assignRole: async (id, roleName) => {
    return makeRequest(`/users/${id}/roles`, {
      method: 'POST',
      body: JSON.stringify({ roleName }),
    });
  },

  removeRole: async (id, roleId) => {
    return makeRequest(`/users/${id}/roles/${roleId}`, {
      method: 'DELETE',
    });
  }
};

export default {
  auth: authAPI,
  engines: enginesAPI,
  disponibility: disponibilityAPI,
  affectation: affectationAPI,
  dashboard: dashboardAPI,
  users: usersAPI
};
