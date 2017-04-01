import React from 'react'
import { Provider } from 'react-redux'
import { Router, Route, IndexRoute } from 'react-router'
import { history } from '../store'

import App from './App'
import Expenditure from './Expenditure'
import ExpenditureEdit from './ExpenditureEdit'
import ExpenditureAdd from './ExpenditureAdd'
import Income from './Income'
import IncomeEdit from './IncomeEdit'
import IncomeAdd from './IncomeAdd'
import Dashboard from './Dashboard'
import TransactionEdit from './TransactionEdit'
import TransactionAdd from './TransactionAdd'
import ArchivedData from './ArchivedData'
import LoginForm from './LoginForm'
import Signup from './Signup'

import requireAuth from '../utils/requireAuth'

const Root = ({ store }) => (
  <Provider store={store}>
    <Router history={history}>
      <Route path='/' component={App}>
        <IndexRoute component={requireAuth(Dashboard)} />
        <Route path='/expenditure' component={requireAuth(Expenditure)} />
        <Route path='/expenditure/edit/:id' component={requireAuth(ExpenditureEdit)} />
        <Route path='/expenditure/add' component={requireAuth(ExpenditureAdd)} />
        <Route path='/income' component={requireAuth(Income)} />
        <Route path='/income/edit/:id' component={requireAuth(IncomeEdit)} />
        <Route path='/income/add' component={requireAuth(IncomeAdd)} />
        <Route path='/transaction/edit/:id' component={requireAuth(TransactionEdit)} />
        <Route path='/transactions/add' component={requireAuth(TransactionAdd)} />
        <Route path='/archives/:year/:month' component={requireAuth(ArchivedData)} />
        <Route path='/login' component={LoginForm} />
        <Route path='/register' component={Signup} />
      </Route>
    </Router>
  </Provider>
)

Root.propTypes = {
  store: React.PropTypes.object
  // requireAuth: React.PropTypes.func.isRequired
}

export default Root
