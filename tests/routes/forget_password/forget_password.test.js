import { h } from 'preact';
import { screen, waitFor, render } from '@testing-library/preact';
import * as axios from 'axios';
import { getCurrentUrl, route } from 'preact-router';
import App from '../../../src/components/app.js';
import userEvent from '@testing-library/user-event'
import { deleteUserToken, setUserToken } from '../../../src/config/api/auth.js';

jest.mock("axios");

describe('Test Success Sent Email', () => {
	test('send email success', async () => {
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
			expect(screen.getByText('Please check your email and follow instruction on the email'))
		})
	})

	test('send forget password email when loading show spinner', async () => {
		deleteUserToken()
		let response = {
			success: true
		}
		axios.post.mockImplementation(() => {
			return new Promise((resolve)=> {
				setTimeout(() =>  resolve({ 
					data: response
				}), 3000)
			})
		});
		
		render(<App />);
		route('/forget')

		await waitFor(() => {
			expect(screen.getByText('Forget Password'))
		})

		const emailField = await screen.findByPlaceholderText('john@example.com');
		const submit = screen.getByText('Submit');
		

		userEvent.type(emailField, 'tes4@gmail.com')
		userEvent.click(submit)

		await waitFor(() => {
			expect(screen.getByText('Loading...')).toBeDefined()
		})
	})
	
	test('send email failed error system', async () => {
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
			expect(screen.getByText('Error: User not exists with given email'))
		})
	})

	test('send email with invalid email address', async () => {
		deleteUserToken()
		axios.post.mockImplementation(() => Promise.reject({
            response: {
                data: {
                    email : ["Please enter valid email address"]
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
			expect(screen.getByText('Error: Please enter valid email address'))
		})
	})

	test('send email with invalid failed unknown error' , async () => {
		deleteUserToken()
		axios.post.mockImplementation(() => Promise.reject({
            response: {
                data: {
                    unknownError: '',
                }
            }
        }))
		
		render(<App />);
		route('/forget')

		await waitFor(() => {
			expect(screen.getByText('Forget Password'))
		})

		const emailField = await screen.findByPlaceholderText('john@example.com');
		const submit = screen.getByText('Submit');
		

		userEvent.type(emailField, 'tes8@gmail.com')
		userEvent.click(submit)

		await waitFor(() => {
			expect(screen.getByText('Error: We have encountered an error. Please contact our team and try again'))
		})
	})
	
	test('click already have account redirect to login', async () => {
		deleteUserToken()
		render(<App/>);
		route('/forget')

		await waitFor(() => {
			expect(screen.getByText('Forget Password')).toBeDefined()
		})

		const loginButton = screen.getByText('Login with your account');
		
		userEvent.click(loginButton)

		await waitFor(() => {
			expect(getCurrentUrl()).toBe('/login')
		})
	})
});