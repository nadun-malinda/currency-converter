import PropTypes from 'prop-types'
import { Form, Input, Select, Button, Row, Col } from 'antd'
import { ArrowRightOutlined } from '@ant-design/icons'
import classes from './ConvertForm.module.scss'

// constants
import { FROM_CURRENCY } from '../../../constants'
const { Option } = Select

const ConvertForm = (props) => {
    const {
        formRef,
        amount,
        currency,
        currencies,
        setAmount,
        setCurrency,
        onConvert,
        loading
    } = props

    const handleOnChange = (value) => {
        // amout should be type of number
        setAmount(Number(value))
    }

    return (
        <Form
            ref={formRef}
            initialValues={{ fromCurrency: FROM_CURRENCY }}
            className={classes.Form}
            onFinish={onConvert}>
            <Row>
                <Col span={24}>
                    <label>Amount</label>
                    <Form.Item name="amount">
                        <Input
                            type="number"
                            value={amount}
                            min={0}
                            step="any"
                            allowClear={true}
                            onChange={(event) => handleOnChange(event.target.value)}
                            disabled={!currency} />
                    </Form.Item>
                </Col>
            </Row>
            <Row>
                <Col span={9}>
                    <label>From</label>
                    <Form.Item name="fromCurrency">
                        <Select
                            disabled
                            showArrow={false}
                            className={classes.Select}>
                            <Option value={FROM_CURRENCY}>{FROM_CURRENCY}</Option>
                        </Select>
                    </Form.Item>
                </Col>
                <Col
                    span={6}
                    className={classes.MiddleIcon}>
                    <ArrowRightOutlined className={classes.Icon} />
                </Col>
                <Col span={9}>
                    <label>To</label>
                    <Form.Item name="toCurrency">
                        <Select
                            value={currency}
                            options={currencies.map(currency => ({ value: currency.code }))}
                            onChange={(value) => setCurrency(value)}
                            disabled={!currency}
                            className={classes.Select} />
                    </Form.Item>
                </Col>
            </Row>
            <Row>
                <Col span={24}>
                    <Form.Item name="convert">
                        <Button
                            type="primary"
                            htmlType="submit"
                            block
                            disabled={!(amount > 0) || currency === null}
                            loading={loading}>CONVERT</Button>
                    </Form.Item>
                </Col>
            </Row>
        </Form>
    )
}

ConvertForm.propTypes = {
    formRef: PropTypes.object.isRequired,
    amount: PropTypes.number.isRequired,
    currency: PropTypes.string,
    currencies: PropTypes.array,
    setAmount: PropTypes.func.isRequired,
    setCurrency: PropTypes.func.isRequired,
    onConvert: PropTypes.func.isRequired,
    loading: PropTypes.bool
}
ConvertForm.defaultProps = {
    currency: null,
    currencies: [],
    loading: false
}

export default ConvertForm