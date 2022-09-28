import { h } from 'preact';
import Login from '../../../src/routes/login/index.js';
import { Provider } from 'unistore/preact';
import { store } from '../../../src/config/store/store';
import { fireEvent, screen, waitFor, render } from '@testing-library/preact';
import {setup} from '../../utils/setup.js';
import * as axios from 'axios';
import { getCurrentUrl, route, Router, setUrl  } from 'preact-router';
import App from '../../../src/components/app.js';
import Home from '../../../src/routes/home/index.js';
import userEvent from '@testing-library/user-event'

jest.mock("axios");


describe('Test Login', () => {
	const button = (container) => container.querySelector('#signInButton');

	test('success login', async () => {
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
			expect(getCurrentUrl()).toBe('/homepage');
		})
	  })

	test('failed login', async () => {
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

	test('require to fill the both email and password', async () => {
		render(<Provider store={store}><Login /></Provider>);

		const signIn = screen.getByText('Sign In');
		userEvent.click(signIn);
		await waitFor(() => {
			expect(screen.getAllByText("Required")).toHaveLength(2);
		});
		
	});

	test('email minimum length should be 3', async () => {
		render(<Provider store={store}><Login /></Provider>);
		const emailField = await screen.findByPlaceholderText('john@example.com');
		const signIn = screen.getByText('Sign In');

		userEvent.type(emailField, 'us')
		userEvent.click(signIn);
		await waitFor(() => {
			expect(screen.getByText('Minimum length should be 3'))
		});
	});

	test('password minimum length should be 8', async () => {
		render(<Provider store={store}><Login /></Provider>);
		const passwordField = await screen.findByPlaceholderText('************');
		const signIn = screen.getByText('Sign In');
		
		userEvent.type(passwordField, 'pass')
		userEvent.click(signIn);
		await waitFor(() => {
			expect(screen.getByText('Minimum length should be 8'))
		});
	});
});