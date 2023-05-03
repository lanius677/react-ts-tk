import React from 'react'
import styles from '@/views/Home/Home.module.sass'
import { Breadcrumb } from 'antd'
import { Link, matchRoutes, useLocation } from 'react-router-dom'
import { routes } from '@/router'

const HomeBreadCrumb = () => {
  const location = useLocation()
  const matchs = matchRoutes(routes, location)
  // console.log('match',matchs)
  
  const titleArr = matchs?.map((v) => {
    return {
      key: v.pathnameBase,
      title: <Link to={v.pathnameBase}>{v.route.meta?.title}</Link>,
    }
  })
  return (
    <div>
      <Breadcrumb
        className={styles['home-breadcrumb']}
        items={titleArr}
      />
    </div>
  )
}

export default HomeBreadCrumb