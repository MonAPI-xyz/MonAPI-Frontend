import { h } from "preact";
import Register from '../../../src/routes/register/index.js'; // Does not exist YET
import { fireEvent, screen, waitFor, render } from '@testing-library/preact';

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
        fireEvent.change(emailField, { value: "user1@gmail.com"})
        fireEvent.change(passField, { value: "Pass1ngBy"})
        fireEvent.change(pass2Field, { value: "Pass1ngBy"})
        // click the button
        fireEvent.click(registerButton)
    })

})