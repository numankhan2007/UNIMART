import api from './api';

const authService = {
  login: async (studentId, password) => {
    return api.post('/auth/login', { studentId, password });
  },

  register: async (data) => {
    return api.post('/auth/register', {
      register_number: data.studentId,
      username: data.username,
      password: data.password,
      personal_mail_id: data.email,
      phone_number: data.phone || undefined,
    });
  },

  verifyRegisterNumber: async (registerNumber) => {
    return api.get(`/auth/verify/${registerNumber}`);
  },

  getProfile: async () => {
    return api.get('/auth/profile');
  },

  updateProfile: async (data) => {
    return api.put('/auth/profile', data);
  },
};

export default authService;
