import http from '@/utils/http'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit';


export type Infos = {
  [index: string]: unknown,
}

export type SignState = {
  infos: Infos
}

type Time = {
  userid: string
}

// 获取打卡信息
const getTimeAction = createAsyncThunk('signs/getTimeAction', async (payload: Time) => {
  const ret = await http.get('/signs/time', payload)
  return ret
})

// 更新打卡信息
const putTimeAction = createAsyncThunk('signs/putTimeAction', async (payload: Time) => {
  const ret = await http.put('/signs/time', payload)
  return ret
})

//使用该类型定义初始 state
const initialState: SignState = {
  infos: {}
}

const signSlice = createSlice({
  // 模块名独一无二
  name: 'signs',
  // `createSlice` 将从 `initialState` 参数推断 state 类型
  initialState,

  // 修改数据的同步方法
  reducers: {
    // 更新Infos
    updateInfos(state, action: PayloadAction<Infos>) {
      state.infos = action.payload
    },
  }
})


export const { updateInfos } = signSlice.actions

export { getTimeAction, putTimeAction }


const reducer = signSlice.reducer
export default reducer

