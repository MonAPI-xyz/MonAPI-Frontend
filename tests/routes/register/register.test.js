import { h } from "preact";
import Register from '../../../src/routes/register/index.js'; // Does not exist YET
import { fireEvent, screen, waitFor, render } from '@testing-library/preact';
import * as axios from 'axios';
import userEvent from '@testing-library/user-event';

jest.mock("axios");
describe('Test Register', () => {

    test('user can fill and register', async () => {
        // render the page and save in container
        const container = render(<Register />)
        // find 3 input form and the button
        const emailField = await container.findByPlaceholderText("Your Email");
        const passField = await container.findByPlaceholderText("Password");
        const pass2Field = await container.findByPlaceholderText("Confirm Password");
        const registerButton = await container.getByText("Sign Up");
        // Input the field
        fireEvent.change(emailField, { value: "e"})
        fireEvent.change(passField, { value: "Pass1ngBy"})
        fireEvent.change(pass2Field, { value: "Pass1ngBy"})
        // click the button
        fireEvent.click(registerButton)
    })

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
        const registerButton = await container.getByText("Sign Up");

        // Input the field
        userEvent.type(emailField, 'e')
        userEvent.type(passField, 'e')
        userEvent.type(pass2Field, 'e')
        // click the button
        userEvent.click(registerButton)

        await waitFor(async () => {
            console.log("FROM TEST AWAIT 1: ENTERING WAIT FOR")
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
        const registerButton = await container.getByText("Sign Up");

        // Input the field
        userEvent.type(emailField, 'goodemail@goodemail.com')
        userEvent.type(passField, 'Pass1ngby')
        userEvent.type(pass2Field, 'Pass1ngby')
        // click the button
        userEvent.click(registerButton)

        await waitFor(async () => {
            console.log("FROM TEST AWAIT2: ENTERING NO DUPLICATE TEST");
            expect(screen.getByText('User already registered! Please use a different email to register.'))
        })

    })
        
})