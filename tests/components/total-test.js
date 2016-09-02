import { renderComponent, expect } from '../test-helper';
import Total from '../../client/components/Total';

describe('Total Component', () => {
	it('has a span with a class of label', () => {
		const component = renderComponent(Total);
		expect(component.find('span.label')).to.exist;
	});

	it('has a span with the class of value', () => {
		const component = renderComponent(Total);
		expect(component.find('span.value')).to.exist;
	});
});