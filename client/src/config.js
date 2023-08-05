export const API_URL =
  process.env.NODE_ENV === 'production'
    ? 'https://dresscode.onrender.com/api'
    : 'http://localhost:8000/api';
