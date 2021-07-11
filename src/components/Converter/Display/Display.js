import React from 'react'
import PropTypes from 'prop-types'
import { Statistic } from 'antd'
import { LoadingOutlined } from '@ant-design/icons'
import classes from './Display.module.scss'

const getRateString = (rate, currency) => {
    return (
        <>
            <Statistic value={rate} />
            <span className={classes.Currency}>{currency}</span>
        </>
    )
}

const Display = React.memo(({ loading, rate, currency }) => {
    return (
        <div className={classes.Display}>
            <h3>Exchange Rate</h3>
            <h1>{loading ? <LoadingOutlined style={{ fontSize: 24 }} spin /> : getRateString(rate, currency)}</h1>
        </div>
    )
})

Display.propTypes = {
    rate: PropTypes.number.isRequired,
    currency: PropTypes.string
}
Display.defaultProps = {
    currency: null
}

export default Display