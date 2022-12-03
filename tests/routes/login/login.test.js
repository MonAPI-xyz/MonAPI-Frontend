import { h } from 'preact';
import Login from '../../../src/routes/login/index.js';
import { screen, waitFor, render } from '@testing-library/preact';
import * as axios from 'axios';
import { getCurrentUrl, route } from 'preact-router';
import App from '../../../src/components/app.js';
import userEvent from '@testing-library/user-event'
import { deleteUserToken, setUserToken } from '../../../src/config/api/auth.js';

jest.mock("axios");

describe('Test Success Login', () => {
	test('try to login and success login and redirected to dashboard', async () => {
		deleteUserToken()
		let response = {
			"response": "Sign-in successful.",
			"email": "user@gmail.com",
			"token": "d16c4059484867e8d12ff535072509e3f29719e7"
		}
		axios.post.mockImplementation(() => Promise.resolve({ data: response}));
		
		render(<App/>);
		route('/login')
		const emailField = await screen.findByPlaceholderText('john@example.com');
		const passwordField = await screen.findByPlaceholderText('************');
		const signIn = screen.getByText('Sign In');

		userEvent.type(emailField, 'tes4@gmail.com')
		userEvent.type(passwordField, 'Tes12345')
		
		userEvent.click(signIn);

		await waitFor(() => {
			expect(getCurrentUrl()).toBe('/');
		})
	})

	test('when process login then show loader', async () => {
		deleteUserToken()
		let response = {
			"response": "Sign-in successful.",
			"email": "user@gmail.com",
			"token": "d16c4059484867e8d12ff535072509e3f29719e7"
		}

		axios.post.mockImplementation(() => 
			new Promise((resolve)=> {
				setTimeout(() =>  resolve({ 
					data: response
				}), 3000)
			})
		)
		
		render(<App/>);
		route('/login')
		const emailField = await screen.findByPlaceholderText('john@example.com');
		const passwordField = await screen.findByPlaceholderText('************');
		const signIn = screen.getByText('Sign In');

		userEvent.type(emailField, 'tes4@gmail.com')
		userEvent.type(passwordField, 'Tes12345')
		
		userEvent.click(signIn);

		await waitFor(() => {
			expect(screen.getByText('Loading...')).toBeDefined()
		})
	})
});

describe('Test Accessing Routes', () => {
	test('authenticated and try accessing login route', async () => {
		const response = []
		axios.get.mockImplementation(() => Promise.resolve({data: response}))
		setUserToken('d16c4059484867e8d12ff535072509e3f29719e7')
		
		render(<App/>);
		route('/login')

		await waitFor(() => {
			expect(getCurrentUrl()).toBe('/');
		})
	})
})
	
describe('Test Failed Login', () => {
	test('try to login and failed login and keep on login page', async () => {
		deleteUserToken()
		let response = {
			"data": {"response": "Invalid email or password."}
		}
		axios.post.mockImplementation(() => Promise.reject({
			status:401,
			response: response
			})
		);
		render(<App/>);
		route('/login')
		const emailField = await screen.findByPlaceholderText('john@example.com');
		const passwordField = await screen.findByPlaceholderText('************');
		const signIn = screen.getByText('Sign In');

		userEvent.type(emailField, 'tes4@gmail.com')
		userEvent.type(passwordField, 'Tes123425')
		
		userEvent.click(signIn);

		await waitFor(() => {
			expect(screen.getByText('Invalid email or password.'))
			expect(getCurrentUrl()).toBe('/login');
		})
	})
});

describe('Test Form Login', () => {
	test('require to fill the both email and password', async () => {
		render(<Login />);

		const signIn = screen.getByText('Sign In');
		userEvent.click(signIn);
		await waitFor(() => {
			expect(screen.getAllByText("Required")).toHaveLength(2);
		});
		
	});

	test('email minimum length should be 3', async () => {
		render(<Login />);
		const emailField = await screen.findByPlaceholderText('john@example.com');
		const signIn = screen.getByText('Sign In');

		userEvent.type(emailField, 'us')
		userEvent.click(signIn);
		await waitFor(() => {
			expect(screen.getByText('Minimum length should be 3'))
		});
	});

	test('password minimum length should be 8', async () => {
		render(<Login />);
		const passwordField = await screen.findByPlaceholderText('************');
		const signIn = screen.getByText('Sign In');
		
		userEvent.type(passwordField, 'pass')
		userEvent.click(signIn);
		await waitFor(() => {
			expect(screen.getByText('Minimum length should be 8'))
		});
	});

	test('click sign up text span', async () => {
		deleteUserToken();
		render(<App/>);
		route('/login')
		
		userEvent.click(screen.getByText('sign up'));

		await waitFor(() => {
			expect(getCurrentUrl()).toBe('/register');
		})
	})

	test('click forget password text span', async () => {
		deleteUserToken();
		render(<App/>);
		route('/login')

		await waitFor(() => {
			expect(screen.getByText('Forget your password?')).toBeDefined()
		});
		
		userEvent.click(screen.getByText('Forget your password?'));

		await waitFor(() => {
			expect(getCurrentUrl()).toBe('/forget');
		})
	})

	test('successfully registered user is redirected to /login', async() => {
		deleteUserToken()
		render(<App/>);
		route('/login?isRegistered=true')

		await waitFor(async () => {
            expect(screen.getByText('Please verify your account before logging-in by checking your email.'))
		})
	})

	test('successfully change password user is redirected to /login', async() => {
		deleteUserToken()
		render(<App/>);
		route('/login?isChangePassword=true')

		await waitFor(async () => {
            expect(screen.getByText('Password changed successfully. Please login with your new password.'))
		})
	})
});