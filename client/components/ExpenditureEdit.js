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

	render() {

		const { expenditure } = this.props;

		if (!expenditure) {
			return (
				<div>Loading...</div>
			);
		}

		return (
			<section>
				<h2>Expenditure <Link className="actionlink" to="/expenditure">Go back</Link></h2>
				<table className="financials -transactions">
					<thead>
						<tr>
							<th>Name</th>
							<th>Category</th>
							<th>Date</th>
							<th>Amount</th>
							<th className="actions">&nbsp;</th>
							<th className="actions">&nbsp;</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td>{expenditure.name}</td>
							<td>{expenditure.name}</td>
							<td>{expenditure.date}</td>
							<td>{`£${numeral(expenditure.amount).format("£ 0,0[.]00")}`}</td>
							<td><Link to={`/expenditure/edit/${expenditure._id}`} className="button">Save</Link></td>
							<td><Link to="/expenditure/edit/:id" className="button">Delete</Link></td>
						</tr>
					</tbody>
				</table>
			</section>
		);
	}
}

function mapStateToProps(state) {
	return {
		expenditure: state.expenditure.expenditure,
		initialValues: state.expenditure.expenditure
	}
}

export default reduxForm({
  form: 'EditExpenditure',
  fields: ['name', 'category', 'type', 'amount', 'date'],
  validate
}, mapStateToProps, { fetchOneExpenditure, editExpenditure })(ExpenditureEdit);
