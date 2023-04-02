import axios from 'axios';

axios.defaults.headers.common['Content-Type'] = 'application/json';

const host = axios.create({
    baseURL: '/api/'   
});

const authHost = axios.create({
    baseURL:'/api/'
})

const authInterceptor = config => {
    config.headers.authorization = `Bearer ${localStorage.getItem('token')}`    
    return config
}

authHost.interceptors.request.use(authInterceptor);

authHost.interceptors.response.use((config) => {
    return config;
},async (error) => {
    const request = error.config;
    if (error.response.status === 401 && error.config && !error.config._isRetry) {        
        request._isRetry = true;
        try {
            const response = await axios.get(`/api/refresh`, {withCredentials: true});
            localStorage.setItem('token', response.data.accessToken);                                 
            return await authHost.request(request.url);
        } catch (e) {
            console.log('Not authorized user')
        }
    }
    throw error;
})

export { host, authHost };
