import React, { Component } from 'react';
import { Link } from 'react-router';
import numeral from 'numeral';
import moment from 'moment';

import TransactionEdit from './TransactionEdit';

export default class Transaction extends Component {
	render() {

		const { transaction } = this.props;

		return (
			<tr>
				<td>{transaction.name}</td>
				<td>{moment(transaction.date).format('Do MMM YYYY')}</td>
				<td>{`£${numeral(transaction.amount).format('£ 0,0[.]00')}`}</td>
				<td><Link to={`/transaction/edit/${transaction._id}`} className="button">Edit</Link></td>
				<td><Link to="/transaction/edit/:id" className="button">Delete</Link></td>
			</tr>
	    );		
	}
}


