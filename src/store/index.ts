import {configureStore,getDefaultMiddleware  } from '@reduxjs/toolkit'

import usersReducer from './modules/users';
import signsReducer from './modules/signs';

import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import {useDispatch} from 'react-redux';


const persistConfig = {
  key: 'root',
  version: 1,
  storage,
  //添加白名单
  whileList:['token']
}

const store = configureStore({
  reducer:{
    // 注册子模块
    users:persistReducer(persistConfig,usersReducer),
    signs:signsReducer
  },
  middleware:getDefaultMiddleware({
    // serializableCheck: {
    //   ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
    // }
    serializableCheck:false
  })
})
persistStore(store)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>() 

export default store