import Axios from 'axios';

const Instance = Axios.create({
    baseURL: 'http://localhost:2100'
});

export default Instance;