import axios from 'axios';

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
};