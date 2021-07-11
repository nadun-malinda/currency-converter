import PropTypes from 'prop-types'
import { Col } from 'antd'

const Right = ({ children }) => {
    return (
        <Col span={24} md={{ span: 11 }}>
            {children}
        </Col>
    )
}

Right.propTypes = {
    children: PropTypes.element.isRequired
}

export default Right