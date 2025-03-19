import axios from 'axios';


const AppAPI = axios.create({
    baseURL: 'http://localhost:4000/api'
});

// Todo: configurar interceptores
AppAPI.interceptors.request.use( config => {

    config.headers = {
        ...config.headers,
        'x-token': localStorage.getItem('token')
    }

    return config;
})


export default AppAPI;



