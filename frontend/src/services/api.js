import axios from 'axios';

// Configure axios with a base URL (optional)
const api = axios.create({
    baseURL: 'http://localhost:8080', // Replace with your actual base URL
    headers: {
        'Content-Type': 'application/json',
    },
});

api.interceptors.request.use(config => {
        const token = localStorage.getItem('accessToken');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    })

// --------------------------------product-------------------------------------------------
export const getProducts = async () => {
    try {
        const response = await api.get(`/product`, {
            timeout: 5000,
        });
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

export const addProduct = async (product) => {
    try {
        const response = await api.post(`/product/create`, product, {
            timeout: 5000,
        })
        return response.data;
    } catch (error) {
        console.error('API Error:', {
            message: error.message,
            status: error.response?.status,
            data: error.response?.data,
        });
        throw error;
    }
}
export const updateProduct = async (productId, productData) => {
    try {
        const response = await api.put(`/product/${productId}`, productData, {
            timeout: 5000,
        });
        return response.data;
    } catch (error) {
        console.error('API Error (updateProduct):', {
            message: error.message,
            status: error.response?.status,
            data: error.response?.data,
        });
        throw error;
    }
};

export const deleteProduct = async (productId) => {
    try {
        const response = await api.delete(`/product/${productId}`, {
            timeout: 5000,
        });
        return response.data;
    } catch (error) {
        console.error('API Error (deleteProduct):', {
            message: error.message,
            status: error.response?.status,
            data: error.response?.data,
        });
        throw error;
    }
};


// --------------------------------brand-------------------------------------------------
export const getBrands = async () => {
    try {
        const response = await api.get(`/brand`, {
            timeout: 5000,
        });
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

export const addBrand = async (brand) => {
    try {
        const response = await api.post(`/brand/create`, brand, {
            timeout: 5000,
        });
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

export const updateBrand = async (brandId, brandData) => {
    try {
        const response = await api.put(`/brand/${brandId}`, brandData, {
            timeout: 5000,
        });
        return response.data;
    } catch (error) {
        console.error('API Error (updateBrand):', {
            message: error.message,
            status: error.response?.status,
            data: error.response?.data,
        });
        throw error;
    }
};

export const deleteBrand = async (brandId) => {
    try {
        const response = await api.delete(`/brand/${brandId}`, {
            timeout: 5000,
        });
        return response.data;
    } catch (error) {
        console.error('API Error (deleteBrand):', {
            message: error.message,
            status: error.response?.status,
            data: error.response?.data,
        });
        throw error;
    }
};


// --------------------------------authen-------------------------------------------------

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
};

export const signupUser = async (username, password) => {
    try {
        const response = await api.post('/auth/signup', {
            username,
            password,
        });

        return response.data;
    } catch (error) {
        if (error.response) {
            throw new Error(error.response.data.message || 'Signup failed');
        } else if (error.request) {
            throw new Error('No response from server');
        } else {
            throw new Error('Error setting up the request');
        }
    }
};