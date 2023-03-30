import {configureStore} from '@reduxjs/toolkit'

import usersReducer from './modules/users';

export default configureStore({
  reducer:{
    // 注册子模块
    usersReducer
  }
})