import { renderComponent, expect } from '../test-helper';
import Total from '../../client/components/Total';

describe('Total Component', () => {

	let component;

	beforeEach(() => {
		component = renderComponent(Total);
	});

	it('has a span with a class of label', () => {
		expect(component.find('span.label')).to.exist;
	});

	it('has a span with the class of value', () => {
		expect(component.find('span.value')).to.exist;
	});
});