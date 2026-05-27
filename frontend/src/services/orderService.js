import api from './api';

const orderService = {
  create: async (orderData) => {
    return api.post('/orders', orderData);
  },

  getByBuyer: async (signal) => {
    return api.get('/orders/buyer', { signal });
  },

  getBySeller: async (signal) => {
    return api.get('/orders/seller', { signal });
  },

  updateStatus: async (id, status) => {
    return api.put(`/orders/${id}/status`, { status });
  },

  getById: async (id, signal) => {
    return api.get(`/orders/${id}`, { signal });
  },

  cancel: async (id, reason) => {
    return api.post(`/orders/${id}/cancel`, { reason });
  },
};

export default orderService;
