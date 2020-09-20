import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios'
import { normalize, schema } from 'normalizr'

import { ResponseAction, TableRowInfo } from '../types'

const users = new schema.Entity('users')
const mySchema = { users: [users] }

export interface TableState {
  isLoading: boolean
  tableData: TableRowInfo[]
  page: number
}

const initialState: TableState = {
  isLoading: false,
  tableData: [],
  page: 0,
}

const reducer = createSlice({
  name: 'table',
  initialState,
  reducers: {
    requestApi(state: TableState) {
      state.isLoading = true
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

      state.isLoading = false
    },
    updateError(state: TableState, action: ResponseAction) {
      console.error(action.error)
      state.isLoading = false
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
      if (
        state.page + action.payload < 0 ||
        10 * (state.page + action.payload + 1) > state.tableData.length + 10 ||
        10 * (state.page + action.payload + 1) === state.tableData.length
      ) {
        return
      }
      state.page = state.page + action.payload
    },
    updateVerification(
      state: TableState,
      action: PayloadAction<{ id: number; verification: boolean }>
    ) {
      const index = state.tableData.findIndex(
        element => element.id === action.payload.id
      )
      state.tableData[index].info.verification = action.payload.verification
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
  updateVerification,
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
