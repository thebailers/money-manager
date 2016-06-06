import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import numeral from 'numeral';
import moment from 'moment';

import { fetchOneIncome } from '../actions/actionCreators';

class IncomeEdit extends Component {
	componentWillMount() {
		this.props.fetchOneIncome(this.props.params.id);
	}

	render() {

		const { income } = this.props;

		if (!income) {
			return (
				<div>Loading...</div>
			);
		}

		return (
			<section>
				<h2>Income <Link className="actionlink" to="/income">Go back</Link></h2>
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
							<td>{income.name}</td>
							<td>{income.name}</td>
							<td>{income.date}</td>
							<td>{`£${numeral(income.amount).format("£ 0,0[.]00")}`}</td>
							<td><Link to={`/income/edit/${income._id}`} className="button">Save</Link></td>
							<td><Link to="/income/edit/:id" className="button">Delete</Link></td>
						</tr>
					</tbody>
				</table>
			</section>
		);
	}
}

function mapStateToProps(state) {
	return {
		income: state.income.income
	}
}

export default connect(mapStateToProps, { fetchOneIncome })(IncomeEdit);