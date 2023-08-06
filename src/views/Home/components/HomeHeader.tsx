import React, { ReactNode, useEffect } from 'react'
import style from '@/views/Home/Home.module.sass'
import classNames from 'classnames'

import type { MenuProps } from 'antd';
import { Dropdown, Badge, Space, Avatar } from 'antd';
import { BellTwoTone } from '@ant-design/icons'
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '@/store';
import { clearToken } from '@/store/modules/users';
import { Link, useNavigate } from 'react-router-dom';
import { Info, getRemindAction, updateInfo } from '@/store/modules/news';


const HomeHeader = () => {

  // 获取用户name和头像,id,提醒
  const name = useSelector((state: RootState) => state.users.infos.name) as ReactNode
  const head = useSelector((state: RootState) => state.users.infos.head) as string
  const _id = useSelector((state: RootState) => state.users.infos._id) as string
  const newsInfo=useSelector((state:RootState)=>state.news.info)
  // console.log('header',header)


  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(getRemindAction({ userid: _id })).then((action) => {
      const { errcode, info } = (action.payload as { [index: string]: unknown }).data as { [index: string]: unknown }
      if (errcode === 0) {
        // console.log('rets', rets)
        dispatch(updateInfo(info as Info))
      }
    })
  }, [dispatch,_id])

  // 判断是否点亮
  const isDot=(newsInfo.applicant || newsInfo.approver) as boolean

  // console.log('isDot',isDot)

  // 用户登出
  const navigate = useNavigate()
  const handleLogout = () => {
    dispatch(clearToken())
    setTimeout(() => {
      navigate('/login')
    },2000)
  }

  const items1: MenuProps['items'] = []
  if(newsInfo.applicant){
    items1.push({
      key:'1',
      label:<Link to='/apply'>有审批结果消息</Link>
    })
  }

  if(newsInfo.approver){
    items1.push({
      key:'2',
      label:<Link to='/check'>有审批请求消息</Link>
    })
  }

  if(!newsInfo.applicant && !newsInfo.approver){
    items1.push({
      key:'3',
      label:<div>暂无消息</div>
    })
  }

  const items2: MenuProps['items'] = [
    {
      key: '1',
      label: (
        <span>个人中心</span>
      ),
    },

    {
      key: '2',
      label: (
        <span onClick={handleLogout}>退出</span>
      ),
    },
  ]

  return (
    <div className={style['home-header']}>
      {/* 左侧 LOGO 标题 */}
      <div>
        <span className={style['home-header-logo']}>
          <i className={classNames('iconfont icon-react', style['icon-react'])}></i>
          <i className={classNames('iconfont icon-icon-test', style['icon-icon-test'])}></i>
          <i className={classNames('iconfont icon-typescript', style['icon-typescript'])}></i>
        </span>
        <span className={style['home-header-title']}>在线考勤系统</span>
      </div>
      {/*右侧 提示消息 个人中心 */}
      <div>
        <Dropdown menu={{ items: items1 }} className={style['home-header-bell']} arrow placement="bottom">
          <Badge dot={isDot}>
            <BellTwoTone />
          </Badge>
        </Dropdown>
        <Dropdown menu={{ items: items2 }} className={style['home-header-bell']} arrow placement="bottom">
          <Space>
            {name}
            <Avatar src={<img src='https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg' alt="avatar" />} />
          </Space>
        </Dropdown>
      </div>
    </div>
  )
}

export default HomeHeader