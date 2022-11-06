import { h } from 'preact';
import { screen, waitFor, render } from '@testing-library/preact';
import * as axios from 'axios';
import { getCurrentUrl, route } from 'preact-router';
import App from '../../../src/components/app.js';
import { setUserToken } from '../../../src/config/api/auth.js';

jest.mock("axios");

describe('Test test API sites', () => {
	test('try to access test API sites', async () => {
		const response = []
		axios.get.mockImplementation(() => Promise.resolve({data: response}))
		setUserToken("token")
		render(<App/>);
		route('/test-api/')

		await waitFor(() => {
			expect(screen.getByText("API Test"))
			expect(getCurrentUrl()).toBe('/test-api/');
		})
	})	
});