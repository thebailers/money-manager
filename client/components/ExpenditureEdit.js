import React, { Component, PropTypes } from 'react';
import { reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import numeral from 'numeral';
import moment from 'moment';

import { fetchOneExpenditure, editExpenditure } from '../actions/actionCreators';

class ExpenditureEdit extends Component {
	componentWillMount() {
		this.props.fetchOneExpenditure(this.props.params.id);
	}

	onSubmit(props) {
		this.props.editExpenditure(this.props.expenditure._id, props)
			.then(() => {
				this.context.router.push('/expenditure');
			});
	}

	static contextTypes = {
		router: PropTypes.object
	}

	render() {

		const { fields: { name, category, date, amount, type }, handleSubmit, expenditure } = this.props;

		if (!expenditure) {
			return (
				<div>Loading...</div>
			);
		}

		return (
			<section>
				<h2>Expenditure <Link className="actionlink" to="/expenditure">Go back</Link></h2>
				<form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
					<table className="financials -transactions">
						<thead>
							<tr>
								<th>Name</th>
								<th>Category</th>
								<th>Date</th>
								<th>Type</th>
								<th>Amount</th>
								<th className="actions">&nbsp;</th>
								<th className="actions">&nbsp;</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td>{expenditure.name}</td>
								<td>{expenditure.category}</td>
								<td>{expenditure.date}</td>
								<td>{expenditure.type}</td>
								<td>{`£${numeral(expenditure.amount).format("£ 0,0[.]00")}`}</td>
								<td>&nbsp;</td>
								<td>&nbsp;</td>
							</tr>
							<tr>
								<td><input type="text" {...name} /></td>
								<td><input type="text" {...category} /></td>
								<td><input type="text" {...date} /></td>
								<td><input type="text" {...amount} /></td>
								<td><input type="text" {...type} /></td>
								<td><button type="submit" className="button">Save</button></td>
								<td><Link to="/expenditure" className="button">Cancel</Link></td>
							</tr>
							<tr>
								<td><div className="text-help">{name.touched ? name.error : ''}</div></td>
								<td><div className="text-help">{category.touched ? category.error : ''}</div></td>
								<td><div className="text-help">{date.touched ? date.error : ''}</div></td>
								<td><div className="text-help">{amount.touched ? amount.error : ''}</div></td>
								<td><div className="text-help">{type.touched ? type.error : ''}</div></td>
								<td>&nbsp;</td>
								<td>&nbsp;</td>
							</tr>
						</tbody>
					</table>
				</form>
			</section>
		);
	}
}

function validate(values) {
	const errors = {};

	if (!values.name) {
		errors.name = 'Please describe the income.'
	}

	if (!values.category) {
		errors.category = 'Please assign a category.'
	}

	if (!values.date) {
		errors.date = 'Please enter a date for your income payment.'
	}

	if (isNaN(parseFloat(values.date)) && isFinite(values.date)) {
		errors.date = 'The date must just be a number (for now)'
	}

	if (!values.type) {
		errors.type = 'Please enter a type for your income.'
	}

	if (!values.amount) {
		errors.amount = 'What was the value of the income?'
	}

	return errors;

}

function mapStateToProps(state) {
	return {
		expenditure: state.expenditure.expenditure,
		initialValues: state.expenditure.expenditure,
		validate
	}
}

export default reduxForm({
  form: 'EditExpenditure',
  fields: ['name', 'category', 'type', 'amount', 'date']
}, mapStateToProps, { fetchOneExpenditure, editExpenditure })(ExpenditureEdit);
