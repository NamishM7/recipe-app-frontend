import axios from 'axios';
const instance = axios.create({
    baseURL: 'https://localhost:5000',   //backend url
});

export default instance;