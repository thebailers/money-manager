import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'

import transactions from './transactions'
import expenditure from './expenditure'
import income from './income'

const rootReducer = combineReducers({
  transactions,
  expenditure,
  income,
  routing: routerReducer
})

export default rootReducer
