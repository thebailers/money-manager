import { createStore, applyMiddleware } from 'redux'
import ReduxPromise from 'redux-promise'

import rootReducer from './reducers/index'
import transactionsReducer from './reducers/transactions'
import expenditureReducer from './reducers/expenditure'
import incomeReducer from './reducers/income'

const configureStore = () => {
  const store = createStore(
    rootReducer,
    {
      transactions: transactionsReducer,
      expenditure: expenditureReducer,
      income: incomeReducer
    },
    applyMiddleware(ReduxPromise)
  )

  return store
}

export default configureStore
