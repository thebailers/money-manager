import React, { Component } from 'react';
import { Link } from 'react-router';

export default class Navigation extends Component {
	render() {
		return (
			<nav>
				<ul className="subnav">
					<li className="active"><Link to="/">Dashboard</Link></li>
					<li><Link to="/expenditure">Expenditure</Link></li>
					<li><Link to="/income">Income</Link></li>
				</ul>
			</nav>
		);
	}
}