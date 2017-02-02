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
import Transactions from './Transactions'
import TransactionEdit from './TransactionEdit'
import TransactionAdd from './TransactionAdd'

const Root = ({ store }) => (
  <Provider store={store}>
    <Router history={history}>
      <Route path='/' component={App}>
        <IndexRoute component={Transactions} />
        <Route path='/expenditure' component={Expenditure} />
        <Route path='/expenditure/edit/:id' component={ExpenditureEdit} />
        <Route path='/expenditure/add' component={ExpenditureAdd} />
        <Route path='/income' component={Income} />
        <Route path='/income/edit/:id' component={IncomeEdit} />
        <Route path='/income/add' component={IncomeAdd} />
        <Route path='/transaction/edit/:id' component={TransactionEdit} />
        <Route path='/transactions/add' component={TransactionAdd} />
      </Route>
    </Router>
  </Provider>
)

Root.propTypes = {
  store: React.PropTypes.object
}

export default Root