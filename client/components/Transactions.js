import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actionCreators from '../actions/actionCreators';
import { Link } from 'react-router';

import Transaction from './Transaction';
import SumTotal from './SumTotal';

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
							<Transaction {...this.props} key={i} transaction={transaction} delete={this.handleDelete} />
					)}
					</tbody>
				</table>

				<section className="sumtotal">
					<SumTotal data={transactions} type="Transactions" />
					{/*<SumTotal data={expenditure} type="Expenditure" />*/}
					{/*<SumTotal data={income} type="Income" />*/}

					<div className="remaining">
						<span className="label">Remaining</span>
						<span className="value">£400</span>
					</div>

					<div className="days">
						<span className="label">Days in Month</span>
						<span className="value">14</span>
					</div>
				</section>


				
				<br />
				<div>Available to spend</div><br />
				<div>Available to spend less current monthly transactions</div><br />
				<div>Days left in the month</div><br /><br />
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
