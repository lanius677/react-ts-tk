import styles from './Exception.module.scss';
import { Row, Button, Select, Space, Col, Empty, Timeline, Card } from 'antd';
import { Link } from 'react-router-dom';

let date = new Date()
let year = date.getFullYear()
let month = date.getMonth()

//TimeLine的item
const attendanceLineItem = [{
  color: 'blue',
  children: (
    <>
      <h3>2023/6/31</h3>
      <Card className={styles['exception-card']}>
        <Space>
          <h4>旷工</h4>
          <p>考勤详情，暂无打卡记录</p>
        </Space>
      </Card>
    </>
  ),
},
{
  color: 'blue',
  children: (
    <>
      <h3>2023/7/1</h3>
      <Card className={styles['exception-card']}>
        <Space>
          <h4>旷工</h4>
          <p>考勤详情，暂无打卡记录</p>
        </Space>
      </Card>
    </>
  ),
}];

// 审批的LineTime
const approvalLineItem = [{
  color: 'blue',
  children: (
    <>
      <h3>事假</h3>
      <Card className={styles['exception-card']}>
          <h4>待审批</h4>
          <p className={styles['exception-content']}>
            申请日期 xxxxxxx - xxxxxxx
          </p>
          <p className={styles['exception-content']}>
            申请详情
          </p>
      </Card>
    </>
  )
},
{
  color: 'blue',
  children: (
    <>
      <h3>事假</h3>
      <Card className={styles['exception-card']}>
          <h4>待审批</h4>
          <p className={styles['exception-content']}>
            申请日期 xxxxxxx - xxxxxxx
          </p>
          <p className={styles['exception-content']}>
            申请详情
          </p>
      </Card>
    </>
  )
}]
const Exception = () => {

  const handleChange = () => {

  }

  //月份
  const monthOption = []
  for (let i = 0; i < 12; i++) {
    monthOption.push(<Select.Option key={i} value={i}>{i + 1}月</Select.Option>)
  }

  return (
    <div>
      {/* 头部header */}
      <Row className={styles.exception} justify="space-between" align="middle">
        <Link to='/apply'>
          <Button type='primary'>
            异常处理
          </Button>
        </Link>
        <Space>
          <Button>{year}年</Button>
          <Select value={month} onChange={handleChange}>
            {monthOption}
          </Select>
        </Space>
      </Row>

      {/* 内容content */}
      <Row className={styles['exception-line']} gutter={20}>
        <Col span={12}>
          {/* <Empty description="暂无异常考勤" imageStyle={{ height: 200 }}></Empty> */}
          <Timeline items={attendanceLineItem}></Timeline>
        </Col>

        <Col span={12}>
          {/* <Empty description="暂无申请审批" imageStyle={{ height: 200 }}></Empty> */}
          <Timeline items={approvalLineItem}></Timeline>

        </Col>
      </Row>
    </div>
  )
}

export default Exception