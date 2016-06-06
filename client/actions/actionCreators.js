import axios from 'axios';
import moment from 'moment';

export const FETCH_TRANSACTIONS = 'FETCH_TRANSACTIONS';
export const FETCH_TRANSACTION = 'FETCH_TRANSACTION';
export const EDIT_TRANSACTION = 'EDIT_TRANSACTION';
export const ADD_TRANSACTION = 'ADD_TRANSACTION';
export const FETCH_EXPENDITURE = 'FETCH_EXPENDITURE';
export const FETCH_ONE_EXPENDITURE = 'FETCH_ONE_EXPENDITURE';
export const FETCH_INCOME = 'FETCH_INCOME';
export const FETCH_ONE_INCOME = 'FETCH_ONE_INCOME';

function transformDateFormat(json) {
	const transaction = {
		...json,
		id: json.data._id,
		date: new Date(moment(json.data.date).format('yyyy-MM-dd'))
		// date: new Date(json.data.date)
	}
	return transaction;
}

export function fetchTransactions() {
	const request = axios.get('/api/transactions');
	
	return {
		type: FETCH_TRANSACTIONS,
		payload: request 
	}
};

export function fetchTransaction(id) {
	const request = axios.get(`/api/transactions/${id}`);
		// .then(transformDateFormat);

	return {
		type: FETCH_TRANSACTION,
		payload: request 
	}
};

export function editTransaction(id, props) {
	const request = axios.put(`/api/transactions/${id}`, props);
	
	return {
		type: EDIT_TRANSACTION,
		payload: request 
	}
};

export function addTransaction(props) {
	const request = axios.post('/api/transactions', props);

	return {
		type: ADD_TRANSACTION,
		payload: request
	}
}

export function fetchExpenditure() {
	const request = axios.get('/api/expenditure');
	
	return {
		type: FETCH_EXPENDITURE,
		payload: request 
	}
};

export function fetchOneExpenditure(id) {
	const request = axios.get(`/api/expenditure/${id}`);
	
	return {
		type: FETCH_ONE_EXPENDITURE,
		payload: request 
	}
};

export function fetchIncome() {
	const request = axios.get('/api/income');

	return {
		type: FETCH_INCOME,
		payload: request
	}
};

export function fetchOneIncome(id) {
	const request = axios.get(`/api/income/${id}`);
	
	return {
		type: FETCH_ONE_INCOME,
		payload: request 
	}
};