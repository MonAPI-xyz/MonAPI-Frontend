import { h } from 'preact';
import { screen, waitFor, render } from '@testing-library/preact';
import * as axios from 'axios';
import { route } from 'preact-router';
import App from '../../../src/components/app.js';
import userEvent from '@testing-library/user-event'
import { deleteUserToken, setUserToken } from '../../../src/config/api/auth.js';

jest.mock("axios");

describe('Test Success Sent Email', () => {
	test('try to send email success', async () => {
		deleteUserToken()
		let response = {
			"success": true
		}
		axios.post.mockImplementation(() => Promise.resolve({ data: response}));
		
		render(<App/>);
		route('/forget')

		await waitFor(() => {
			expect(screen.getByText('Forget Password'))
		})

		const emailField = await screen.findByPlaceholderText('john@example.com');
		const submit = screen.getByText('Submit');
		

		userEvent.type(emailField, 'tes4@gmail.com')
		userEvent.click(submit)

		await waitFor(() => {
			expect(screen.getByText('please check your email for reset password link'))
		})
	})
	test('try to send email failed', async () => {
		deleteUserToken()
		axios.post.mockImplementation(() => Promise.reject({
            response: {
                data: {
                    error : "User not exists with given email"
                }
            }
        }))
		
		render(<App/>);
		route('/forget')

		await waitFor(() => {
			expect(screen.getByText('Forget Password'))
		})

		const emailField = await screen.findByPlaceholderText('john@example.com');
		const submit = screen.getByText('Submit');
		

		userEvent.type(emailField, 'tes8@gmail.com')
		userEvent.click(submit)

		await waitFor(() => {
			expect(screen.getByText('User not exists with given email'))
		})
	})
});