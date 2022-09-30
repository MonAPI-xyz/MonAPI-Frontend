import { h } from 'preact';
import { waitFor, render } from '@testing-library/preact';
import { getCurrentUrl, route } from 'preact-router';
import App from '../../../src/components/app.js';
import { deleteUserToken } from '../../../src/config/api/auth.js';


describe('Test Routes Register', () => {
	test('alow to route to register', async () => {
        deleteUserToken()
		render(<App/>);
		route('/register')

		await waitFor(() => {
			expect(getCurrentUrl()).toBe('/register');
		})
	})
});