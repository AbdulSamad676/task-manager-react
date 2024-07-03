import baseAxios from 'axios';

const axios = baseAxios.create({
  baseURL: import.meta.env.VITE_APP_API_URL,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

axios.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem('token');
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.message == 'Network Error' || error.response?.status == 500) {
      // router.push("/500");
    } else if (error.response.status == 403) {
      window.location.href = '/profile';
    } else if (error.response.status == 404) {
      // router.push("/404");
    } else if (error.response.status == 401 && error.config.method != 'get') {
      window.dispatchEvent(
        new CustomEvent('alertify', {
          detail: { message: 'Please login to continue.', type: 'error' },
        }),
      );
    } else if (error.response.status == 408) {
      window.location.href = '/408';
    }
    return Promise.reject(error);
  },
);

export default axios;
