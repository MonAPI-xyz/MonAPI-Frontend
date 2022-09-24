import { h } from 'preact';
import { render } from '@testing-library/preact';
import { fireEvent, screen} from '@testing-library/preact';
import App from '../../src/components/app.js';

describe('Test App', () => {
	
	test('setup app', async () => {
		render(<App/>);
	});

});