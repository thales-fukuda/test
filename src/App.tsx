import React from 'react'
import { Provider } from 'react-redux'

import Table from './Table'
import GlobalStyle from './style/GlobalStyle'
import store from './redux/store'

const App = (): JSX.Element => (
  <Provider store={store}>
    <GlobalStyle />
    <Table />
  </Provider>
)

export default App
