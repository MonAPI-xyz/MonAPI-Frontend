import { h } from 'preact';
import { render, waitFor, screen} from '@testing-library/preact';
import ViewCurrentTeam from '../../../src/routes/view_current_team';
import * as axios from 'axios';
import { setUserToken } from '../../../src/config/api/auth.js';

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
            expect(screen.getByText('Member'));
            expect(screen.getByText('Pending'));
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
            expect(screen.getByText('Member'));
            })
    })
})