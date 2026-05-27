import api from './api';

const chatService = {
  getMessages: async (orderId, signal) => {
    return api.get(`/chat/${orderId}`, { signal });
  },

  sendMessage: async (orderId, message) => {
    return api.post(`/chat/${orderId}`, { message });
  },
};

export default chatService;
