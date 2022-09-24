import { h } from 'preact';
import { render } from '@testing-library/preact';
import { fireEvent, screen} from '@testing-library/preact';
import Home from '../../../src/routes/home/index.js';

describe('Test Home', () => {
	
	test('setup home', async () => {
		render(<Home/>);
        expect(screen.getByText('MonAPI'));
	});

});