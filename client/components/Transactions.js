import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actionCreators from '../actions/actionCreators';
import { Link } from 'react-router';

import Transaction from './Transaction';

class Transactions extends Component {
	componentWillMount() {
		this.props.fetchTransactions();
	}

	render() {

		const { transactions } = this.props;

		if (!transactions) {
			return (
					<div>
						<p>Loading...</p>
					</div>
			)
		}


		return (
			<section>
				<h2>Transactions <Link className="actionlink" to="/transactions/add">Add</Link></h2>
				<table className="financials -transactions">
					<thead>
						<tr>
							<th>Name</th>
							<th>Date</th>
							<th className="activefilter">Amount</th>
							<th className="actions">&nbsp;</th>
							<th className="actions">&nbsp;</th>
						</tr>
					</thead>
					<tbody>
					{this.props.transactions.map(
						(transaction, i) => 
							<Transaction {...this.props} key={i} i={i} transaction={transaction} />
					)}
					</tbody>
				</table>
			</section>
		 );
	}
}

function mapStateToProps(state) {
	return { 
		transactions: state.transactions.all 
	};
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators(actionCreators, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Transactions);
