import React, { Component } from 'react';
import numeral from 'numeral';

export default class SumTotal extends Component {
	render() {

		const { data, type } = this.props;

		if (!data) {
			return (
				<div>Loading...</div>
			);
		}

		const total = data
			.map((obj) => { return obj.amount; })
			.reduce((prev, next) => { return prev += next; }, 0);

		return(
			<div className="total">
				<span className="label">{type}</span>
				<span className="value">{`£${numeral(total).format('£ 0,0[.]00')}`}</span>
			</div>
		);
	}
}