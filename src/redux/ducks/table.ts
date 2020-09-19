import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios'
import { normalize, schema } from 'normalizr'

import { ResponseAction } from '../types'

const id = new schema.Entity('id')
const userId = new schema.Entity('userId')
const title = new schema.Entity('title')
const body = new schema.Entity('body')
const posts = new schema.Entity('posts', {
  id,
  author: userId,
  title,
  body,
})

export interface TableState {
  tableData: any[]
}

const initialState: TableState = {
  tableData: [],
}

const reducer = createSlice({
  name: 'table',
  initialState,
  reducers: {
    requestApi(state: TableState) {
      console.log('requesting...')
    },
    updateTableData(state: TableState, action: ResponseAction) {
      const data = action.response
      const normalizedData = normalize(data, posts)
      console.log(normalizedData)
      state.tableData = data
    },
    updateError(state: TableState, action: ResponseAction) {
      console.error(action.error)
    },
  },
})

export const { requestApi, updateTableData, updateError } = reducer.actions

export default reducer.reducer

export const fetchTable = () => {
  const URL = 'https://jsonplaceholder.typicode.com'
  return {
    type: [requestApi.type, updateTableData.type, updateError.type],
    callAPI: () => axios.get(`${URL}/posts`),
  }
}
