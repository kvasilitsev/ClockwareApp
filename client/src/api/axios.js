import axios from 'axios';

axios.defaults.headers.common['Content-Type'] = 'application/json';

export default axios.create({
    baseURL: 'http://localhost:3001/api/'   
});