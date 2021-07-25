import { useState, useCallback } from 'react'
import Search from './Search/Search'
import Details from './Details/Details'
import classes from './CountrySearch.module.scss'
import { Currencies, Error, Country } from '../../types/types'

type PropTypes = {
    onSetCurrencies: (currencies: Currencies) => void
}

const CountrySearch: React.FC<PropTypes> = ({ onSetCurrencies }) => {
    const [countryData, setCountryData] = useState<Country>()
    const [searchError, setSearchError] = useState<Error>(null)

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

export default CountrySearch