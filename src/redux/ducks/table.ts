import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios'
import { normalize, schema } from 'normalizr'

import { ResponseAction, TableRowInfo } from '../types'

const users = new schema.Entity('users')
const mySchema = { users: [users] }

export interface TableState {
  tableData: TableRowInfo[]
  page: number
}

const initialState: TableState = {
  tableData: [],
  page: 0,
}

const reducer = createSlice({
  name: 'table',
  initialState,
  reducers: {
    requestApi(state: TableState) {
      console.log('requesting...')
    },
    addTableData(state: TableState, action: ResponseAction) {
      const response = action.response
      const normalizedData = normalize(response, mySchema)
      if (normalizedData.entities.users) {
        const users = Object.values(normalizedData.entities.users)
        state.tableData = users
      } else {
        state.tableData = Object.values(normalizedData.result)
      }
    },
    updateError(state: TableState, action: ResponseAction) {
      console.error(action.error)
    },
    deleteElements(state: TableState, action: PayloadAction<number[]>) {
      state.tableData = state.tableData.filter(
        element => !action.payload.includes(element.id)
      )
    },
    updateElement(
      state: TableState,
      action: PayloadAction<{ id: number; value: string }>
    ) {
      const index = state.tableData.findIndex(
        element => element.id === action.payload.id
      )
      state.tableData[index].info.userName = action.payload.value
    },
    updatePage(state: TableState, action: PayloadAction<1 | -1>) {
      console.log(10 * state.page + 1, state.tableData.length)
      if (
        state.page + action.payload < 0 ||
        10 * (state.page + action.payload + 1) > state.tableData.length
      ) {
        return
      }
      state.page = state.page + action.payload
    },
  },
})

export const {
  requestApi,
  addTableData,
  updateError,
  deleteElements,
  updateElement,
  updatePage,
} = reducer.actions

export default reducer.reducer

export const fetchTable = () => {
  const URL = 'http://my-json-server.typicode.com/thales-fukuda/test/db'
  // const URL = 'https://5f6781d638ce8700163986bd.mockapi.io/users/storytellers'
  return {
    type: [requestApi.type, addTableData.type, updateError.type],
    callAPI: () => axios.get(URL),
  }
}
