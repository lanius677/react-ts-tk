import React from 'react'
import ReactDOM from 'react-dom/client'
import '@/assets/styles/reset.scss'
import '@/assets/styles/iconfont.scss'
import '@/assets/styles/common.scss'



//使用路由
import { RouterProvider } from 'react-router-dom';
import { router } from '@/router/index';

import { Suspense } from 'react';

// 导入store
import store from './store/index'
// 导入store提供组件Provider
import { Provider } from 'react-redux'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Suspense>
      <Provider store={store}>
        <RouterProvider router={router}></RouterProvider>
      </Provider>
    </Suspense>
  </React.StrictMode>,
)
