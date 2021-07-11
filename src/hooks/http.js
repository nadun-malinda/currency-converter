import { useCallback, useReducer } from 'react'
import axiosCountries from '../axios/axios-countries'
import axiosCurrency from '../axios/axios-currency'

const actionTypes = {
    SEND: 'SEND',
    RESPONSE: 'RESPONSE',
    ERROR: 'ERROR'
}

const initalState = {
    loading: false,
    error: null,
    data: []
}

const httpReducer = (httpState, action) => {
    switch (action.type) {
        case actionTypes.SEND:
            return { loading: true, error: null, data: [] }
        case actionTypes.RESPONSE:
            return { ...httpState, loading: false, data: action.data }
        case actionTypes.ERROR:
            return { ...httpState, loading: false, error: action.errorMsg }
        default:
            return httpState
    }
}

const useHttp = () => {
    const [httpState, dispatchHttp] = useReducer(httpReducer, initalState)

    const getCountries = useCallback((url, params = {}) => {
        dispatchHttp({ type: actionTypes.SEND })

        return new Promise((resolve, reject) => {
            axiosCountries.get(url, { params })
                .then(res => {
                    dispatchHttp({ type: actionTypes.RESPONSE, data: res.data })
                    resolve(res.data)
                })
                .catch(err => {
                    // https://restcountries.eu/rest/v2/ returns 404 for every errors
                    dispatchHttp({ type: actionTypes.ERROR, errorMsg: 'No data found!' })
                    resolve([])
                })
        })
    }, [])

    const getCurrencyExchange = useCallback((url, params = {}) => {
        dispatchHttp({ type: actionTypes.SEND })
        return new Promise((resolve, reject) => {
            axiosCurrency.get(url, { params })
                .then(res => {
                    if (res.data.rates) {
                        dispatchHttp({ type: actionTypes.RESPONSE, data: res.data })
                        resolve(res.data.rates)
                    } else {
                        dispatchHttp({ type: actionTypes.ERROR, errorMsg: 'Something went wrong!' })
                        resolve([])
                    }
                })
                .catch(err => {
                    dispatchHttp({ type: actionTypes.ERROR, errorMsg: 'Something went wrong!' })
                    resolve([])
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