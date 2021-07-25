import { configureStore } from '@reduxjs/toolkit'
import searchReducer from './search'
import converterReducer from './converter'

const sotre = configureStore({
    reducer: {
        search: searchReducer,
        converter: converterReducer
    }
})

export default sotre