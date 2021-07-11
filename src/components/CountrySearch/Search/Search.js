import { useState, useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import { AutoComplete } from 'antd'
import { SearchOutlined } from '@ant-design/icons'
import useHttp from '../../../hooks/http'
import useDebounce from '../../../hooks/debounce'
import classes from './Search.module.scss'

const Search = ({ onSelectCountry, onSearchError }) => {
    const [searchText, setSearchText] = useState('')
    const [options, setOptions] = useState([])
    const inputRef = useRef()

    // custom hooks
    const { error, getCountries } = useHttp()
    const debounceSearchText = useDebounce(searchText, 500)

    useEffect(() => {
        if (error) {
            setOptions([])
            onSearchError(error)
        }
    }, [error, onSearchError])

    useEffect(() => {
        if (debounceSearchText === '') {
            setOptions([])
            return
        }

        if (debounceSearchText) {
            const query = `${debounceSearchText}?fields=name;capital;currencies;population`
            getCountries(`/name/${query}`)
                .then(countries => {
                    setOptions(countries.map(country => {
                        return {
                            value: country.name,
                            data: country
                        }
                    }))
                })
        }
    }, [debounceSearchText, getCountries])

    const handleOnSelect = (_, { data }) => {
        onSelectCountry(data)
    }

    const handleOnChange = (value) => {
        setSearchText(value ? value : '')
    }

    return (
        <div className={classes.Search}>
            <SearchOutlined className={classes.SearchIcon} />
            <AutoComplete
                ref={inputRef}
                size="large"
                value={searchText}
                options={options}
                allowClear={true}
                style={{ width: '100%' }}
                onSelect={handleOnSelect}
                onChange={handleOnChange}
                placeholder="Search for a country" />
        </div>
    )
}

Search.propTypes = {
    onSelectCountry: PropTypes.func.isRequired,
    onSearchError: PropTypes.func.isRequired
}

export default Search