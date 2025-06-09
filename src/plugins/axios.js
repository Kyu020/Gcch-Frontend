import axios from 'axios';
import router from '../router';
import { createToast } from 'mosha-vue-toastify';
import 'mosha-vue-toastify/dist/style.css';

const axiosInstance = axios.create({
    baseURL: 'http://localhost:8000/api', // Changed from localhost to 127.0.0.1
    // baseUrl: 'https://gcch-backend.onrender.com/api', // Use this for production
    withCredentials: false,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'X-Requested-With': 'XMLHttpRequest'
    },
});

// Request interceptor with CSRF check
axiosInstance.interceptors.request.use(
    async (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    (error) => {
        console.error('Request error:', error);
        return Promise.reject(error);
    }
);

// Response interceptor with retry logic
axiosInstance.interceptors.response.use(
    (response) => {
        if (response.data.token) {
            localStorage.setItem('token', response.data.token);
            axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
        }
        return response;
    },
    async (error) => {
        console.error('Response Error:', error);

        if (!error.response) {
            createToast('Network connection error. Please check your connection.', {
                type: 'danger',
                position: 'top-right',
                timeout: 5000,
                showIcon: true
            });
            return Promise.reject(error);
        }

        switch (error.response.status) {
            case 401:
                localStorage.removeItem('token');
                delete axiosInstance.defaults.headers.common['Authorization'];
                router.push('/login');
                break;
            case 429:
                createToast('Too many requests. Please try again later.', {
                    type: 'warning',
                    position: 'top-right',
                    timeout: 5000,
                    showIcon: true
                });
                break;
            case 500:
                createToast('Server error. Please try again later.', {
                    type: 'danger',
                    position: 'top-right',
                    timeout: 5000,
                    showIcon: true
                });
                break;
        }
        
        return Promise.reject(error);
    }
);

export default axiosInstance;