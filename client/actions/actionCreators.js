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

export function fetchTransactions () {
  const request = axios.get('/api/transactions')

  return {
    type: FETCH_TRANSACTIONS,
    payload: request
  }
}

export function fetchTransaction (id) {
  const request = axios.get(`/api/transactions/${id}`)

  return {
    type: FETCH_TRANSACTION,
    payload: request
  }
}

export function editTransaction (id, props) {
  const request = axios.put(`/api/transactions/${id}`, props)

  return {
    type: EDIT_TRANSACTION,
    payload: request
  }
}

export function addTransaction (props) {
  const request = axios.post('/api/transactions', props)

  return {
    type: ADD_TRANSACTION,
    payload: request
  }
}

export function deleteTransaction (id) {
  const request = axios.delete(`/api/transactions/${id}`)

  return {
    type: DELETE_TRANSACTION,
    payload: request
  }
}

export function addExpenditure (props) {
  const request = axios.post('/api/expenditure', props)

  return {
    type: ADD_EXPENDITURE,
    payload: request
  }
}

export function fetchExpenditure () {
  const request = axios.get('/api/expenditure')

  return {
    type: FETCH_EXPENDITURE,
    payload: request
  }
}

export function fetchOneExpenditure (id) {
  const request = axios.get(`/api/expenditure/${id}`)

  return {
    type: FETCH_ONE_EXPENDITURE,
    payload: request
  }
}

export function editExpenditure (id, props) {
  const request = axios.put(`/api/expenditure/${id}`, props)

  return {
    type: EDIT_EXPENDITURE,
    payload: request
  }
}

export function deleteExpenditure (id) {
  const request = axios.delete(`/api/expenditure/${id}`)

  return {
    type: DELETE_EXPENDITURE,
    payload: request
  }
}

export function addIncome (props) {
  const request = axios.post('/api/income', props)

  return {
    type: ADD_INCOME,
    payload: request
  }
}

export function fetchIncome () {
  const request = axios.get('/api/income')

  return {
    type: FETCH_INCOME,
    payload: request
  }
}

export function fetchOneIncome (id) {
  const request = axios.get(`/api/income/${id}`)

  return {
    type: FETCH_ONE_INCOME,
    payload: request
  }
}

export function editIncome (id, props) {
  const request = axios.put(`/api/income/${id}`, props)

  return {
    type: EDIT_INCOME,
    payload: request
  }
}

export function deleteIncome (id) {
  const request = axios.delete(`/api/income/${id}`)

  return {
    type: DELETE_INCOME,
    payload: request
  }
}
