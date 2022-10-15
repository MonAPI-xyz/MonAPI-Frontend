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
	test('fill the create API Monitor then success', async () => {
        const response = []
		axios.post.mockImplementation(() => Promise.resolve({data: response}))
        setUserToken('d16c4059484867e8d12ff535072509e3f29719e7')
		render(<CreateAPIMonitor />);
		
        const monitorName = await screen.findByPlaceholderText("Monitor Name");
		const requestUrl = await screen.findByPlaceholderText("Request URL");
        const interval = await screen.getByTestId("dropdownInterval");
        const method = await screen.getByTestId('dropdownMethod');
        const createAPIMonitorButton = await screen.getByText('Create API Monitor');
        
		userEvent.type(monitorName, 'API Monitor 1')
        userEvent.type(requestUrl, 'www.example.com')
        userEvent.selectOptions(interval, '1 Minute');
        userEvent.selectOptions(method, 'POST');    

        const queryParamsButton = await screen.getByText('Query Params');
        userEvent.click(queryParamsButton)

        const addQueryParamsButton = await screen.getByText('Add Query Params');
        userEvent.click(addQueryParamsButton)

        const queryParamsKey = await screen.findByPlaceholderText('Key')
        const queryParamsValue = await screen.findByPlaceholderText('Value')

        userEvent.type(queryParamsKey, 'Query key')
        userEvent.type(queryParamsValue, 'Query value')

        const headersTabButton = await screen.getByText('Headers')
        userEvent.click(headersTabButton)

        const addHeadersButton = await screen.getByText('Add Headers')
        userEvent.click(addHeadersButton)

        const headersKey = await screen.findByPlaceholderText('Key')
        const headersValue = await screen.findByPlaceholderText('Value')

        userEvent.type(headersKey, 'Header key')
        userEvent.type(headersValue, 'Header value')

        const bodyButton = await screen.getByText('Body')
        userEvent.click(bodyButton)

        const formButton = await screen.getByText('Form')
        userEvent.click(formButton)

        const addFormButton = await screen.getByText('Add Form')
        userEvent.click(addFormButton)

        const formKey = await screen.findByPlaceholderText('Key')
        const formValue = await screen.findByPlaceholderText('Value')

        userEvent.type(formKey, 'Form key')
        userEvent.type(formValue, 'Form value')

        userEvent.click(createAPIMonitorButton)
        await waitFor(() => {
            expect(getCurrentUrl()).toBe('/create');
        })
	})

	test('fill the create API Monitor then error', async () => {
		axios.post.mockImplementation(() => Promise.reject({
            response: {
                data: {
                    error : 'Error Test Case'
                }
            }
        }))
        setUserToken('d16c4059484867e8d12ff535072509e3f29719e7')
		render(<CreateAPIMonitor />);
		
        const monitorName = await screen.findByPlaceholderText("Monitor Name");
		const requestUrl = await screen.findByPlaceholderText("Request URL");
        const interval = await screen.getByTestId("dropdownInterval");
        const method = await screen.getByTestId('dropdownMethod');
        const createAPIMonitorButton = await screen.getByText('Create API Monitor');
        
		userEvent.type(monitorName, 'API Monitor 1')
        userEvent.type(requestUrl, 'www.example.com')
        userEvent.selectOptions(interval, '1 Minute');
        userEvent.selectOptions(method, 'POST');    

        const queryParamsButton = await screen.getByText('Query Params');
        userEvent.click(queryParamsButton)

        const addQueryParamsButton = await screen.getByText('Add Query Params');
        userEvent.click(addQueryParamsButton)

        const queryParamsKey = await screen.findByPlaceholderText('Key')
        const queryParamsValue = await screen.findByPlaceholderText('Value')

        userEvent.type(queryParamsKey, 'Query key')
        userEvent.type(queryParamsValue, 'Query value')

        const headersTabButton = await screen.getByText('Headers')
        userEvent.click(headersTabButton)

        const addHeadersButton = await screen.getByText('Add Headers')
        userEvent.click(addHeadersButton)

        const headersKey = await screen.findByPlaceholderText('Key')
        const headersValue = await screen.findByPlaceholderText('Value')

        userEvent.type(headersKey, 'Header key')
        userEvent.type(headersValue, 'Header value')

        const bodyButton = await screen.getByText('Body')
        userEvent.click(bodyButton)

        const formButton = await screen.getByText('Form')
        userEvent.click(formButton)

        const addFormButton = await screen.getByText('Add Form')
        userEvent.click(addFormButton)

        const formKey = await screen.findByPlaceholderText('Key')
        const formValue = await screen.findByPlaceholderText('Value')

        userEvent.type(formKey, 'Form key')
        userEvent.type(formValue, 'Form value')

        userEvent.click(createAPIMonitorButton)
        await waitFor(() => {
            expect(screen.queryAllByText('Error Test Case')).toHaveLength(1);
        })
	})

	test('fill create API Monitor with raw body then success', async () => {
		const response = []
		axios.post.mockImplementation(() => Promise.resolve({data: response}))
        setUserToken('d16c4059484867e8d12ff535072509e3f29719e7')
		render(<CreateAPIMonitor />);
		
        const monitorName = await screen.findByPlaceholderText("Monitor Name");
		const requestUrl = await screen.findByPlaceholderText("Request URL");
        const interval = await screen.getByTestId("dropdownInterval");
        const method = await screen.getByTestId('dropdownMethod');
        const createAPIMonitorButton = await screen.getByText('Create API Monitor');
        
		userEvent.type(monitorName, 'API Monitor 1')
        userEvent.type(requestUrl, 'www.example.com')
        userEvent.selectOptions(interval, '1 Minute');
        userEvent.selectOptions(method, 'POST');    

        const queryParamsButton = await screen.getByText('Query Params');
        userEvent.click(queryParamsButton)

        const addQueryParamsButton = await screen.getByText('Add Query Params');
        userEvent.click(addQueryParamsButton)

        const queryParamsKey = await screen.findByPlaceholderText('Key')
        const queryParamsValue = await screen.findByPlaceholderText('Value')

        userEvent.type(queryParamsKey, 'Query key')
        userEvent.type(queryParamsValue, 'Query value')

        const headersTabButton = await screen.getByText('Headers')
        userEvent.click(headersTabButton)

        const addHeadersButton = await screen.getByText('Add Headers')
        userEvent.click(addHeadersButton)

        const headersKey = await screen.findByPlaceholderText('Key')
        const headersValue = await screen.findByPlaceholderText('Value')

        userEvent.type(headersKey, 'Header key')
        userEvent.type(headersValue, 'Header value')

        const bodyButton = await screen.getByText('Body')
        userEvent.click(bodyButton)

        const rawBodyButton = await screen.getByText('Raw Body')
        userEvent.click(rawBodyButton)

        const textArea = await screen.getByPlaceholderText('Type request raw body here')
        userEvent.type(textArea, 'test raw body')

        userEvent.click(createAPIMonitorButton)
        await waitFor(() => {
            expect(getCurrentUrl()).toBe('/create');
        })
	})

	test('delete query params using button then success', async () => {
		const response = []
		axios.post.mockImplementation(() => Promise.resolve({data: response}))
        setUserToken('d16c4059484867e8d12ff535072509e3f29719e7')
		render(<CreateAPIMonitor />);
		
        const monitorName = await screen.findByPlaceholderText("Monitor Name");
		const requestUrl = await screen.findByPlaceholderText("Request URL");
        const interval = await screen.getByTestId("dropdownInterval");
        const method = await screen.getByTestId('dropdownMethod');
        const createAPIMonitorButton = await screen.getByText('Create API Monitor');
        
		userEvent.type(monitorName, 'API Monitor 1')
        userEvent.type(requestUrl, 'www.example.com')
        userEvent.selectOptions(interval, '1 Minute');
        userEvent.selectOptions(method, 'POST');    

        const queryParamsButton = await screen.getByText('Query Params');
        userEvent.click(queryParamsButton)

        const addQueryParamsButton = await screen.getByText('Add Query Params');
        userEvent.click(addQueryParamsButton)

        const queryParamsKey = await screen.findByPlaceholderText('Key')
        const queryParamsValue = await screen.findByPlaceholderText('Value')

        userEvent.type(queryParamsKey, 'Query key')
        userEvent.type(queryParamsValue, 'Query value')

        const removeButton = await screen.getByTestId('keyValueRemoveButton')
        userEvent.click(removeButton)

        userEvent.click(createAPIMonitorButton)
        await waitFor(() => {
            expect(getCurrentUrl()).toBe('/create');
        })
	})

	test('when process then show loader', async () => {
        const mockFn = jest.fn();
		const response = []
		axios.post.mockImplementation(() => {
            mockFn();
            return new Promise((resolve)=> {
                setTimeout(() =>  resolve({ 
                    data: response
                }), 3000)
            })
        })
        setUserToken('d16c4059484867e8d12ff535072509e3f29719e7')
		render(<CreateAPIMonitor />);
		
        const monitorName = await screen.findByPlaceholderText("Monitor Name");
		const requestUrl = await screen.findByPlaceholderText("Request URL");
        const interval = await screen.getByTestId("dropdownInterval");
        const method = await screen.getByTestId('dropdownMethod');
        const createAPIMonitorButton = await screen.getByText('Create API Monitor');
        
		userEvent.type(monitorName, 'API Monitor 1')
        userEvent.type(requestUrl, 'www.example.com')
        userEvent.selectOptions(interval, '1 Minute');
        userEvent.selectOptions(method, 'POST');    

        userEvent.click(createAPIMonitorButton)
        await waitFor(() => {
			expect(screen.getByText('Loading...')).toBeDefined()
		})

        userEvent.click(createAPIMonitorButton)
        expect(mockFn).toBeCalledTimes(1)
	})

    test('not filled create API Monitor form and click button', async () => {
        const response = []
		axios.get.mockImplementation(() => Promise.resolve({data: response}))
        setUserToken('d16c4059484867e8d12ff535072509e3f29719e7')
		render(<CreateAPIMonitor />);
		
        const createAPIMonitorButton = screen.getByText('Create API Monitor');
		
        userEvent.click(createAPIMonitorButton)
		await waitFor(() => {
            expect(screen.queryAllByText('Required')).toHaveLength(2)
        })
	})

    test('not filled create API Monitor query params form and click submit', async () => {
        const response = []
		axios.get.mockImplementation(() => Promise.resolve({data: response}))
        setUserToken('d16c4059484867e8d12ff535072509e3f29719e7')
		render(<CreateAPIMonitor />);
		
        const createAPIMonitorButton = screen.getByText('Create API Monitor');

        const queryParamsButton = await screen.getByText('Query Params');
        userEvent.click(queryParamsButton)

        const addQueryParamsButton = await screen.getByText('Add Query Params');
        userEvent.click(addQueryParamsButton)
		
        userEvent.click(createAPIMonitorButton)
		await waitFor(() => {
            expect(screen.queryAllByText('Required')).toHaveLength(4)
        })
	})

    test('not filled create API Monitor raw body and click submit', async () => {
        const response = []
		axios.get.mockImplementation(() => Promise.resolve({data: response}))
        setUserToken('d16c4059484867e8d12ff535072509e3f29719e7')
		render(<CreateAPIMonitor />);
		
        const createAPIMonitorButton = screen.getByText('Create API Monitor');

        const bodyButton = await screen.getByText('Body')
        userEvent.click(bodyButton)

        const rawBodyButton = await screen.getByText('Raw Body')
        userEvent.click(rawBodyButton)
		
        userEvent.click(createAPIMonitorButton)
		await waitFor(() => {
            expect(screen.queryAllByText('Required')).toHaveLength(3)
        })
	})


});

