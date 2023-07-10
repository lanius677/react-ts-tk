import styles from './Exception.module.scss';
import { Row, Button, Select, Space, Col, Empty, Timeline, Card } from 'antd';
import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '@/store/index';
import _ from 'lodash';
import { Infos, getTimeAction, updateInfos } from '@/store/modules/signs';
import { toZero } from '@/utils/common';


const Exception = () => {
  let date = new Date()
  let year = date.getFullYear()

  // TimeLine的item
  // const attendanceLineItem = [{
  //   color: 'blue',
  //   children: (
  //     <>
  //       <h3>2023/6/31</h3>
  //       <Card className={styles['exception-card']}>
  //         <Space>
  //           <h4>旷工</h4>
  //           <p>考勤详情，暂无打卡记录</p>
  //         </Space>
  //       </Card>
  //     </>
  //   ),
  // },
  // {
  //   color: 'blue',
  //   children: (
  //     <>
  //       <h3>2023/7/1</h3>
  //       <Card className={styles['exception-card']}>
  //         <Space>
  //           <h4>旷工</h4>
  //           <p>考勤详情，暂无打卡记录</p>
  //         </Space>
  //       </Card>
  //     </>
  //   ),
  // }];

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

  // 使用useSearchParams获取到GET传递过来的参数
  const [searchParams, setSearchParams] = useSearchParams()

  const [month, setMonth] = useState(searchParams.get('month') ? Number(searchParams.get('month')) - 1 : date.getMonth())

  const handleChange = (value: number) => {
    setMonth(value)
    setSearchParams({ month: String(value + 1) })
  }

  //月份
  const monthOption = []
  for (let i = 0; i < 12; i++) {
    monthOption.push(<Select.Option key={i} value={i}>{i + 1}月</Select.Option>)
  }

  // 初始数据获取
  const signsInfo = useSelector((state: RootState) => state.signs.infos)
  const usersInfo = useSelector((state: RootState) => state.users.infos)
  const dispatch = useAppDispatch()
  useEffect(() => {
    if (_.isEmpty(signsInfo)) {
      dispatch(getTimeAction({ userid: usersInfo._id as string })).then(
        (action) => {
          const { errcode, infos } = (action.payload as { [index: string]: unknown }).data as { [index: string]: unknown }
          if (errcode === 0) {
            dispatch(updateInfos(infos as Infos))
          }
        }
      )
    }
  }, [signsInfo, usersInfo, dispatch])



  let details;
  if (signsInfo.detail) {
    const detailMonth = (signsInfo.detail as { [index: string]: string })[toZero(month + 1)]
    // console.log('detailMonth',detailMonth)


    details = Object.entries(detailMonth).filter((item) => item[1] !== '正常出勤').sort()

  }
  // console.log('details', details)

  const renderTime=(date:string)=>{
    const res =((signsInfo.time as {[index:string]:unknown})[toZero(month+1)] as {[index:string]:unknown})[date]

    if(Array.isArray(res)){
      return res.join('-')
    }else{
      return '暂无打卡记录'
    }
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
          {
            details
              ?
              <>
                {
                  details.map((item) => {
                    return <Timeline items={[
                      {
                        color: 'blue',
                        children: (
                          <>
                            <h3>{year}/{month + 1}/{item[0]}</h3>
                            <Card className={styles['exception-card']}>
                              <Space>
                                <h4>{item[1]}</h4>
                                <p>考勤详情，{renderTime(item[0])}</p>
                              </Space>
                            </Card>
                          </>
                        ),
                      },

                    ]} key={item[0]}></Timeline>
                  })
                }
              </>
              :
              <Empty description="暂无异常考勤" imageStyle={{ height: 200 }}></Empty>
          }
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