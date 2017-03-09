import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'

import auth from './auth'
import transactions from './transactions'
import expenditure from './expenditure'
import income from './income'
import flashMessages from './flashMessages'

const rootReducer = combineReducers({
  auth,
  transactions,
  expenditure,
  income,
  routing: routerReducer,
  flashMessages
})

export default rootReducer
