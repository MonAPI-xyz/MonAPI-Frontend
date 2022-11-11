import { h } from 'preact';
import { render, waitFor } from '@testing-library/preact';
import { getCurrentUrl, route } from 'preact-router';
import * as axios from 'axios';

import App from "../../../src/components/app";
import { setUserToken } from "../../../src/config/api/auth";

jest.mock('axios');

describe('Test default redirect', () => {
	test('try to access invalid routes then redirect to login', async () => {
        const response = []
		axios.get.mockImplementation(() => Promise.resolve({data: response}))

		setUserToken('sometoken')

		render(<App />);
		route('/some_invalid_routes')

		await waitFor(() => {
			expect(getCurrentUrl()).toBe("/")
		})
	})
});