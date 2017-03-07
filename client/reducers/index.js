import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'

import auth from './auth'
import transactions from './transactions'
import expenditure from './expenditure'
import income from './income'

const rootReducer = combineReducers({
  auth,
  transactions,
  expenditure,
  income,
  routing: routerReducer
})

export default rootReducer
