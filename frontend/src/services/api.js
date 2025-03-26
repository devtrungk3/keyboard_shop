import axios from 'axios';

<<<<<<< HEAD
const API_URL = 'http://localhost:8080';

export const getProducts = async () => {
    try {
        console.log('Fetching from:', `${API_URL}/product`);
        const response = await axios.get(`${API_URL}/product`, {
            timeout: 10000,
        });
        console.log('API Response:', response.data);
        return response.data;
    } catch (error) {
        console.error('API Error:', {
            message: error.message,
            status: error.response?.status,
            data: error.response?.data,
        });
        throw error;
    }
=======
// Configure axios with a base URL (optional)
const api = axios.create({
  baseURL: 'http://localhost:8080', // Replace with your actual base URL
  headers: {
    'Content-Type': 'application/json',
  },
});

export const loginUser = async (username, password) => {
  try {
    const response = await api.post('/auth/login', {
      username,
      password,
    });

    return response.data;
  } catch (error) {
    // Handle Axios-specific error
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      throw new Error(error.response.data.message || 'Login failed');
    } else if (error.request) {
      // The request was made but no response was received
      throw new Error('No response from server');
    } else {
      // Something happened in setting up the request
      throw new Error('Error setting up the request');
    }
  }
>>>>>>> 095f912e7db7c3f4026ea0ea198797694e33cf97
};