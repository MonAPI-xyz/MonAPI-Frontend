import { h } from 'preact';
import Login from '../../src/routes/login';
import { Provider } from 'unistore/preact';
import { store } from '../../src/config/store/store';
import { fireEvent, screen, waitFor } from '@testing-library/preact';
import {setup} from '../utils/setup.js';


describe('Test Login', () => {
	
	test('success login', async () => {
		setup(<Provider store={store}><Login /></Provider>);
		const emailField = await screen.findByPlaceholderText('john@example.com');
		const passwordField = await screen.findByPlaceholderText('************');
		const button = await screen.getByText('Buat');

		// type in the field
		fireEvent.change(emailField, { value: 'user@gmail.com' });
		fireEvent.change(passwordField, { value: 'password123' });
		fireEvent.click(button);
		
	
	});

	test('failed login', async () => {
		setup(<Provider store={store}><Login /></Provider>);
		const emailField = await screen.findByPlaceholderText('john@example.com');
		const passwordField = await screen.findByPlaceholderText('************');
		const button = await screen.getByText('Buat');

		// type in the field
		fireEvent.change(emailField, { value: 'us' });
		fireEvent.change(passwordField, { value: 'pass' });

		fireEvent.click(button);
	});

	test('require to fill the both email and password', async () => {
		setup(<Provider store={store}><Login /></Provider>);
		const button = await screen.getByText('Buat');

		fireEvent.click(button);

		await waitFor(() => {
			// getAllByText return array that must have length of 2 (for email and password)
			expect(screen.getAllByText("Wajib diisi")).toHaveLength(2);
		});
		
	});

	test('email minimum length should be 3', async () => {
		const {user} = setup(<Provider store={store}><Login /></Provider>);
		const emailField = await screen.findByPlaceholderText('john@example.com');
		const button = await screen.getByText('Buat');
		user.type(emailField, 'user@gmail.com')
		fireEvent.click(button);

		await waitFor(() => {
			// getAllByText return array that must have length of 2
			expect(screen.getByText("Minimum length should be 3"));
		});
	});



	
});