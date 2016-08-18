import React, { Component } from 'react';
import { Link } from 'react-router';

import Header from './Header';
import Navigation from './Navigation';

export default class App extends Component {
	render() {
		return (
			<div>
				<Header />
				<Navigation />
				<article className="articlebody">
					{this.props.children}
				</article>
			</div>
		);
	}
}
