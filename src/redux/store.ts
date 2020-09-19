import {
  configureStore,
  getDefaultMiddleware,
  combineReducers,
} from '@reduxjs/toolkit'

import httpHandler from './middleware/http-handler'
import { useAppDispatch } from './types'

import tableReducer from './ducks/table'

const reducers = combineReducers({
  table: tableReducer,
})

const store = configureStore({
  reducer: reducers,
  middleware: [
    ...getDefaultMiddleware({
      serializableCheck: false,
      immutableCheck: false,
    }),
    httpHandler,
  ],
})

export default store
export { useAppDispatch }
