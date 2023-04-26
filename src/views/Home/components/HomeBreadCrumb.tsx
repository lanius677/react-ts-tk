import React from 'react'
import styles from '@/views/Home/Home.module.sass'
import { Breadcrumb } from 'antd'

const HomeBreadCrumb = () => {
  return (
    <div>
      <Breadcrumb className={styles['home-breadcrumb']}
        items={[
          {
            title: 'Home',
          },
          {
            title: 'An Application',
          },
        ]}
      />
    </div>
  )
}

export default HomeBreadCrumb