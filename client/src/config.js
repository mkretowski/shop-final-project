export const API_URL =
  process.env.NODE_ENV === 'production'
    ? 'https://shop-final-project.onrender.com/api'
    : 'http://localhost:8000/api';
