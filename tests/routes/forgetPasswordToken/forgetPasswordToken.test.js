import { h } from 'preact';
import { screen, waitFor, render } from '@testing-library/preact';
import * as axios from 'axios';
import { getCurrentUrl, route } from 'preact-router';
import App from '../../../src/components/app.js';
import userEvent from '@testing-library/user-event'
import { deleteUserToken, setUserToken } from '../../../src/config/api/auth.js';

jest.mock("axios");

describe('Test Change Password', () => {
	test('try to change password', async () => {
		deleteUserToken()
		let response = {
			"success": true
		}
		axios.post.mockImplementation(() => Promise.resolve({ data: response}));
		
		render(<App/>);
		route('/forget_password?key=abcdef')

		await waitFor(() => {
			expect(screen.getByText('Forget Password'))
		})

		const emailField = await screen.findByPlaceholderText('New Password');
		const submit = screen.getByText('Change Password');
		

		userEvent.type(emailField, 'tes4@gmail.com')
		userEvent.click(submit)

		await waitFor(() => {
			expect(getCurrentUrl()).toBe("/login?isChangePassword=true")
		})
	})

	test('try to change password failed', async () => {
		deleteUserToken()
		axios.post.mockImplementation(() => Promise.reject({
            response: {
                data: {
                    error : "Please choose password that different from your current password"
                }
            }
        }))
		render(<App/>);
		route('/forget_password?key=abcdef')

		await waitFor(() => {
			expect(screen.getByText('Forget Password'))
		})

		const emailField = await screen.findByPlaceholderText('New Password');
		const submit = screen.getByText('Change Password');
		

		userEvent.type(emailField, 'tes4@gmail.com')
		userEvent.click(submit)

		await waitFor(() => {
			expect(screen.getByText('Error: Please choose password that different from your current password'))
		})
	})

	test('try to change password loading when processing', async () => {
		deleteUserToken()
		
		axios.post.mockImplementation(() => {
			return new Promise((_, reject)=> {
				setTimeout(() =>  reject({ 
					response: {
						data: {
							error : "Please choose password that different from your current password"
						}
					}
				}), 3000)
			})
		});

		render(<App />);
		route('/forget_password?key=abcdef')

		await waitFor(() => {
			expect(screen.getByText('Forget Password'))
		})

		const newPasswordField = await screen.findByPlaceholderText('New Password');
		const submit = screen.getByText('Change Password');
		

		userEvent.type(newPasswordField, 'newpass')
		userEvent.click(submit)

		await waitFor(() => {
			expect(screen.getByText('Loading...')).toBeDefined()
		})
	})
	
	test('test key changes on token user', async () => {
		deleteUserToken()
		let response = {
			"success": true
		}
		axios.post.mockImplementation(() => Promise.resolve({ data: response}));
		
		render(<App/>);
		route('/forget_password?key=abcdef')

		await waitFor(() => {
			expect(screen.getByText('Forget Password'))
		})

		const emailField = await screen.findByPlaceholderText('New Password');
		const submit = screen.getByText('Change Password');
		

		userEvent.type(emailField, 'tes4@gmail.com')
		userEvent.click(submit)

		await waitFor(() => {
			expect(getCurrentUrl()).toBe("/login?isChangePassword=true")
		})
		route('/forget_password?key=abcd')
	})
});