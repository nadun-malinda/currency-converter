// react and redux
import { useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { converterActions } from '../../store/converter'

// custom hooks
import useHttp from '../../hooks/http'

// utilities
import { getExchangeRate } from '../../utils/utils'

// dependant components
import Display from './Display/Display'
import ConvertForm from './ConvertForm/ConvertForm'
import Error from '../UI/Error/Error'

// compoment styles
import classes from './Converter.module.scss'

// constants
import { FROM_CURRENCY } from '../../constants'

const Converter = () => {
    const formRef = useRef(null)
    const { currencies } = useSelector(state => state.search)
    const { amount, currency } = useSelector(state => state.converter)
    const dispatch = useDispatch()

    // custom hook call
    const { loading, error, getCurrencyExchange } = useHttp()

    useEffect(() => {
        if (currencies.length > 0) {
            formRef.current.setFieldsValue({ toCurrency: currencies[0].code })
            dispatch(converterActions.setCurrency(currencies[0].code))
        } else {
            formRef.current.setFieldsValue({ toCurrency: null })
            dispatch(converterActions.setCurrency(null))
        }
    }, [currencies, dispatch])

    // effect to run when change currency selection dropdown.
    // need to reset form values.
    useEffect(() => {
        formRef.current.setFieldsValue({ amount: 0 })
        dispatch(converterActions.setAmount(0))
        dispatch(converterActions.setRate(0))
    }, [currency, dispatch])

    // on submit the form
    const onConvert = ({ toCurrency }) => {
        const params = {
            symbols: `${toCurrency},${FROM_CURRENCY}`
        }
        getCurrencyExchange('/latest', params)
            .then((rates) => {
                const exchangeRate = getExchangeRate(amount, rates, currency, FROM_CURRENCY)
                dispatch(converterActions.setRate(exchangeRate))
            })
    }

    return (
        <div className={classes.Converter}>
            <Display loading={loading} />
            <ConvertForm
                formRef={formRef}
                onConvert={onConvert}
                loading={loading} />

            {error && <Error message={error} />}
        </div>
    )
}

export default Converter