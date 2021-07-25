import { useSelector } from 'react-redux'
import { Empty, Statistic } from 'antd'
import classes from './Details.module.scss'

const Details = () => {
    const { country, error } = useSelector(state => state.search)

    const renderDetails = () => {
        return (
            <ul className={classes.List}>
                <li>
                    <label>Name:</label>
                    <p>{country.name}</p>
                </li>
                <li>
                    <label>Capital:</label>
                    <p>{country.capital}</p>
                </li>
                <li>
                    <label>Population:</label>
                    <Statistic value={country.population} />
                </li>
                <li>
                    <label>{country.currencies.length > 1 ? 'Currencies' : 'Currency'}:</label>
                    <p>{country.currencies?.map(currency => currency.name).join(', ')}</p>
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
                Object.keys(country).length > 0 ?
                    renderDetails() :
                    <Empty description={getEmptyDescription()} />
            }
        </div>
    )
}

export default Details