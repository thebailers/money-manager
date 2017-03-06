import React from 'react'
import { render } from 'react-dom'
import Root from './components/Root'
import css from './styles/style.styl' // eslint-disable-line no-unused-vars
import configureStore from './configureStore'
import setAuthToken from './utils/setAuthToken'

const store = configureStore()

setAuthToken(localStorage.getItem('mm-jwtToken'))

render(
  <Root store={store} />,
  document.getElementById('root')
)
