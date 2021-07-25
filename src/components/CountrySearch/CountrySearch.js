import Search from './Search/Search'
import Details from './Details/Details'
import classes from './CountrySearch.module.scss'

const CountrySearch = () => {
    return (
        <div className={classes.CountrySearch}>
            <Search />
            <Details />
        </div>
    )
}

export default CountrySearch