import { Button, DatePicker, Divider, Form, Input, Modal, Radio, RadioChangeEvent, Row, Select, Space, Table, message } from 'antd';
import styles from './Apply.module.scss';
import { SearchOutlined } from '@ant-design/icons';
import { ChangeEvent, useEffect, useState } from 'react';
import type { ColumnsType } from 'antd/es/table';
import { getApplyAction, updateApplyList, type Infos, postApplyAction } from '@/store/modules/checks';
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '@/store';
import _ from 'lodash';
import 'dayjs/locale/zh-cn';
import locale from 'antd/es/date-picker/locale/zh_CN';
import * as dayjs from 'dayjs'


const Apply = () => {

  interface FormInfos {
    approvename: string
    note: string
    reason: string
    time: [string, string]
  }

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
          // console.log('rets', rets)
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

  // 弹出框控制
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    handleReset()
  };

  const handleReset = () => {
    form.resetFields()
  }

  // 弹出框表单
  const [form] = Form.useForm()
  const onFinish = (values: FormInfos) => {
    values.time[0] = dayjs(values.time[0]).format('YYYY-MM-DD hh:mm:ss')
    values.time[1] = dayjs(values.time[1]).format('YYYY-MM-DD hh:mm:ss')
    // console.log('Success:', values);
    const applyList = {
      ...values,
      applicantid: usersInfos._id as string,
      applicantname: usersInfos.name as string,
      approverid: Array.isArray(usersInfos.approver) && usersInfos.approver.find((item) => item.name === values.approvename)._id
    }
    console.log(applyList)

    // 使用 postApplyAction 方法提交
    dispatch(postApplyAction(applyList)).then((action) => {
      const { errcode } = (action.payload as { [index: string]: unknown }).data as { [index: string]: unknown }
      console.log(errcode)
      if (errcode === 0) {
        message.success('添加审批成功')
        handleCancel()
        
        // 重新获取数据
        dispatch(getApplyAction({ applicantid: usersInfos._id as string })).then((action) => {
          const { errcode, rets } = (action.payload as { [index: string]: unknown }).data as { [index: string]: unknown }
          if (errcode === 0) {
            // console.log('rets', rets)
            dispatch(updateApplyList(rets as Infos[]))
          }
        })
      }else{
        message.error('添加审批失败')
      }
    })
  };

  const onFinishFailed = (values: any) => {
    console.log('Failed:', values);
  };

  //弹出框时间框
  const { RangePicker } = DatePicker;


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
      <Row className={styles['apply-title']} justify="space-between">
        <Button type='primary' onClick={showModal}>添加审批</Button>
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
      <Modal title="添加审批" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} footer={null}>
        <Form
          name="basic"
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 20 }}
          className={styles['apply-form']}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          form={form}
        >
          <Form.Item
            label="审批人"
            name="approvename"
            rules={[
              { required: true, message: '请选择审批人' }
            ]
            }
          >
            <Select placeholder="请选择审批人" allowClear>
              {/* <Select.Option value="xxx">xxx</Select.Option> */}
              {
                Array.isArray(usersInfos.approver) && usersInfos.approver.map((item) => <Select.Option value={item.name} key={item._id}>{item.name}</Select.Option>)
              }
            </Select>
          </Form.Item>

          <Form.Item
            label="审批事由"
            name="reason"
            rules={[
              { required: true, message: '请选择审批事由' }
            ]
            }
          >
            <Select placeholder="请选择审批事项" allowClear>
              <Select.Option value="年假">年假</Select.Option>
              <Select.Option value="事假">事假</Select.Option>
              <Select.Option value="病假">病假</Select.Option>
              <Select.Option value="外出">外出</Select.Option>
              <Select.Option value="补签卡">补签卡</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item
            label="时间"
            name="time"
            rules={[{ required: true, message: '请选择审批时间' }]}
          >
            <RangePicker size='large' showTime locale={locale}></RangePicker>
          </Form.Item>

          <Form.Item
            label="备注"
            name="note"
            rules={[{ required: true, message: '请选择备注' }]}
          >
            <Input.TextArea rows={4} placeholder='请选择备注'></Input.TextArea>
          </Form.Item>
          <Row justify="end">
            <Space>
              <Button onClick={handleCancel}>取消</Button>
              <Button type='primary' htmlType='submit'>提交</Button>
            </Space>
          </Row>
        </Form>
      </Modal>
    </div>
  )
}

export default Apply