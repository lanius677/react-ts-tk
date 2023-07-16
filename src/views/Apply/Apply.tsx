import { Button, Divider, Input, Radio, RadioChangeEvent, Row, Space, Table } from 'antd';
import styles from './Apply.module.scss';
import { SearchOutlined } from '@ant-design/icons';
import { ChangeEvent, useEffect, useState } from 'react';
import type { ColumnsType } from 'antd/es/table';
import { getApplyAction, updateApplyList, type Infos } from '@/store/modules/checks';
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '@/store';
import _ from 'lodash';

const Apply = () => {
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
  // 表格数据
  const usersInfos = useSelector((state: RootState) => state.users.infos)
  const applyList = useSelector((state: RootState) => state.chceks.applyList).filter((v) => (v.state === approverType || defalutApproverTypes === approverType) && (v.note as string).includes(searchWord))

  const dispatch = useAppDispatch()
  useEffect(() => {
    if (_.isEmpty(applyList)) {
      dispatch(getApplyAction({ applicantid: usersInfos._id as string })).then((action) => {
        const { errcode, rets } = (action.payload as { [index: string]: unknown }).data as { [index: string]: unknown }
        if (errcode === 0) {
          console.log('rets',rets)
          dispatch(updateApplyList(rets as Infos[]))
        }
      })
    }
  }, [applyList, usersInfos, dispatch])

  // Radio组件切换点击事件
  const approverTypeChange = (ev: RadioChangeEvent) => {
    setApproverTypes(ev.target.value)
  }

  // 搜索点击事件
  const searchWordChage = (ev: ChangeEvent<HTMLInputElement>) => {
    setSearchWord(ev.target.value)
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
      render(_){
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
      <Row className={styles['apply-title']} justify="space-between">
        <Button type='primary'>添加审批</Button>
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
      <Table rowKey="_id" className={styles['apply-table']} columns={columns} dataSource={applyList} bordered size='small' pagination={{ defaultPageSize: 5 }} />;
    </div>
  )
}

export default Apply