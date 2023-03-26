import React from 'react'
import ReactDOM from 'react-dom/client'
import '@/assets/styles/reset.scss'
import '@/assets/styles/iconfont.scss'
import '@/assets/styles/common.scss'

//使用路由
import {RouterProvider} from 'react-router-dom';
import router from '@/router/index';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router}></RouterProvider>
  </React.StrictMode>,
)
