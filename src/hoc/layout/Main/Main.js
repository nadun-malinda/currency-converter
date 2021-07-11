import { Row, Col } from 'antd'
import classes from './Main.module.scss'
import Left from '../Left/Left'
import Right from '../Right/Right'

const Main = ({ left, right }) => {
    return (
        <div className={classes.Main}>
            <Row className={classes.Row}>
                <Left>
                    {left}
                </Left>
                <Col span={0} md={{ span: 2 }} />
                <Right>
                    {right}
                </Right>
            </Row>
        </div>
    )
}

export default Main