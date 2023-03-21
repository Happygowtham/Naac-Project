export function Config() {

    let access = localStorage.getItem('access') || false;

    const axiosInstance = {
        baseURL: '/api/',
        timeout: 10000,
        headers: {
            'Content-Type': 'application/json',
            'accept': '*/*'
        }
    }

    if (access) {
        axiosInstance.headers['Authorization'] = 'JWT ' + access
    }

    return axiosInstance
}