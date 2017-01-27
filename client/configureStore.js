import { createStore, applyMiddleware } from 'redux'
import ReduxPromise from 'redux-promise'

import rootReducer from './reducers/index'

const configureStore = () => {
  const store = createStore(
    rootReducer,
    applyMiddleware(ReduxPromise)
  )

  return store
}

export default configureStore
