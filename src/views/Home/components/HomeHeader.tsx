import React from 'react'
import style from '@/views/Home/Home.module.sass'
import classNames from 'classnames'

import type { MenuProps } from 'antd';
import { Dropdown, Badge, Space, Avatar } from 'antd';
import { BellTwoTone } from '@ant-design/icons'


const HomeHeader = () => {
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
        <span>退出</span>
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
            admin <Avatar src={<img src='https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg' alt="avatar" />} />
          </Space>
        </Dropdown>
      </div>
    </div>
  )
}

export default HomeHeader