// react and redux
import React from 'react'
import { useSelector } from 'react-redux'

// ant design components and isons
import { Statistic } from 'antd'
import { LoadingOutlined } from '@ant-design/icons'

// component styles
import classes from './Display.module.scss'

// get convertion rate
const getRateString = (rate, currency) => {
    return (
        <>
            <Statistic value={rate} />
            <span className={classes.Currency}>{currency}</span>
        </>
    )
}

const Display = React.memo(({ loading }) => {
    const { rate, currency } = useSelector(state => state.converter)

    return (
        <div className={classes.Display}>
            <h3>Exchange Rate</h3>
            <div className={classes.RateCurrencyWrap}>
                {loading ? <LoadingOutlined style={{ fontSize: 24 }} spin /> : getRateString(rate, currency)}
            </div>
        </div>
    )
})

export default Display