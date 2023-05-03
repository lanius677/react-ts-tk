import React, { ReactNode } from 'react'
import style from '@/views/Home/Home.module.sass'
import classNames from 'classnames'

import type { MenuProps } from 'antd';
import { Dropdown, Badge, Space, Avatar } from 'antd';
import { BellTwoTone } from '@ant-design/icons'
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '@/store';
import { clearToken } from '@/store/modules/users';
import { useNavigate } from 'react-router-dom';


const HomeHeader = () => {

  // 获取用户name和头像
  const name = useSelector((state:RootState)=>state.users.infos.name) as ReactNode
  const header = useSelector((state:RootState)=>state.users.infos)
  // console.log('header',header)

  // 用户登出
  const dispatch=useAppDispatch()
  const navigate=useNavigate()
  const handleLogout=()=>{
    dispatch(clearToken())
    setTimeout(()=>{
      navigate('/login')
  })
}

  const items1: MenuProps['items'] = [
    {
      key: '1',
      label: (
        <span>暂无消息</span>
      ),
    },
  ]

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
          <Badge dot>
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