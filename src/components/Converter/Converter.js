import { useState, useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import { getExchangeRate } from '../../utils/utils'
import Display from './Display/Display'
import ConvertForm from './ConvertForm/ConvertForm'
import Error from '../UI/Error/Error'
import useHttp from '../../hooks/http'
import classes from './Converter.module.scss'

// constants
import { FROM_CURRENCY } from '../../constants'

const Converter = ({ currencies }) => {
    const [amount, setAmount] = useState(0)
    const [currency, setCurrency] = useState(null)
    const [rate, setRate] = useState(0)
    const formRef = useRef(null)

    // custom hook
    const { loading, error, getCurrencyExchange } = useHttp()

    useEffect(() => {
        if (currencies.length > 0) {
            formRef.current.setFieldsValue({ toCurrency: currencies[0].code })
            setCurrency(currencies[0].code)
        } else {
            formRef.current.setFieldsValue({ toCurrency: null })
            setCurrency(null)
        }
    }, [currencies])

    // effect to run when change currency selection dropdown.
    // need to reset form values.
    useEffect(() => {
        resetForm()
    }, [currency])

    const resetForm = () => {
        formRef.current.setFieldsValue({ amount: 0 })
        setAmount(0)
        setRate(0)
    }

    // on submit the form
    const onConvert = ({ toCurrency }) => {
        const params = {
            symbols: `${toCurrency},${FROM_CURRENCY}`
        }
        getCurrencyExchange('/latest', params)
            .then((rates) => {
                const exchangeRate = getExchangeRate(amount, rates, currency, FROM_CURRENCY)
                setRate(exchangeRate)
            })
    }

    return (
        <div className={classes.Converter}>
            <Display loading={loading} rate={rate} currency={currency} />
            <ConvertForm
                formRef={formRef}
                amount={amount}
                currency={currency}
                currencies={currencies}
                setAmount={setAmount}
                setCurrency={setCurrency}
                onConvert={onConvert}
                loading={loading} />

            {error && <Error message={error} />}
        </div>
    )
}

Converter.propTypes = {
    currencies: PropTypes.array
}
Converter.defaultProps = {
    currencies: []
}

export default Converter