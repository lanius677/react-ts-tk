import { Button, Divider, Input, Radio, RadioChangeEvent, Row, Space, Table, message } from 'antd';
import styles from './Check.module.scss';
import { CheckOutlined, CloseOutlined, SearchOutlined } from '@ant-design/icons';
import { ChangeEvent, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '@/store';
import { ColumnsType } from 'antd/es/table';
import { Infos, getApplyAction, putApplyAction, updateCheckList } from '@/store/modules/checks';
import _ from 'lodash';

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
  const usersInfos = useSelector((state: RootState) => state.users.infos)


  // 搜索点击事件
  const searchWordChage = (ev: ChangeEvent<HTMLInputElement>) => {
    setSearchWord(ev.target.value)
  }

  // Radio组件切换点击事件
  const approverTypeChange = (ev: RadioChangeEvent) => {
    setApproverTypes(ev.target.value)
  }

  const dispatch = useAppDispatch()
  useEffect(() => {
    if (_.isEmpty(checkList)) {
      dispatch(getApplyAction({ approverid: usersInfos._id as string })).then((action) => {
        const { errcode, rets } = (action.payload as { [index: string]: unknown }).data as { [index: string]: unknown }
        if (errcode === 0) {
          // console.log('rets', rets)
          dispatch(updateCheckList(rets as Infos[]))
        }
      })
    }
  }, [checkList, usersInfos, dispatch])

  // handle操作方法
  const handlePutApply=(_id:string,state:'已通过' | '未通过')=>{
    dispatch(putApplyAction({_id,state})).then((action) => {
      const { errcode } = (action.payload as { [index: string]: unknown }).data as { [index: string]: unknown }
      if (errcode === 0) {
        // console.log('rets', rets)
       message.success('审批成功')

       dispatch(getApplyAction({ approverid: usersInfos._id as string })).then((action) => {
        const { errcode, rets } = (action.payload as { [index: string]: unknown }).data as { [index: string]: unknown }
        if (errcode === 0) {
          // console.log('rets', rets)
          dispatch(updateCheckList(rets as Infos[]))
        }
      })
      }
    })
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
        title: '操作',
        dataIndex: 'handle',
        key: 'handle',
        width: 180,
        render(_,record){
          return (
            <Space>
              <Button type="primary" shape='circle' size='small' icon={<CheckOutlined />} onClick={()=>handlePutApply(record._id as string,'已通过')}></Button>
              <Button type="primary" danger size='small' icon={<CloseOutlined />} onClick={()=>handlePutApply(record._id as string,'未通过')}></Button>
            </Space>
          )
        }
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