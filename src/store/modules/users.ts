import { useState } from 'react';
import http from '@/utils/http';
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

type Token = string;
type Infos = {
  [index: string]: unknown
}

type UserState = {
  token: Token,
  infos: Infos
}

type Login={
  email:string,
  pass:string
}

//用户登录操作
const loginAction=createAsyncThunk('users/loginAction',async (payload:Login)=>{
  const res=await http.post('/users/login',payload)
  return res
})

//获取用户信息操作
const infosAction=createAsyncThunk('users/infosAction',async ()=>{
  const res=await http.get('/users/infos')
  return res
})



//使用该类型定义初始 state
const initialState: UserState = {
  token: '',
  infos: {}
}

const usersSlice = createSlice({
  // 模块名独一无二
  name: 'users',
  // `createSlice` 将从 `initialState` 参数推断 state 类型
  initialState,

  // 修改数据的同步方法
  reducers: {
    // 更新token
    //使用 PayloadAction 类型声明 `action.payload` 的内容
    updateToken(state,action:PayloadAction<Token>) { 
      state.token=action.payload
    },

    // 更新Infos
    updateInfos(state,action:PayloadAction<Infos>) {
      state.infos=action.payload
     },

    //销毁Infos
    clearToken(state) {
      state.token=''
      state.infos={}
     }

  }
})


export const {updateToken,updateInfos,clearToken}=usersSlice.actions

export {loginAction,infosAction}


const reducer = usersSlice.reducer
export default reducer