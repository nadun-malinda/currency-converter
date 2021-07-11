import PropTypes from 'prop-types'
import { Empty, Statistic } from 'antd'
import classes from './Details.module.scss'

const Details = ({ countryData, error }) => {
    const renderDetails = () => {
        return (
            <ul className={classes.List}>
                <li>
                    <label>Name:</label>
                    <p>{countryData.name}</p>
                </li>
                <li>
                    <label>Capital:</label>
                    <p>{countryData.capital}</p>
                </li>
                <li>
                    <label>Population:</label>
                    <Statistic value={countryData.population} />
                </li>
                <li>
                    <label>{countryData.currencies.length > 1 ? 'Currencies' : 'Currency'}:</label>
                    <p>{countryData.currencies?.map(currency => currency.name).join(', ')}</p>
                </li>
            </ul>
        )
    }

    const getEmptyDescription = () => {
        return error ? error : "Search and select a country to see details and convert currencies"
    }

    return (
        <div className={classes.Details}>
            {
                Object.keys(countryData).length > 0 ?
                    renderDetails() :
                    <Empty description={getEmptyDescription()} />
            }
        </div>
    )
}

Details.propTypes = {
    countryData: PropTypes.object,
    error: PropTypes.string
}
Details.defaultProps = {
    countryData: {},
    error: null
}

export default Details