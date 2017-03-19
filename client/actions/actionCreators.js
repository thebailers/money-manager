import axios from 'axios'
import setAuthToken from '../utils/setAuthToken'
import { setCurrentUser } from './authActions'

export const FETCH_TRANSACTIONS = 'FETCH_TRANSACTIONS'
export const FETCH_TRANSACTION = 'FETCH_TRANSACTION'

export const FETCH_EXPENDITURE = 'FETCH_EXPENDITURE'
export const FETCH_ONE_EXPENDITURE = 'FETCH_ONE_EXPENDITURE'
export const ADD_EXPENDITURE = 'ADD_EXPENDITURE'
export const EDIT_EXPENDITURE = 'EDIT_EXPENDITURE'
export const DELETE_EXPENDITURE = 'DELETE_EXPENDITURE'
export const FETCH_INCOME = 'FETCH_INCOME'
export const FETCH_ONE_INCOME = 'FETCH_ONE_INCOME'
export const ADD_INCOME = 'ADD_INCOME'
export const EDIT_INCOME = 'EDIT_INCOME'
export const DELETE_INCOME = 'DELETE_INCOME'

function handleErr (err) {
  if (err.status === 401) {
    localStorage.removeItem('mm-jwtToken')
    setAuthToken(false)
    return setCurrentUser({})
  }
}

// Transactions
export const fetchTransactions = () => dispatch => axios.get('/api/transactions')
  .then(transactions => {
    dispatch({
      type: FETCH_TRANSACTIONS,
      payload: transactions
    }) }, err => {
      dispatch(handleErr(err))
    })

export const fetchTransaction = id => dispatch => axios.get(`/api/transactions/${id}`)
  .then(transaction => {
    dispatch({
      type: FETCH_TRANSACTION,
      payload: transaction
    })
  })

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
  })

export const fetchOneExpenditure = (id) => dispatch => axios.get(`/api/expenditure/${id}`)
  .then(expenditure => {
    dispatch({
      type: FETCH_ONE_EXPENDITURE,
      payload: expenditure
    })
  })

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
  })

export const addIncome = (props) => dispatch => axios.post('/api/income', props)
  .then(income => {
    dispatch({
      type: ADD_INCOME,
      payload: income
    })
  })

export const fetchOneIncome = (id) => dispatch => axios.get(`/api/income/${id}`)
  .then(income => {
    dispatch({
      type: FETCH_ONE_INCOME,
      payload: income
    })
  })

export const editIncome = (id, props) => dispatch => axios.put(`/api/income/${id}`, props)
  .then(income => {
    dispatch({
      type: EDIT_INCOME,
      payload: income
    })
  })

export const deleteIncome = (id) => dispatch => axios.delete(`/api/income/${id}`)
  .then(income => {
    dispatch({
      type: DELETE_INCOME,
      payload: income
    })
  })
