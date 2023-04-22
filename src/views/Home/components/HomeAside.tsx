
import React from 'react'
import styles from '@/views/Home/Home.module.sass'
import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
import type { MenuProps } from 'antd'

const HomeAside = () => {

  const onClick: MenuProps['onClick'] = () => {

  }

  const items: MenuProps['items'] = [
    {
      key: '1',
      label: 'Navigation One',
      icon: <MailOutlined />,
      children: [
        {
          key: '2',
          label: '1111',
          icon: <MailOutlined />,
        },
        {
          key: '3',
          label: '2222',
          icon: <AppstoreOutlined />,
        },
        {
          key: '4',
          label: '3333',
          icon: <SettingOutlined />,
        }
      ]
    }
  ]

  return (
    <div>
      <Menu
        onClick={onClick}
        className={styles['home-aside']}
        defaultSelectedKeys={['1']}
        defaultOpenKeys={['sub1']}
        mode="inline"
        items={items}
      />
    </div>
  )
}

export default HomeAside