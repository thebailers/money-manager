import jsdom from 'jsdom';

import { renderComponent, expect } from '../test-helper';
import Transactions from '../../client/components/Transactions';

global.document = jsdom.jsdom('<!doctype html><html><body></body></html>');
global.window = global.document.defaultView;

describe('Transactions Component', () => {

	let component;

	beforeEach(() => {
		component = renderComponent(Transactions);
	});

	it('has a table with the class of financials', () => {
		expect(component.find('table.financials')).to.exist;
	});
});