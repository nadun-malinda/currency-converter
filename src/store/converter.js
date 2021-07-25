import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    error: '',
    amount: 0,
    rate: 0,
    currency: ''
}

const converterSlice = createSlice({
    name: 'converter',
    initialState,
    reducers: {
        setAmount(state, action) {
            state.amount = action.payload
        },
        setCurrency(state, action) {
            state.currency = action.payload
        },
        setRate(state, action) {
            state.rate = action.payload
        }
    }
})

export const converterActions = converterSlice.actions
export default converterSlice.reducer