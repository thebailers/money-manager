import React from 'react'
import { render } from 'react-dom'
import Root from './components/Root'
import css from './styles/style.styl' // eslint-disable-line no-unused-vars
import configureStore from './configureStore'
import setAuthToken from './utils/setAuthToken'
import jwtDecode from 'jwt-decode'
import { setCurrentUser } from './actions/authActions'

const store = configureStore()

if (localStorage.getItem('mm-jwtToken')) {
  setAuthToken(localStorage.getItem('mm-jwtToken'))
  store.dispatch(setCurrentUser(jwtDecode(localStorage.getItem('mm-jwtToken'))))
}

render(
  <Root store={store} />,
  document.getElementById('root')
)
