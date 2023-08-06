import { useState } from 'react';
import http from '@/utils/http';
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

export type Info = {
  [index: string]: unknown
}

type NewsState = {
  info: Info
}


type GetRemind = {
  userid: string
}

type putRemind = {
  userid: string
  applicant?: boolean
  approver?: boolean
}

//更新用户提示操作
const putRemindAction = createAsyncThunk('news/putRemindAction', async (payload: putRemind) => {
  const res = await http.put('/news/remind', payload)
  return res
})

//获取用户提示操作
const getRemindAction = createAsyncThunk('news/getRemindAction', async (payload: GetRemind) => {
  const res = await http.get('/news/remind', payload)
  return res
})



//使用该类型定义初始 state
const initialState: NewsState = {
  info: {}
}

const newsSlice = createSlice({
  // 模块名独一无二
  name: 'news',
  // `createSlice` 将从 `initialState` 参数推断 state 类型
  initialState,

  // 修改数据的同步方法
  reducers: {

    // 更新Info
    updateInfo(state, action: PayloadAction<Info>) {
      state.info = action.payload
    },

  }
})


export const { updateInfo } = newsSlice.actions

export { putRemindAction, getRemindAction }


const reducer = newsSlice.reducer
export default reducer