import axios from 'axios'

const instance = axios.create({
    baseURL: process.env.REACT_APP_COUNTRIES_API_BASE_URL
})

export default instance