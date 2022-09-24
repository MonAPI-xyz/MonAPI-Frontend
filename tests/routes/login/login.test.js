import { h } from 'preact';
import Login from '../../../src/routes/login/index.js';
import { Provider } from 'unistore/preact';
import { store } from '../../../src/config/store/store';
import { fireEvent, screen, waitFor } from '@testing-library/preact';
import {setup} from '../../utils/setup.js';


describe('Test Login', () => {
	
	const button = (container) => container.querySelector('#signInButton');

	test('success login', async () => {
		const { container } = setup(<Provider store={store}><Login /></Provider>);
		const emailField = await screen.findByPlaceholderText('john@example.com');
		const passwordField = await screen.findByPlaceholderText('************');

		// type in the field
		fireEvent.change(emailField, { value: 'user@gmail.com' });
		fireEvent.change(passwordField, { value: 'password123' });
		fireEvent.click(button(container));
		
	
	});

	test('failed login', async () => {
		const { container } = setup(<Provider store={store}><Login /></Provider>);
		const emailField = await screen.findByPlaceholderText('john@example.com');
		const passwordField = await screen.findByPlaceholderText('************');

		fireEvent.change(emailField, { value: 'us' });
		fireEvent.change(passwordField, { value: 'pass' });

		fireEvent.click(button(container));
	});

	test('require to fill the both email and password', async () => {
		const { container } = setup(<Provider store={store}><Login /></Provider>);

		fireEvent.click(button(container));

		await waitFor(() => {
			// getAllByText return array that must have length of 2 (for email and password)
			expect(screen.getAllByText("Wajib diisi")).toHaveLength(2);
		});
		
	});

	test('email minimum length should be 3', async () => {
		const {container, user} = setup(<Provider store={store}><Login /></Provider>);
		const emailField = await screen.findByPlaceholderText('john@example.com');
		
		user.type(emailField, 'us')
		
		await waitFor(() => {
			expect(container.textContent.match('Minimum length should be 3'))
		});
	});
});