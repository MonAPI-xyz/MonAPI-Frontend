import { h } from 'preact';
import { screen, waitFor, render } from '@testing-library/preact';
import * as axios from 'axios';
import userEvent from '@testing-library/user-event'
import { getCurrentUrl, route } from 'preact-router';
import { setUserToken } from '../../../src/config/api/auth.js';
import VerifyUser from '../../../src/routes/verifyUser/index.js';
import App from '../../../src/components/app.js';

jest.mock("axios");

describe("Test Verify User", () => {

    test('when processing data then show loader', async() => {
        axios.post.mockImplementation(() => 
            new Promise((resolve) => {
                setTimeout(()=> resolve({
                    status: 200,
                    response: {
                        data: {
                            success: true
                        }
                    }
                }), 3000)
            })   
        )

        const container = render(<App />)
        route('/verify?key=abcdefg')
        await waitFor(async () => {
            expect(getCurrentUrl()).toBe('/verify?key=abcdefg')
            expect(screen.getByText('Loading'))
        }, 5000)
    })

    test('if token is not passed show block page', async() => {

        const container = render(<App />)
        route('/verify')

        await waitFor(async () => {
            expect(screen.getByText('Token Not Passed')).toBeDefined()
        }, 50000)
    })

    test('if token is valid show success page', async() => {

        axios.post.mockImplementation(() => Promise.resolve({
            status: 200,
            response: {
                data: {
                    success: true
                }
            }
        }))

        const container = render(<App />)
        route('/verify?key=abcdefg')

        await waitFor(async () => {
            expect(getCurrentUrl()).toBe('/verify?key=abcdefg')
            expect(screen.getByText('Loading'))
        }, 5000)

        await waitFor(async () => {
            expect(screen.getByText('User Email Verified')).toBeDefined()
        }, 50000)

    })

    test('if token is invalid show fail page', async() => {

        axios.post.mockImplementation(() => Promise.reject({
            status: 400,
            response: {
                data: {
                    error: "Invalid Token"
                }
            }
        }))

        const container = render(<App />)
        route('/verify?key=abcdefg')

        await waitFor(async () => {
            expect(getCurrentUrl()).toBe('/verify?key=abcdefg')
            expect(screen.getByText('Loading'))
        }, 5000)

        await waitFor(async () => {
            expect(screen.getByText('Token Invalid')).toBeDefined()
        }, 50000)

    })

})