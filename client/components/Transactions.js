import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actionCreators from '../actions/actionCreators';
import { Link } from 'react-router';
import numeral from 'numeral';

import Transaction from './Transaction';
import Total from './Total';
import Remaining from './Remaining';

import sumObjectValues from '../utils/sumObjectValues';

class Transactions extends Component {

	componentWillMount() {
		this.props.fetchTransactions();
		this.props.fetchExpenditure();
		this.props.fetchIncome();
	}

	handleDelete(id) {
		this.props.deleteTransaction(id)
		  .then(() => {
		    this.props.fetchTransactions();
      });
	}

	static contextTypes = {
		router: PropTypes.object
	}

	render() {

		const { transactions, expenditure, income } = this.props;

		if (!transactions || !expenditure || !income) {
			return (
					<div>
						<p>Loading...</p>
					</div>
			)
		}

		const transactionsTotal = sumObjectValues(transactions, 'amount');
		const expenditureTotal = sumObjectValues(expenditure, 'amount');
		const incomeTotal = sumObjectValues(income, 'amount');

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
							<Transaction {...this.props} key={i} transaction={transaction} delete={this.handleDelete} />
					)}
					</tbody>
				</table>

				<section className="sumtotal">
					<Total value={transactionsTotal} type="Transactions" />
					<Total value={expenditureTotal} type="Expenditure" />
					<Total value={incomeTotal} type="Income" />

					<div className="remaining">
						<span className="label">Remaining</span>
						<span className="value">{`£${numeral((incomeTotal - expenditureTotal) - transactionsTotal).format('£ 0,0[.]00')}`}</span>
					</div>
				</section>

			</section>
		 );
	}
}

function mapStateToProps(state) {
	return {
		transactions: state.transactions.all,
		expenditure: state.expenditure.all,
		income: state.income.all
	};
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators(actionCreators, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Transactions);
