import { createStore, compose } from 'redux';
import { syncHistoryWithStore } from 'react-router-redux';
import { browserHistory } from 'react-router';

// root reducer
import rootReducer from './reducers/index';
import transactionsReducer from './reducers/transactions';
import expenditureReducer from './reducers/expenditure';
import incomeReducer from './reducers/income';

// create an object for the default data
const defaultState = {
  transactions: transactionsReducer,
  expenditure: expenditureReducer,
  income: incomeReducer 

};

const store = createStore(rootReducer, defaultState);
export const history = syncHistoryWithStore(browserHistory, store);

export default store;

