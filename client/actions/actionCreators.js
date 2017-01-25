import axios from 'axios'

export const FETCH_TRANSACTIONS = 'FETCH_TRANSACTIONS'
export const FETCH_TRANSACTION = 'FETCH_TRANSACTION'
export const EDIT_TRANSACTION = 'EDIT_TRANSACTION'
export const ADD_TRANSACTION = 'ADD_TRANSACTION'
export const DELETE_TRANSACTION = 'DELETE_TRANSACTION'
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

export const fetchTransactions = () => ({
  type: FETCH_TRANSACTIONS,
  payload: axios.get('/api/transactions')
})

export const fetchTransaction = (id) => ({
  type: FETCH_TRANSACTION,
  payload: axios.get(`/api/transactions/${id}`)
})

export const editTransaction = (id, props) => ({
  type: EDIT_TRANSACTION,
  payload: axios.put(`/api/transactions/${id}`, props)
})

export const addTransaction = (props) => ({
  type: ADD_TRANSACTION,
  payload: axios.post('/api/transactions', props)
})

export const deleteTransaction = (id) => ({
  type: DELETE_TRANSACTION,
  payload: axios.delete(`/api/transactions/${id}`)
})

export const addExpenditure = (props) => ({
  type: ADD_EXPENDITURE,
  payload: axios.post('/api/expenditure', props)
})

export const fetchExpenditure = () => ({
  type: FETCH_EXPENDITURE,
  payload: axios.get('/api/expenditure')
})

export const fetchOneExpenditure = (id) => ({
  type: FETCH_ONE_EXPENDITURE,
  payload: axios.get(`/api/expenditure/${id}`)
})

export const editExpenditure = (id, props) => ({
  type: EDIT_EXPENDITURE,
  payload: axios.put(`/api/expenditure/${id}`, props)
})

export const deleteExpenditure = (id) => ({
  type: DELETE_EXPENDITURE,
  payload: axios.delete(`/api/expenditure/${id}`)
})

export const addIncome = (props) => ({
  type: ADD_INCOME,
  payload: axios.post('/api/income', props)
})

export const fetchIncome = () => ({
  type: FETCH_INCOME,
  payload: axios.get('/api/income')
})

export const fetchOneIncome = (id) => ({
  type: FETCH_ONE_INCOME,
  payload: axios.get(`/api/income/${id}`)
})

export const editIncome = (id, props) => ({
  type: EDIT_INCOME,
  payload: axios.put(`/api/income/${id}`, props)
})

export const deleteIncome = (id) => ({
  type: DELETE_INCOME,
  payload: axios.delete(`/api/income/${id}`)
})
