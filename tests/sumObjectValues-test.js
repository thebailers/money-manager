import { renderComponent, expect } from './test-helper';
import sumObjectValues from '../client/utils/sumObjectValues';

describe('Sum Object Values', () => {
	it('takes an array of objects, each with amount values, & sums the values', () => {
		const obj = [
			{
				"id": 0,
				"item": "Tesla Model S",
				"amount": 85000
			},
			{
				"id": 1,
				"item": "iPhone 6S",
				"amount": 600
			},
			{
				"id": 2,
				"item": "MacBook Pro",
				"amount": 1700
			}
		];
		expect(sumObjectValues(obj, 'amount')).to.equal(87300);
	});
});