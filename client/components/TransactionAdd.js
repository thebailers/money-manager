import React, { Component, PropTypes } from 'react';
import { reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import { addTransaction } from '../actions/actionCreators';

import numeral from 'numeral';
import moment from 'moment';

class TransactionAdd extends Component {

	onSubmit(props) {
		console.log(props);
		this.props.addTransaction(props)
			.then(() => {
				this.context.router.push('/');
			});
	}

	static contextTypes = {
		router: PropTypes.object
	}

	render() {

		const { fields: { name, amount, date }, handleSubmit } = this.props;

		return (
			<section>
				<h2>Add Transaction <Link className="actionlink" to="/">Go back</Link></h2>
				<form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
					<label>Name</label>
					<input type="text" {...name} />
					<div className="text-help">{name.touched ? name.error : ''}</div>

					<label>Date</label>
					<input type="date" {...date} />
					<div className="text-help">{date.touched ? date.error : ''}</div>

					<label>Amount</label>
					<input type="text" {...amount} />
					<div className="text-help">{amount.touched ? amount.error : ''}</div>

					<button type="submit">Add</button>

				</form>
			</section>
		);		
	}
}

function validate(values) {
	const errors = {};

	if (!values.name) {
		errors.name = 'Please briefly describe the transaction.'
	}

	if (!values.date) {
		errors.date = 'Please enter a date for your transaction.'
	}

	if (!values.amount) {
		errors.amount = 'What was the value of the transaction?'
	}

	return errors;

}

export default reduxForm({
	form: 'AddTransaction',
	fields: ['name', 'date', 'amount'],
	validate
}, null, { addTransaction })(TransactionAdd);




