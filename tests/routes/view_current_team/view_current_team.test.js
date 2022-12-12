import { h } from 'preact';
import { render, waitFor, screen } from '@testing-library/preact';
import ViewCurrentTeam from '../../../src/routes/view_current_team';
import * as axios from 'axios';
import { setUserToken } from '../../../src/config/api/auth.js';
import userEvent from '@testing-library/user-event';

jest.mock('axios')

describe('Test View Current Team', () => {
    test('try to view current team', async () => {
        const response = {
            id: 5,
            name: "Admin2",
            logo: null,
            description: "Test desc",
            teammember: [
                {
                    team: 5,
                    user: {
                        id: 6,
                        username: "admin2@admin.com",
                        email: "admin2@admin.com",
                        first_name: "",
                        last_name: ""
                    },
                    verified: true
                },
                {
                    team: 5,
                    user: {
                        id: 7,
                        username: "admin3@admin.com",
                        email: "admin3@admin.com",
                        first_name: "",
                        last_name: ""
                    },
                    verified: false
                }
            ]
        }
        axios.get.mockImplementation(() => Promise.resolve({ data: response }))
        setUserToken("token")
        render(<ViewCurrentTeam />);

        await waitFor(() => {
            expect(screen.getByText('Team Management')).toBeDefined()
            expect(screen.getByText('Admin2')).toBeDefined()
            expect(screen.getByText('Test desc')).toBeDefined()
            expect(screen.getByText('admin2@admin.com')).toBeDefined()
        })
    })

    test('failed how current team show empty data', async () => {
        axios.get.mockImplementation(() => Promise.reject({}))
        setUserToken("token")
        render(<ViewCurrentTeam />);

        await waitFor(() => {
            expect(screen.getByText('Team Name')).toBeDefined()
            expect(screen.getByText('Team Description')).toBeDefined()
            expect(screen.getByText('Invite Member')).toBeDefined()
        })
    })

    test('try to view current team with no description', async () => {
        const response = {
            id: 5,
            name: "Admin2",
            logo: null,
            description: "",
            teammember: [
                {
                    team: 5,
                    user: {
                        id: 6,
                        username: "admin2@admin.com",
                        email: "admin2@admin.com",
                        first_name: "",
                        last_name: ""
                    },
                    verified: true
                },
            ]
        }
        axios.get.mockImplementation(() => Promise.resolve({ data: response }))
        setUserToken("token")
        render(<ViewCurrentTeam />);

        await waitFor(() => {
            expect(screen.getByText('Team Management')).toBeDefined()
            expect(screen.getByText('Admin2')).toBeDefined()
            expect(screen.getByText('-')).toBeDefined()
            expect(screen.getByText('admin2@admin.com')).toBeDefined()
        })
    })
})

describe('Test invite team member section', () => {

    test('Successful post update team member', async () => {
        axios.post.mockImplementation(() => Promise.resolve({
            status: 200,
            response: {
                data: {
                    success: true
                }
            }
        }))

        const response = {
            id: 5,
            name: "Admin2",
            logo: null,
            description: "Test desc",
            teammember: [
                {
                    team: 5,
                    user: {
                        id: 6,
                        username: "admin2@admin.com",
                        email: "admin2@admin.com",
                        first_name: "",
                        last_name: ""
                    },
                    verified: true
                },
                {
                    team: 5,
                    user: {
                        id: 7,
                        username: "example@email.com",
                        email: "example@email.com",
                        first_name: "",
                        last_name: ""
                    },
                    verified: false
                }
            ]
        }
        axios.get.mockImplementation(() => Promise.resolve({ data: response }))

        setUserToken("token")
        render(<ViewCurrentTeam />)

        const emailField = await screen.findByPlaceholderText("example@email.com");
        userEvent.type(emailField, 'example@email.com')

        const inviteButton = screen.getByTestId('test-inviteButton')
        userEvent.click(inviteButton)

        await waitFor(async () => {
            expect(screen.getByText('example@email.com')).toBeDefined()
            expect(screen.getByText('Successfully invite example@email.com to the team')).toBeDefined()
        })
    })

    test('post team invite show loading spinner', async () => {
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

        const response = {
            id: 5,
            name: "Admin2",
            logo: null,
            description: "Test desc",
            teammember: [
                {
                    team: 5,
                    user: {
                        id: 6,
                        username: "admin2@admin.com",
                        email: "admin2@admin.com",
                        first_name: "",
                        last_name: ""
                    },
                    verified: true
                },
                {
                    team: 5,
                    user: {
                        id: 7,
                        username: "example@email.com",
                        email: "example@email.com",
                        first_name: "",
                        last_name: ""
                    },
                    verified: false
                }
            ]
        }
        axios.get.mockImplementation(() => Promise.resolve({ data: response }))

        setUserToken("token")
        render(<ViewCurrentTeam />)

        const emailField = await screen.findByPlaceholderText("example@email.com");
        userEvent.type(emailField, 'example@email.com')

        const inviteButton = screen.getByTestId('test-inviteButton')
        userEvent.click(inviteButton)

        await waitFor(async () => {
            expect(screen.getByText('Loading...')).toBeDefined()
        })
    })

    test('Failed post shows error message', async () => {
        axios.post.mockImplementation(() => Promise.reject({
            status: 400,
            response: {
                data: {
                    error: "Make sure user email exist"
                }
            }
        }))

        const response = {
            id: 5,
            name: "Admin2",
            logo: null,
            description: "Test desc",
            teammember: [
                {
                    team: 5,
                    user: {
                        id: 6,
                        username: "admin2@admin.com",
                        email: "admin2@admin.com",
                        first_name: "",
                        last_name: ""
                    },
                    verified: true
                },
                {
                    team: 5,
                    user: {
                        id: 7,
                        username: "example@email.com",
                        email: "example@email.com",
                        first_name: "",
                        last_name: ""
                    },
                    verified: false
                }
            ]
        }
        axios.get.mockImplementation(() => Promise.resolve({ data: response }))

        setUserToken("token")
        render(<ViewCurrentTeam />)

        const emailField = await screen.findByPlaceholderText("example@email.com");
        userEvent.type(emailField, 'nonexistant@email.com')

        const inviteButton = screen.getByTestId('test-inviteButton')
        userEvent.click(inviteButton)

        await waitFor(async () => {
            expect(screen.getByText('Error: Make sure the user exist or isn\'t already in the team')).toBeDefined()
        })
    })
})