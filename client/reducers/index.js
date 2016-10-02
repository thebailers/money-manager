import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import { reducer as formReducer } from 'redux-form'

import transactions from './transactions'
import expenditure from './expenditure'
import income from './income'

const rootReducer = combineReducers({
  transactions,
  expenditure,
  income,
  routing: routerReducer,
  form: formReducer
})

export default rootReducer
