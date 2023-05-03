import styles from './Sign.module.scss';
import { Button, Descriptions, Tag } from 'antd'

const Sign = () => {
  return (
    <div>
      <Descriptions layout="vertical" bordered column={9}>
        <Descriptions.Item label="月份">12月</Descriptions.Item>
        <Descriptions.Item label="正常出勤">0</Descriptions.Item>
        <Descriptions.Item label="正常出勤">0</Descriptions.Item>
        <Descriptions.Item label="正常出勤">0</Descriptions.Item>
        <Descriptions.Item label="正常出勤">0</Descriptions.Item>
        <Descriptions.Item label="正常出勤">0</Descriptions.Item>
        <Descriptions.Item label="正常出勤">0</Descriptions.Item>
        <Descriptions.Item label="操作">
          <Button>查看详情</Button>
        </Descriptions.Item>
        <Descriptions.Item label="考勤状态">
          <Tag>正常</Tag>
        </Descriptions.Item>
      </Descriptions>
    </div>
  )
}

export default Sign