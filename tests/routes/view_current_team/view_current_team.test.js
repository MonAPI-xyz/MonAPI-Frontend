import { h } from 'preact';
import { render, waitFor, screen, fireEvent} from '@testing-library/preact';
import ViewCurrentTeam from '../../../src/routes/view_current_team';
import * as axios from 'axios';
import { setUserToken } from '../../../src/config/api/auth.js';
import userEvent from '@testing-library/user-event';

jest.mock('axios')

describe('Test View Current Team', () => {
  test('try to view current team', async () => {
		const response = {
        "id": 5,
        "name": "Admin2",
        "logo": null,
        "description": "Test desc",
        "teammember": [
            {
                "team": 5,
                "user": {
                    "id": 6,
                    "username": "admin2@admin.com",
                    "email": "admin2@admin.com",
                    "first_name": "",
                    "last_name": ""
                },
                "verified": true
            },
            {
              "team": 5,
              "user": {
                  "id": 7,
                  "username": "admin3@admin.com",
                  "email": "admin3@admin.com",
                  "first_name": "",
                  "last_name": ""
              },
              "verified": false
            }
        ]
    }
		axios.get.mockImplementation(() => Promise.resolve({data: response}))
		setUserToken("token")
		render(<ViewCurrentTeam/>);

		await waitFor(() => {
            expect(screen.getByText('Team Management'))
            expect(screen.getByText('Admin2'))
            expect(screen.getByText('Test desc'))
            expect(screen.getByText('admin2@admin.com'))
		})
	})
    test('try to view current team with no description', async () => {
		const response = {
        "id": 5,
        "name": "Admin2",
        "logo": null,
        "description": "",
        "teammember": [
            {
                "team": 5,
                "user": {
                    "id": 6,
                    "username": "admin2@admin.com",
                    "email": "admin2@admin.com",
                    "first_name": "",
                    "last_name": ""
                },
                "verified": true
            },
        ]
    }
		axios.get.mockImplementation(() => Promise.resolve({data: response}))
		setUserToken("token")
		render(<ViewCurrentTeam/>);

		await waitFor(() => {
            expect(screen.getByText('Team Management'))
            expect(screen.getByText('Admin2'))
            expect(screen.getByText('-'))
            expect(screen.getByText('admin2@admin.com'))
            })
    })
})

describe('Test invite team member section', () => {

    test('Successful post refresh the page', async() => {
        setUserToken("token")
        render(<ViewCurrentTeam/>)
        axios.post.mockImplementation(() => Promise.resolve({
            status: 200,
            response: {
                data: {
                    success: true
                }
            }
        }))

        delete window.location;
        window.location = { reload: jest.fn() };

        const emailField = await screen.findByPlaceholderText("example@email.com");
        userEvent.type(emailField, 'example@email.com')

        const inviteButton = screen.getByTestId('test-inviteButton')
        userEvent.click(inviteButton)

        await waitFor(async () => {
            expect(window.location.reload).toHaveBeenCalled()
        })
    })

    test('Failed post shows error message', async() => {
        setUserToken("token")
        render(<ViewCurrentTeam/>)
        axios.post.mockImplementation(() => Promise.reject({
            status: 400,
            response: {
                data: {
                    error: "Make sure user email exist"
                }
            }
        }))

        const emailField = await screen.findByPlaceholderText("example@email.com");
        userEvent.type(emailField, 'nonexistant@email.com')

        const inviteButton = screen.getByTestId('test-inviteButton')
        userEvent.click(inviteButton) 

        await waitFor(async () => {
            expect(screen.getByText('Error: Make sure the user exist or isn\'t already in the team')).toBeDefined()
        })

    })


})