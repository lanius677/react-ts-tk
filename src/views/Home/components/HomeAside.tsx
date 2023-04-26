
import React from 'react'
import styles from '@/views/Home/Home.module.sass'
import { Menu } from 'antd';    
import type { MenuProps } from 'antd'

import { routes } from '@/router/index'
import { useSelector } from 'react-redux';
import type { RootState } from '@/store';
import _ from 'lodash'

import { useLocation, matchRoutes, Link } from 'react-router-dom';



const HomeAside = () => {

  const location=useLocation()
  const matchs=matchRoutes(routes,location)

  console.log('matchs',matchs)

  const subPath=matchs![0].pathnameBase || ''
  const path=matchs![1].pathnameBase || ''


  // 获取到用户的权限
  const permission = useSelector((state: RootState) => state.users.infos.permission) as unknown[]

  // console.log('permission',permission)

  // 使用cloneDeep深拷贝对路由表操作，避免互相引用的问题
  const menus = _.cloneDeep(routes).filter((v) => {
    v.children = v.children?.filter((v) => v.meta?.menu && permission.includes(v.name))

    return v.meta?.menu && permission.includes(v.name)
  })

  console.log('menu', menus)


  const items: MenuProps['items'] = menus.map((v1) => {
    //循环遍历子路由
    const children = v1.children?.map((v2) => {
      return {
        key: v1.path!+v2.path,
        label: <Link to={v1.path!+v2.path}>{v2.meta?.title}</Link>,
        icon: v2.meta?.icon,
      }
    })

    return {
      type: 'divider',
      key: v1.path,
      label: <Link to={v1.path!}>{v1.meta?.title}</Link>,
      icon: v1.meta?.icon,
      children: children
    }
  })
  const onClick: MenuProps['onClick'] = () => {

  }

  return (
    <div>
      <Menu
        onClick={onClick}
        className={styles['home-aside']}
        defaultSelectedKeys={[path]}
        defaultOpenKeys={[subPath]}
        mode="inline"
        items={items}
      />
    </div>
  )
}

export default HomeAside