import styles from './Sign.module.sass';
import { Button, Calendar, Col, Descriptions, Row, Select, Space, Tag, Typography, message } from 'antd'
import 'dayjs/locale/zh-cn';
import locale from 'antd/es/date-picker/locale/zh_CN';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '@/store/index';
import _ from 'lodash';
import { getTimeAction, putTimeAction, updateInfos } from '@/store/modules/signs';

import type { Dayjs } from 'dayjs';
import { toZero } from '@/utils/common';

const Sign = () => {

  // 响应式打卡信息
  enum DetailKey {
    normal = '正常出勤',
    absent = '旷工',
    miss = '漏打卡',
    late = '迟到',
    early = '早退',
    lateAndEarly = '迟到并早退',
  }

  const originDateilValue: Record<keyof typeof DetailKey, number> = {
    normal: 0,
    absent: 0,
    miss: 0,
    late: 0,
    early: 0,
    lateAndEarly: 0,
  }

  const originDetailState = {
    type: 'success' as 'success' | 'error',
    text: '正常' as '正常' | '异常'
  }

  // 列表数据渲染
  const [dateilValue, setDateilValue] = useState({ ...originDateilValue })
  const [detailState, setDetailState] = useState({ ...originDetailState })


  // 获取共享状态信息
  const signsInfos = useSelector((state: RootState) => state.signs.infos)
  const usersInfos = useSelector((state: RootState) => state.users.infos)
  const dispatch = useAppDispatch()
  useEffect(() => {

    if (_.isEmpty(signsInfos)) {
      //如果signInfos为空，获取当前user的打卡信息
      dispatch(getTimeAction({ userid: usersInfos._id as string })).then((action) => {
        const { errcode, infos } = (action.payload as { [index: string]: unknown }).data as { [index: string]: string & number }
        if (errcode === 0) {
          //将打卡信息同步到状态管理
          dispatch(updateInfos(infos))
        }

      })
    }

  }, [signsInfos, dispatch, usersInfos])
  // console.log('signInfos', signsInfos)

  // 响应式年月分控制
  const date = new Date()
  const [months, setMonth] = useState(date.getMonth())
  const [years, setYears] = useState(date.getFullYear())

  const navigate = useNavigate()
  const hadnleToException = () => {
    navigate(`/exception?month=${months+1}`)
  }

  // const arrTest = Object.entries(DetailKey)
  // console.log(arrTest)

  // 渲染签到日期
  const dateCellRender = (value: Dayjs) => {

    // console.log('value', value.month()+1)
    const month = signsInfos.time && (signsInfos.time as { [index: string]: string | number })[toZero(value.month() + 1)]

    const date = month && (month as { [index: string]: string | number })[toZero(value.date() + 1)]

    // console.log('date',date)

    let ret = ''

    if (Array.isArray(date)) {
      ret = date.join(' - ')
    }

    return (
      <div>{ret}</div>
    )
  }


  // 列表渲染
  useEffect(() => {
    console.log('signsInfos.detail',signsInfos)
    if (signsInfos.detail) {
      const detailMonth = (signsInfos.detail as { [index: string]: unknown })[toZero(months + 1)] as { [index: string]: unknown }
      // console.log('detailMonth',detailMonth) 
      for (let attr in detailMonth) {
        switch (detailMonth[attr]) {
          case DetailKey.normal:
            originDateilValue.normal++
            break;
          case DetailKey.absent:
            originDateilValue.absent++
            break;
          case DetailKey.early:
            originDateilValue.early++
            break;
          case DetailKey.late:
            originDateilValue.late++
            break;
          case DetailKey.lateAndEarly:
            originDateilValue.lateAndEarly++
            break;
          case DetailKey.miss:
            originDateilValue.miss++
            break;
        }
      }
      setDateilValue({ ...originDateilValue })
      for (let attr in originDateilValue) {
        if (attr !== 'normal' && originDateilValue[attr as keyof typeof originDateilValue] !== 0) {
          setDetailState({
            type: 'error',
            text: '异常'
          })
        }
      }
    }
    return () => { // 更新前触发或销毁的时候
      setDetailState({
        type: 'success',
        text: '正常'
      })
      for (let attr in originDateilValue) {
        originDateilValue[attr as keyof typeof originDateilValue] = 0
      }
    }
  }, [months, signsInfos])

  // 打卡签到功能
  const handlePutTime = () => {
    dispatch(putTimeAction({ userid: usersInfos._id as string })).then((action) => {
      const { errcode, infos } = (action.payload as { [index: string]: unknown }).data as { [index: string]: string & number }
      if (errcode === 0) {
        //将打卡信息同步到状态管理
        dispatch(updateInfos(infos))
        message.success('签到成功')
      }

    })
  }


  return (
    <div>
      <Descriptions className={styles.descriptions} layout="vertical" bordered column={9}>
        <Descriptions.Item label="月份">{months + 1}月</Descriptions.Item>
        {
          Object.entries(DetailKey).map((v) => {
            return (
              <Descriptions.Item key={v[0]} label={v[1]}>
                {dateilValue[v[0] as keyof typeof DetailKey]}
              </Descriptions.Item>
            )
          })
        }
        <Descriptions.Item label="操作">
          <Button type='primary' ghost size='small' onClick={hadnleToException}>查看详情</Button>
        </Descriptions.Item>
        <Descriptions.Item label="考勤状态">
          <Tag color={detailState.type}>{detailState.text}</Tag>
        </Descriptions.Item>
      </Descriptions>
      <Calendar locale={locale}
        cellRender={dateCellRender}
        headerRender={({ value, type, onChange, onTypeChange }) => {
          const start = 0;
          const end = 12;
          const monthOptions = [];
          for (let i = start; i < end; i++) {
            monthOptions.push(
              <Select.Option key={i} value={i} className="month-item">
                {i + 1}月
              </Select.Option>,
            );
          }

          const year = value.year();
          const options = [];

          for (let i = year - 10; i < year + 10; i += 1) {
            options.push(
              <Select.Option key={i} value={i} className="year-item">
                {i}年
              </Select.Option>,
            );
          }

          return (
            <div style={{ margin: 12 }}>
              <Row justify='space-between'>
                <Button type='primary' onClick={handlePutTime}>在线签到</Button>
                <Space>
                  {/* <Button>{current.year()}年</Button> */}
                  <Select
                    value={years}
                  >
                    {options}
                  </Select>
                  <Select
                    value={months}
                    onChange={(newMonth) => {
                      const now = value.clone().month(newMonth);
                      setMonth(newMonth)
                      onChange(now);
                    }}
                  >{monthOptions}</Select>
                </Space>
              </Row>
            </div>
          )
        }
        }></Calendar>
    </div>
  )
}

export default Sign