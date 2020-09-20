import React from 'react'
import { Provider } from 'react-redux'

import GlobalStyle from './style/GlobalStyle'
import store from './redux/store'

import Home from './pages/Home'

const App = () => {
  return (
    <Provider store={store}>
      <GlobalStyle />
      <Home />
    </Provider>
  )
}

export default App
