import React, { Component } from 'react';
import numeral from 'numeral';

export default class SumTotal extends Component {
	render() {

		const { data } = this.props;

		const total = data
			.map((obj) => { return obj.amount; })
			.reduce((prev, next) => { return prev += next; });

		return(
			<section className="sumtotal">
				Total: {`£${numeral(total).format('£ 0,0[.]00')}`}
			</section>
		);
	}
}