import PropTypes from 'prop-types'
import { Col } from 'antd'

const Left = ({ children }) => {
    return (
        <Col span={24} md={{ span: 11 }}>
            {children}
        </Col>
    )
}

Left.propTypes = {
    children: PropTypes.element.isRequired
}

export default Left