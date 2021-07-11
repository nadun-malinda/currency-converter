import PropTypes from 'prop-types'
import { Alert } from 'antd'
import classes from './Error.module.scss'

const Error = ({ message }) => {
    return (
        <Alert
            className={classes.Error}
            message={message}
            type="error"
            showIcon
            closable />
    )
}

Error.propTypes = {
    message: PropTypes.string.isRequired
}

export default Error