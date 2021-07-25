import 'antd/dist/antd.css'
import './sass/styles.scss'
import Main from './hoc/layout/Main/Main'
import CountrySearch from './components/CountrySearch/CountrySearch'
import Converter from './components/Converter/Converter'

function App() {
  return (
    <Main
      left={<CountrySearch />}
      right={<Converter />}
    />
  )
}

export default App
