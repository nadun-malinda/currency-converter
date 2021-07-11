import { useCallback, useReducer } from 'react'
import axiosCountries from '../axios/axios-countries'
import axiosCurrency from '../axios/axios-currency'

const initalState = {
    loading: false,
    error: null,
    data: null
}

const httpReducer = (httpState, action) => {
    switch (action.type) {
        case 'SEND':
            return { loading: true, error: null, data: null }
        case 'RESPONSE':
            return { ...httpState, loading: false, data: action.data }
        case 'ERROR':
            return { ...httpState, loading: false, error: action.errorMsg }
        default:
            return httpState
    }
}

const useHttp = () => {
    const [httpState, dispatchHttp] = useReducer(httpReducer, initalState)

    const getCountries = useCallback((url, params = {}) => {
        dispatchHttp({ type: 'SEND' })

        return new Promise((resolve, reject) => {
            axiosCountries.get(url, { params })
                .then(res => {
                    dispatchHttp({ type: 'RESPONSE', data: res.data })
                    resolve(res.data)
                })
                .catch(err => {
                    // https://restcountries.eu/rest/v2/ returns 404 for every errors
                    dispatchHttp({ type: 'ERROR', errorMsg: 'No data found!' })
                    reject(null)
                })
        })
    }, [])

    const getCurrencyExchange = useCallback((url, params = {}) => {
        dispatchHttp({ type: 'SEND' })
        return new Promise((resolve, reject) => {
            axiosCurrency.get(url, { params })
                .then(res => {
                    dispatchHttp({ type: 'RESPONSE', data: res.data })
                    resolve(res.data)
                })
                .catch(err => {
                    dispatchHttp({ type: 'ERROR', errorMsg: 'Something went wrong!' })
                    reject(null)
                })
        })
    }, [])

    return {
        loading: httpState.loading,
        error: httpState.error,
        data: httpState.data,
        getCurrencyExchange,
        getCountries
    }
}

export default useHttp