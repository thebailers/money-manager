import React from 'react';
import { render } from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxPromise from 'redux-promise';
import store, { history } from './store'; 

import rootReducer from './reducers/index';
import transactionsReducer from './reducers/transactions';
import expenditureReducer from './reducers/expenditure';
import incomeReducer from './reducers/income';

// Import components
import App from './components/App';
import Expenditure from './components/Expenditure';
import ExpenditureEdit from './components/ExpenditureEdit';
import ExpenditureAdd from './components/ExpenditureAdd';
import Income from './components/Income';
import IncomeEdit from './components/IncomeEdit';
import IncomeAdd from './components/IncomeAdd';
import Transactions from './components/Transactions';
import TransactionEdit from './components/TransactionEdit';
import TransactionAdd from './components/TransactionAdd';

// import css
import css from './styles/style.styl';

// const createStoreWithMiddleware = applyMiddleware(ReduxPromise)(createStore);

const createStoreWithMiddleware = createStore(
  rootReducer,
  {
    transactions: transactionsReducer,
    expenditure: expenditureReducer,
    income: incomeReducer
  },
  applyMiddleware(ReduxPromise)
)

const router = (
  <Provider store={createStoreWithMiddleware}>
    <Router history={history}>
      <Route path="/" component={App}>
        <IndexRoute component={Transactions} />
        <Route path="/expenditure" component={Expenditure} />
        <Route path="/expenditure/edit/:id" component={ExpenditureEdit} />
        <Route path="/expenditure/add" component={ExpenditureAdd} />
        <Route path="/income" component={Income} />
        <Route path="/income/edit/:id" component={IncomeEdit} />
        <Route path="/income/add" component={IncomeAdd} />
        <Route path="/transaction/edit/:id" component={TransactionEdit} />
        <Route path="/transactions/add" component={TransactionAdd} />
      </Route>
    </Router>
  </Provider>
);

render(router, document.getElementById('root'));
