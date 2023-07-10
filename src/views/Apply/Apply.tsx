import { Button, Divider, Input, Radio, RadioChangeEvent, Row, Space } from 'antd';
import styles from './Apply.module.scss';
import { SearchOutlined } from '@ant-design/icons';
import { useState } from 'react';

const Apply = () => {

  const approverTypes = [
    { label: '全部', value: '全部' },
    { label: '待审批', value: '待审批' },
    { label: '已通过', value: '已通过' },
    { label: '未通过', value: '未通过' },
  ]

  // Radio组件选中值控制
  const defalutApproverTypes = approverTypes[0].value
  const [approverType, setApproverTypes] = useState(defalutApproverTypes)


  // Radio组件切换点击事件
  const approverTypeChange=(ev:RadioChangeEvent)=>{
      // console.log('ev',ev)
      setApproverTypes(ev.target.value)
  }
  return (
    <div>
      <Row className={styles['apply-title']} justify="space-between">
        <Button type='primary'>添加审批</Button>
        <Space>
          <Input placeholder='请输入搜索关键'></Input>
          <Button type='primary' icon={<SearchOutlined />}>搜索</Button>
          <Divider style={{ borderLeftColor: 'gray' }} type='vertical' />
          <Radio.Group
            options={approverTypes}
            optionType="button"
            buttonStyle="solid"
            value={approverType}
            onChange={approverTypeChange}
          />
        </Space>
      </Row>
    </div>
  )
}

export default Apply