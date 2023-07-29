import { Button, Divider, Input, Radio, RadioChangeEvent, Row, Space, Table } from 'antd';
import styles from './Check.module.scss';
import { SearchOutlined } from '@ant-design/icons';
import { ChangeEvent, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import { ColumnsType } from 'antd/es/table';
import { Infos } from '@/store/modules/checks';

const Check = () => {

  // 顶部Radio组件选项
  const approverTypes = [
    { label: '全部', value: '全部' },
    { label: '待审批', value: '待审批' },
    { label: '已通过', value: '已通过' },
    { label: '未通过', value: '未通过' },
  ]
  // Radio组件选中值控制
  const defalutApproverTypes = approverTypes[0].value
  const [approverType, setApproverTypes] = useState(defalutApproverTypes)
  // 搜索组件控制
  const [searchWord, setSearchWord] = useState('')

  const checkList = useSelector((state: RootState) => state.chceks.checkList).filter((v) => (v.state === approverType || defalutApproverTypes === approverType) && (v.note as string).includes(searchWord))

  // 搜索点击事件
  const searchWordChage = (ev: ChangeEvent<HTMLInputElement>) => {
    setSearchWord(ev.target.value)
  }

  // Radio组件切换点击事件
  const approverTypeChange = (ev: RadioChangeEvent) => {
    setApproverTypes(ev.target.value)
  }

    // 表头
    const columns: ColumnsType<Infos> = [
      {
        title: '申请人',
        dataIndex: 'applicantname',
        key: 'applicantname',
        width: 180,
      },
      {
        title: '申请事项',
        dataIndex: 'reason',
        key: 'reason',
      },
      {
        title: '时间',
        dataIndex: 'time',
        key: 'time',
        render(_) {
          return _.join(' - ')
        }
      },
      {
        title: '备注',
        dataIndex: 'note',
        key: 'note',
      },
      {
        title: '审批人',
        dataIndex: 'approvername',
        key: 'approvername',
        width: 180
  
      },
      {
        title: '状态',
        dataIndex: 'state',
        key: 'state',
        width: 180
      }
    ];
  

  return (
    <div>
      {/* header 头部 */}
      <Row className={styles['check-title']} justify='end'>
        <Space>
          <Input placeholder='请输入搜索关键' value={searchWord} onChange={searchWordChage} />
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
      <Table rowKey="_id" className={styles['check-table']} columns={columns} dataSource={checkList} bordered size='small' pagination={{ defaultPageSize: 5 }} />;
    </div>
  )
}

export default Check