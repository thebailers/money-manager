import { createStore, applyMiddleware } from 'redux'
// import ReduxPromise from 'redux-promise'
import thunk from 'redux-thunk'

import rootReducer from './reducers/index'

const configureStore = () => {
  const store = createStore(
    rootReducer,
    // applyMiddleware(ReduxPromise)
    applyMiddleware(thunk)
  )
  return store
}

export default configureStore
