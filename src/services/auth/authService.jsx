import axios from 'axios';

const BASE_URL = 'https://pinceladas-belleza-backend.onrender.com/auth'; // Cambia según sea necesario

export const login = async (credentials) => {
  try {
    const response = await axios.post(`${BASE_URL}/login`, credentials);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Error de red o del servidor' };
  }
};
