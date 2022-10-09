import { h } from 'preact';
import { screen, waitFor, render } from '@testing-library/preact';
import { getCurrentUrl, route } from 'preact-router';
import App from '../../../src/components/app.js';
import * as axios from 'axios';
import CreateAPIMonitor from '../../../src/routes/createAPIMonitor/index.js';
import userEvent from '@testing-library/user-event'
import { deleteUserToken, setUserToken } from '../../../src/config/api/auth.js';

jest.mock("axios");

describe('Test Accessing Routes', () => {
    test('not authenticated and try accessing create API monitor route', async () => {
        const response = []
		axios.get.mockImplementation(() => Promise.resolve({data: response}))
        deleteUserToken()
        
        render(<App />);
        route('/create')

        await waitFor(() => {
            expect(getCurrentUrl()).toBe('/login');
        })
    })
    test('authenticated and try accessing create API monitor route', async () => {
        const response = []
		axios.get.mockImplementation(() => Promise.resolve({data: response}))
        setUserToken('d16c4059484867e8d12ff535072509e3f29719e7')
        
        render(<App />);
        route('/create')

        await waitFor(() => {
            expect(getCurrentUrl()).toBe('/create');
        })
    })
});

describe('Test Create API Monitor', () => {
	test('test fill the create API Monitor', async () => {
        const response = []
		axios.get.mockImplementation(() => Promise.resolve({data: response}))
        setUserToken('d16c4059484867e8d12ff535072509e3f29719e7')
		render(<CreateAPIMonitor />);
		
        const monitorName = await screen.findByPlaceholderText("Monitor Name");
		const requestUrl = await screen.findByPlaceholderText("Request URL");
        const interval = await screen.getByTestId("interval");
        const previousStep = await screen.getByTestId('previousStep');
        const createAPIMonitorButton = screen.getByText('Create API Monitor');
		console.log("monitorName",monitorName, requestUrl, interval, previousStep)
		userEvent.type(monitorName, 'API Monitor 1')
        userEvent.type(requestUrl, 'www.example.com')
        userEvent.selectOptions(interval, '1 Minute');
        userEvent.selectOptions(previousStep, '1 Minute');
        userEvent.click(createAPIMonitorButton)
		
	})


});

