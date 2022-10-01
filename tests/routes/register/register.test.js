import { h } from "preact";
import Register from '../../../src/routes/register/index.js'; // Does not exist YET
import { fireEvent, screen, waitFor, render } from '@testing-library/preact';
import * as axios from 'axios';
import userEvent from '@testing-library/user-event';
import { getCurrentUrl, route } from 'preact-router';
import { deleteUserToken, setUserToken } from '../../../src/config/api/auth.js';
import App from '../../../src/components/app.js';

jest.mock("axios");
describe('Test Register', () => {

    test('user must enter valid email and password', async() => {
        // set mock response
        axios.post.mockImplementation(() => Promise.reject({
                status: 400,
                response: {
                    data: {
                        email: ["Enter a valid email address."],
                        password: ["['This password is too short. It must contain at least 8 characters.', 'This password is too common.', 'The password must contain at least 1 digit, 0-9.', 'The password must contain at least 1 uppercase letter, A-Z.']"]
                    }
                }
        }))

        // render the page and save in container
        const container = render(<Register />)
        // find 3 input form and the button
        const emailField = await container.findByPlaceholderText("Your Email");
        const passField = await container.findByPlaceholderText("Password");
        const pass2Field = await container.findByPlaceholderText("Confirm Password");
        const registerButton = container.getByText("Sign Up");

        // Input the field
        userEvent.type(emailField, 'e')
        userEvent.type(passField, 'e')
        userEvent.type(pass2Field, 'e')
        // click the button
        userEvent.click(registerButton)

        await waitFor(async () => {
            expect(screen.getByText('Error:'))
            expect(screen.getByText('Enter a valid email address.'))
            expect(screen.getByText('This password is too short. It must contain at least 8 characters.'))
            expect(screen.getByText('This password is too common.'))
            expect(screen.getByText('The password must contain at least 1 digit, 0-9.'))
            expect(screen.getByText('The password must contain at least 1 uppercase letter, A-Z.'))
        }, 5000)

    })

    test('user cannot register with existing email', async() => {
        // set mock response
        axios.post.mockImplementation(() => Promise.reject({
            status: 400,
            response: {
                data: {
                    response: "User already registered! Please use a different email to register."
                }
            }
        }))

        // render the page and save in container
        const container = render(<Register />)
        // find 3 input form and the button
        const emailField = await container.findByPlaceholderText("Your Email");
        const passField = await container.findByPlaceholderText("Password");
        const pass2Field = await container.findByPlaceholderText("Confirm Password");
        const registerButton = container.getByText("Sign Up");

        // Input the field
        userEvent.type(emailField, 'goodemail@goodemail.com')
        userEvent.type(passField, 'Pass1ngby')
        userEvent.type(pass2Field, 'Pass1ngby')
        // click the button
        userEvent.click(registerButton)

        await waitFor(async () => {
            expect(screen.getByText('User already registered! Please use a different email to register.'))
        })

    })

    test('user is given information that register is successful', async() => {
        axios.post.mockImplementation(() => Promise.resolve({
            status: 200
        }))

        // render the page and save in container
        const container = render(<App />)
        route('/register')
        // find 3 input form and the button
        const emailField = await container.findByPlaceholderText("Your Email");
        const passField = await container.findByPlaceholderText("Password");
        const pass2Field = await container.findByPlaceholderText("Confirm Password");
        const registerButton = container.getByText("Sign Up");

        // Input the field
        userEvent.type(emailField, 'goodemail@goodemail.com')
        userEvent.type(passField, 'Pass1ngby')
        userEvent.type(pass2Field, 'Pass1ngby')
        // click the button
        userEvent.click(registerButton)

        await waitFor(async () => {
            expect(screen.getByText('User Created Successfully!'))
        })

        await waitFor(async () => {
            expect(getCurrentUrl()).toBe('/login?isRegistered=true')
        })

    })

    test('user can go to /login from "sign in" text', async() => {
		render(<App/>);
		route('/register');

        await waitFor(async () => {
            expect(screen.getByText('Sign in'))
        })
		
		userEvent.click(screen.getByText('Sign in'));

		await waitFor(async () => {
			expect(getCurrentUrl()).toBe('/login');
		})
    })

    test('user must put exactly same password to create account', async() => {
        // set mock response
        axios.post.mockImplementation(() => Promise.reject({
            status: 400,
            response: {
                data: {
                    password: "Password must match."
                }
            }
        }))

        // render the page and save in container
        const container = render(<Register />)
        // find 3 input form and the button
        const emailField = await container.findByPlaceholderText("Your Email");
        const passField = await container.findByPlaceholderText("Password");
        const pass2Field = await container.findByPlaceholderText("Confirm Password");
        const registerButton = container.getByText("Sign Up");

        // Input the field
        userEvent.type(emailField, 'e')
        userEvent.type(passField, 'e')
        userEvent.type(pass2Field, 'e')
        // click the button
        userEvent.click(registerButton)

        await waitFor(async () => {
            expect(screen.getByText('Password must match.'))
        }, 5000)
    })

	test('authenticated and try accessing register route', async () => {
        const response = []
		axios.get.mockImplementation(() => Promise.resolve({data: response}))
		setUserToken('d16c4059484867e8d12ff535072509e3f29719e7')
		
		render(<App/>);
		route('/register')

		await waitFor(() => {
			expect(getCurrentUrl()).toBe('/');
		})
	})
        
})