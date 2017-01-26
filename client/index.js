import React from 'react'
import { render } from 'react-dom'
import Root from './components/Root'
import css from './styles/style.styl' // eslint-disable-line no-unused-vars
import configureStore from './configureStore'

const store = configureStore()

render(
  <Root store={store} />,
  document.getElementById('root')
)
