const axios = require('axios').default;

export const instance = axios.create({
    baseURL: 'https://localhost:44322/api/v1/',
    timeout: 1000,
    headers: {
        'content-type': 'application/json'
    }
})
