import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    error: '',
    country: {},
    currencies: []
}

const searchSlice = createSlice({
    name: 'search',
    initialState,
    reducers: {
        setCountry(state, action) {
            state.country = action.payload
        },
        setCurrencies(state, action) {
            state.currencies = action.payload
        },
        setError(state, action) {
            state.error = action.payload
        }
    }
})

export const searchActions = searchSlice.actions
export default searchSlice.reducer