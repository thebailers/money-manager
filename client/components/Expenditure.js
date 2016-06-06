import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actionCreators from '../actions/actionCreators';
import { Link } from 'react-router';
import numeral from 'numeral';

class Expenditure extends Component {
	componentWillMount() {
		this.props.fetchExpenditure();
	}

	render() {

		const { expenditure } = this.props;

		if (!expenditure) {
			return (
					<div>
						<p>Loading...</p>
					</div>
			)
		}


		return (
			<section>
				<h2>Expenditure <Link className="actionlink" to="/">Add</Link></h2>
				<table className="financials">
					<thead>
						<tr>
							<th>Name</th>
							<th>Category</th>
							<th>Withdraw Date</th>
							<th className="activefilter">Amount</th>
							<th className="actions">&nbsp;</th>
							<th className="actions">&nbsp;</th>
						</tr>
					</thead>
					<tbody>
					{this.props.expenditure.map((expenditure) => {
							return (
								<tr key={expenditure._id}>
									<td>{expenditure.name}</td>
									<td>{expenditure.category}</td>
									<td>{expenditure.date}</td>
									<td>{`£${numeral(expenditure.amount).format('£ 0,0[.]00')}`}</td>
									<td><Link to={`/expenditure/edit/${expenditure._id}`} className="button">Edit</Link></td>
									<td><Link to="/edit/:id" className="button">Delete</Link></td>
								</tr>
							);
						})}
					</tbody>
				</table>
			</section>
		 );
	}
}

function mapStateToProps(state) {
	return { 
		expenditure: state.expenditure.all 
	};
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators(actionCreators, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Expenditure);
