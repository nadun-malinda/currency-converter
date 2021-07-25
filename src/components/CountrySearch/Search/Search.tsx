import { useState, useEffect, useRef } from 'react'
import { AutoComplete } from 'antd'
import { SearchOutlined } from '@ant-design/icons'
import useHttp from '../../../hooks/http'
import useDebounce from '../../../hooks/debounce'
import classes from './Search.module.scss'

import { Country } from '../../../types/types'

type PropTypes = {
    onSelectCountry: (countryData: any) => void,
    onSearchError: (error: string) => void
}

type Options = {
    value: string,
    data: object
}

const Search: React.FC<PropTypes> = ({ onSelectCountry, onSearchError }) => {
    const [searchText, setSearchText] = useState<string>('')
    const [options, setOptions] = useState<Options[]>([])
    const inputRef = useRef<HTMLInputElement>(null)

    // custom hooks
    const { error, getCountries } = useHttp()
    const debounceSearchText = useDebounce(searchText, 300)

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
                    setOptions(countries.map((country: Country) => {
                        return {
                            value: country.name,
                            data: country
                        }
                    }))
                })
        }
    }, [debounceSearchText, getCountries])

    const handleOnSelect = (value: string, options: Options) => {
        console.log('options: ', options)
        onSelectCountry(options.data)
    }

    const handleOnChange = (value: string) => {
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
                // @ts-ignore
                onSelect={handleOnSelect}
                onChange={handleOnChange}
                placeholder="Search for a country" />
        </div>
    )
}

export default Search