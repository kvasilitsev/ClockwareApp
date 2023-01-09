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

authHost.interceptors.request.use(authInterceptor)

export { host, authHost };