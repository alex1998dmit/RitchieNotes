export default {
  host: 'http://127.0.0.1:5000/api',
  authHeader: {
    Authorization: `Bearer ${localStorage.getItem('token')}`,
  },
};
