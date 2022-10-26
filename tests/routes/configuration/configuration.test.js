import { h, Fragment } from 'preact';
import Login from '../../../src/routes/login/index.js';
import { Provider } from 'unistore/preact';
import { store } from '../../../src/config/store/store';
import { screen, waitFor, render } from '@testing-library/preact';
import * as axios from 'axios';
import { getCurrentUrl, route } from 'preact-router';
import App from '../../../src/components/app.js';
import userEvent from '@testing-library/user-event'
import { deleteUserToken, setUserToken } from '../../../src/config/api/auth.js';

jest.mock("axios");

describe('Test configuration sites', () => {
	test('try to access configuration sites', async () => {
		const response = []
		axios.get.mockImplementation(() => Promise.resolve({data: response}))
		setUserToken("token")
		render(<App/>);
		route('/configuration')

		await waitFor(() => {
			expect(getCurrentUrl()).toBe('/configuration');
		})
	})	
});