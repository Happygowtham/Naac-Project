import axios from "axios";


const axiosInstance = axios.create({
    headers: { 'content-type': 'application/json' }
});

axiosInstance.interceptors.request.use(
    (config) => {
        const hrmsbearertoken = "";
        config.headers.Authorization = hrmsbearertoken
            ? `Bearer ${hrmsbearertoken}`
            : "";
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

axiosInstance.interceptors.response.use(
    (response) => Promise.resolve(response),
    async (error) => {
        return Promise.reject(error);
    }
);

export default axiosInstance;