import React, { Suspense } from 'react'
import styles from '@/views/Home/Home.module.sass'
import { Outlet } from 'react-router-dom';


const HomeMain = () => {
  return (
    <div>
      <Suspense>
        <Outlet></Outlet>
      </Suspense>
    </div>
  );
}

export default HomeMain