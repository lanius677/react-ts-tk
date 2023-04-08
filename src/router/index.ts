import { createBrowserRouter } from 'react-router-dom';
import { RouteObject } from 'react-router-dom';
import { CopyOutlined, CalendarOutlined, WarningOutlined, FileAddOutlined, ScanOutlined } from '@ant-design/icons';

import { ReactNode, createElement, lazy } from 'react';


//页面懒加载
const Home = lazy(() => import('@/views/Home/Home'))
const Sign = lazy(() => import('@/views/Sign/Sign'))
const Check = lazy(() => import('@/views/Check/Check'))
const Apply = lazy(() => import('@/views/Apply/Apply'))
const Login = lazy(() => import('@/views/Login/Login'))
const Exception = lazy(() => import('@/views/Exception/Exception'))
// 全局路由守卫
const BeforeEach = lazy(() => import('@/components/BeforeEach/BeforeEach'))


// 为react-router组件库扩展接口
declare module 'react-router' {
  interface IndexRouteObject {
    meta?: {
      menu: boolean,
      title?: string,
      icon?: ReactNode,
      auth?: boolean
    }
  }

  interface NonIndexRouteObject {
    meta?: {
      menu: boolean,
      title?: string,
      icon?: ReactNode,
      auth?: boolean
    }
  }
}

const routes: RouteObject[] = [
  {
    path: '/',
    element: createElement(BeforeEach,null,createElement(Home)),
    meta: {
      menu: true,
      title: '考勤管理',
      icon: createElement(CopyOutlined),
      auth: false
    },
    children: [
      {
        path: 'apply',
        element: createElement(Apply),
        meta: {
          menu: true,
          title: '添加考勤审批',
          icon: createElement(FileAddOutlined),
          auth: true
        },
      },
      {
        path: 'check',
        element: createElement(Check),
        meta: {
          menu: true,
          title: '我的考勤审批',
          icon: createElement(ScanOutlined),
          auth: true
        },
      },
      {
        path: 'sign',
        element: createElement(Sign),
        meta: {
          menu: true,
          title: '在线打卡签到',
          icon: createElement(CalendarOutlined),
          auth: true
        },
      },
      {
        path: 'exception',
        element: createElement(Exception),
        meta: {
          menu: true,
          title: '异常考勤管理',
          icon: createElement(WarningOutlined),
          auth: true
        },
      },
    ]
  },
  {
    path: 'login',
    element: createElement(BeforeEach,null,createElement(Login)),

  },
]

const router = createBrowserRouter(routes)

export  {router,routes}