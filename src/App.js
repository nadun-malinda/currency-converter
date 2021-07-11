import { useState, useCallback } from 'react'
import 'antd/dist/antd.css'
import Main from './hoc/layout/Main/Main'
import CountrySearch from './components/CountrySearch/CountrySearch'
import Converter from './components/Converter/Converter'

function App() {
  const [currencies, setCurrencies] = useState([])

  const handleOnSetCurrencies = useCallback(currencies => {
    setCurrencies(currencies)
  }, [])

  return (
    <Main
      left={
        <CountrySearch onSetCurrencies={handleOnSetCurrencies} />
      }
      right={
        <Converter currencies={currencies} />
      }
    />
  )
}

export default App
