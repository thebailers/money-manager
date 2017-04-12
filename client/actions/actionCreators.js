import axios from 'axios'
import setAuthToken from '../utils/setAuthToken'
import { setCurrentUser } from './authActions'

export const FETCH_TRANSACTIONS = 'FETCH_TRANSACTIONS'
export const FETCH_TRANSACTION = 'FETCH_TRANSACTION'

export const FETCH_EXPENDITURE = 'FETCH_EXPENDITURE'
export const FETCH_ONE_EXPENDITURE = 'FETCH_ONE_EXPENDITURE'

export const FETCH_INCOME = 'FETCH_INCOME'
export const FETCH_ONE_INCOME = 'FETCH_ONE_INCOME'

export function handleErr (err) {
  if (err.status === 401 || err.status === 404) {
    localStorage.removeItem('mm-jwtToken')
    setAuthToken(false)
    return setCurrentUser({})
  }
}

// Transactions
function fetchTransactionsSuccess (transactions) {
  return {
    type: FETCH_TRANSACTIONS,
    payload: transactions
  }
}

// export const fetchTransactions = (start, end) => dispatch => axios.get(`/api/transactions?start=${start}&end=${end}`)
//   .then(transactions => dispatch(fetchTransactionsSuccess(transactions)))
//   .catch(err => dispatch(handleErr(err)))

export const fetchTransactions = () => dispatch => axios.get('/api/transactions')
  .then(transactions => dispatch(fetchTransactionsSuccess(transactions)))
  .catch(err => dispatch(handleErr(err)))

export const fetchTransaction = id => dispatch => axios.get(`/api/transactions/${id}`)
  .then(transaction => {
    dispatch({
      type: FETCH_TRANSACTION,
      payload: transaction
    })
  })
  .catch(err => dispatch(handleErr(err)))

export const editTransaction = (id, props) => dispatch => axios.put(`/api/transactions/${id}`, props)
export const addTransaction = (props) => dispatch => axios.post('/api/transactions', props)
export const deleteTransaction = (id) => dispatch => axios.delete(`/api/transactions/${id}`)

// Expenditure
export const fetchExpenditure = () => dispatch => axios.get('/api/expenditure')
  .then(expenditure => {
    dispatch({
      type: FETCH_EXPENDITURE,
      payload: expenditure
    })
  }, err => {
    dispatch(handleErr(err))
  })

export const fetchOneExpenditure = (id) => dispatch => axios.get(`/api/expenditure/${id}`)
  .then(expenditure => {
    dispatch({
      type: FETCH_ONE_EXPENDITURE,
      payload: expenditure
    })
  })
  .catch(err => dispatch(handleErr(err)))

export const addExpenditure = (props) => dispatch => axios.post('/api/expenditure', props)
export const editExpenditure = (id, props) => dispatch => axios.put(`/api/expenditure/${id}`, props)
export const deleteExpenditure = (id) => dispatch => axios.delete(`/api/expenditure/${id}`)

// Income
export const fetchIncome = () => dispatch => axios.get('/api/income')
  .then(income => {
    dispatch({
      type: FETCH_INCOME,
      payload: income
    })
  }, err => {
    dispatch(handleErr(err))
  })

export const fetchOneIncome = (id) => dispatch => axios.get(`/api/income/${id}`)
  .then(income => {
    dispatch({
      type: FETCH_ONE_INCOME,
      payload: income
    })
  })
  .catch(err => dispatch(handleErr(err)))

export const addIncome = (props) => dispatch => axios.post('/api/income', props)
export const editIncome = (id, props) => dispatch => axios.put(`/api/income/${id}`, props)
export const deleteIncome = (id) => dispatch => axios.delete(`/api/income/${id}`)
