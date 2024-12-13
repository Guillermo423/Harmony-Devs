import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:5000', // Cambia esto a la URL de tu backend
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosInstance;

