import { useState, useCallback } from 'react'
import PropTypes from 'prop-types'
import Search from './Search/Search'
import Details from './Details/Details'
import classes from './CountrySearch.module.scss'

const CountrySearch = ({ onSetCurrencies }) => {
    const [countryData, setCountryData] = useState({})
    const [searchError, setSearchError] = useState(null)

    const handleSelectCountry = useCallback((countryData) => {
        setCountryData(countryData)
        onSetCurrencies(countryData.currencies)
    }, [onSetCurrencies])

    const handleSearchError = useCallback(error => {
        setSearchError(error)
    }, [])

    return (
        <div className={classes.CountrySearch}>
            <Search onSelectCountry={handleSelectCountry} onSearchError={handleSearchError} />
            <Details countryData={countryData} error={searchError} />
        </div>
    )
}

CountrySearch.propTypes = {
    onSetCurrencies: PropTypes.func.isRequired
}

export default CountrySearch