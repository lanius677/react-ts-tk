import { AppDispatch } from './../index';
import http from '@/utils/http'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit';


export type Infos = {
  [index: string]: unknown,
}

type CheckState = {
  applyList: Infos[]
  checkList: Infos[]
}

type GetApply = {
  applicantid?: string
  approverid?: string
}

type PostApply = {
  applicantid: string
  applicantname: string,
  approverid: string,
  approvername: string,
  note: string,
  reason: [string, string],
}

type PutApply = {
  _id: string
  state: '已通过' | '未通过'
}

// 获取用户审批信息
const getApplyAction = createAsyncThunk('checks/getApplyAction', async (payload: GetApply) => {
  const ret = await http.get('/checks/apply', payload)
  return ret
})

// 提交用户审批信息
const postApplyAction = createAsyncThunk('checks/postApplyAction', async (payload: PostApply) => {
  const ret = await http.post('/checks/apply', payload)
  return ret
})

// 获取用户审批信息
const putApplyAction = createAsyncThunk('checks/putApplyAction', async (payload: PutApply) => {
  const ret = await http.put('/checks/apply', payload)
  return ret
})



//使用该类型定义初始 state
const initialState: CheckState = {
  applyList: [],
  checkList: []
}

const checkSlice = createSlice({
  // 模块名独一无二
  name: 'checks',
  // `createSlice` 将从 `initialState` 参数推断 state 类型
  initialState,

  // 修改数据的同步方法
  reducers: {
    // 更新Infos
    updateApplyList(state, action: PayloadAction<Infos[]>) {
      state.applyList = action.payload
    },

    updateCheckList(state, action: PayloadAction<Infos[]>) {
      state.checkList = action.payload
    },
  }
})


export const { updateApplyList, updateCheckList } = checkSlice.actions

export { getApplyAction, postApplyAction, putApplyAction }


const reducer = checkSlice.reducer
export default reducer

