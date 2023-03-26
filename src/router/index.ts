import {createBrowserRouter} from 'react-router-dom';
import {RouteObject} from 'react-router-dom';

import {createElement, lazy} from 'react';

const Home=lazy(()=>import('@/views/Home/Home'))
const Sign=lazy(()=>import('@/views/Sign/Sign'))
const Check=lazy(()=>import('@/views/Check/Check'))
const Apply=lazy(()=>import('@/views/Apply/Apply'))
const Login=lazy(()=>import('@/views/Login/Login'))
const routes:RouteObject[]=[
  {
    path:'/',
    element:createElement(Home),
    children:[
      {
        path:'apply',
        element:createElement(Apply)
      },
      {
        path:'check',
        element:createElement(Check)
      },
      {
        path:'sign',
        element:createElement(Sign)
      },
    ]
  },
  {
    path:'login',
    element:createElement(Login)
  },
]

const router=createBrowserRouter(routes)

export default router