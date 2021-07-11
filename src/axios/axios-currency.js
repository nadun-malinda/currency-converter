import axios from 'axios'

const instance = axios.create({
    baseURL: process.env.REACT_APP_FIXER_API_BASE_URL,
    params: {
        access_key: process.env.REACT_APP_FIXER_ACCESS_KEY
    }
})

export default instance