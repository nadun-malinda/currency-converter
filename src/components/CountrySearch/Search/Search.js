// react and redux
import { useState, useEffect, useRef } from 'react'
import { useDispatch } from 'react-redux'
import { searchActions } from '../../../store/search'

// ant design components and icons
import { AutoComplete } from 'antd'
import { SearchOutlined } from '@ant-design/icons'

// custom hooks
import useHttp from '../../../hooks/http'
import useDebounce from '../../../hooks/debounce'

// component styles
import classes from './Search.module.scss'

const Search = () => {
    const [searchText, setSearchText] = useState('')
    const [options, setOptions] = useState([])
    const inputRef = useRef()
    const dispatch = useDispatch()

    // custom hooks call
    const { error, getCountries } = useHttp()
    const debounceSearchText = useDebounce(searchText, 300)

    useEffect(() => {
        if (error) {
            setOptions([])
            dispatch(searchActions.setError(error))
        }
    }, [error, dispatch])

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
        dispatch(searchActions.setCountry(data))
        dispatch(searchActions.setCurrencies(data.currencies))
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

export default Search