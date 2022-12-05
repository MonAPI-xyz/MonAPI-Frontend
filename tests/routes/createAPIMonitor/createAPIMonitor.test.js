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
        await waitFor(() => {
            const multiStep = screen.getByTestId("dropdownMultiStep");
            userEvent.selectOptions(multiStep, '-');
        })
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

    test('fill the create API Monitor with previous step id then success', async () => {
        const response = [
            {
                id: 2,
                name: "Test Monitor",
                method: "GET",
                url: "Test Path",
                schedule: "10MIN",
                body_type: "EMPTY",
                query_params: [],
                headers: [],
                body_form: [],
                raw_body: null,
                previous_step_id: 1,
                assertion_type: "DISABLED",
                assertion_value: "",
                is_assert_json_schema_only: false,
                exclude_keys: []
            }
        ]
        axios.get.mockImplementation(() => Promise.resolve({data: response}))
		axios.post.mockImplementation(() => Promise.resolve({data: response}))
        setUserToken('d16c4059484867e8d12ff535072509e3f29719e7')
		render(<CreateAPIMonitor />);
		
        const monitorName = await screen.findByPlaceholderText("Monitor Name");
		const requestUrl = await screen.findByPlaceholderText("Request URL");
        const interval = await screen.getByTestId("dropdownInterval");
        await waitFor(() => {
            const multiStep = screen.getByTestId("dropdownMultiStep");
            userEvent.selectOptions(multiStep, 'Test Monitor - Test Path');
        })
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
        await waitFor(() => {
            const multiStep = screen.getByTestId("dropdownMultiStep");
            userEvent.selectOptions(multiStep, '-');
        })
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
        await waitFor(() => {
            const multiStep = screen.getByTestId("dropdownMultiStep");
            userEvent.selectOptions(multiStep, '-');
        })
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
        await waitFor(() => {
            const multiStep = screen.getByTestId("dropdownMultiStep");
            userEvent.selectOptions(multiStep, '-');
        })
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
        
        await waitFor(() => {
            const multiStep = screen.getByTestId("dropdownMultiStep");
            userEvent.selectOptions(multiStep, '-');
        })
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


describe('Test Create API Monitor with Assertion', () => {
    test('when create with Disabled assertion type then success', async () => {
        const response = []
        axios.post.mockImplementation(() => Promise.resolve({data: response}))
        setUserToken('d16c4059484867e8d12ff535072509e3f29719e7')
        render(<CreateAPIMonitor />);
        
        const monitorName = await screen.findByPlaceholderText("Monitor Name");
        const requestUrl = await screen.findByPlaceholderText("Request URL");
        const interval = screen.getByTestId("dropdownInterval");
        const method = screen.getByTestId('dropdownMethod');
        const createAPIMonitorButton = screen.getByText('Create API Monitor');
        
        userEvent.type(monitorName, 'API Monitor 1')
        userEvent.type(requestUrl, 'www.example.com')
        userEvent.selectOptions(interval, '1 Minute');
        userEvent.selectOptions(method, 'GET');    

        const assertionButton = screen.getByText('Assertions')
        userEvent.click(assertionButton)

        const disabledButton = screen.getByText('Disabled')
        userEvent.click(disabledButton)

        userEvent.click(createAPIMonitorButton)
        await waitFor(() => {
            expect(getCurrentUrl()).toBe('/create');
        })
    })

    test('when create with Text assertion type then success', async () => {
        const response = []
        axios.post.mockImplementation(() => Promise.resolve({data: response}))
        setUserToken('d16c4059484867e8d12ff535072509e3f29719e7')
        render(<CreateAPIMonitor />);
        
        const monitorName = await screen.findByPlaceholderText("Monitor Name");
        const requestUrl = await screen.findByPlaceholderText("Request URL");
        const interval = screen.getByTestId("dropdownInterval");
        const method = screen.getByTestId('dropdownMethod');
        const createAPIMonitorButton = screen.getByText('Create API Monitor');
        
        userEvent.type(monitorName, 'API Monitor 1')
        userEvent.type(requestUrl, 'www.example.com')
        userEvent.selectOptions(interval, '1 Minute');
        userEvent.selectOptions(method, 'GET');    

        const assertionButton = screen.getByText('Assertions')
        userEvent.click(assertionButton)

        const textButton = screen.getByText('Text')
        userEvent.click(textButton)

        const textArea = screen.getByPlaceholderText('Type assertion here')
        userEvent.type(textArea, 'test assertion')

        userEvent.click(createAPIMonitorButton)
        await waitFor(() => {
            expect(getCurrentUrl()).toBe('/create');
        })
    })

    test('when create with Partial Text assertion type then success', async () => {
        const response = []
        axios.post.mockImplementation(() => Promise.resolve({data: response}))
        setUserToken('d16c4059484867e8d12ff535072509e3f29719e7')
        render(<CreateAPIMonitor />);
        
        const monitorName = await screen.findByPlaceholderText("Monitor Name");
        const requestUrl = await screen.findByPlaceholderText("Request URL");
        const interval = screen.getByTestId("dropdownInterval");
        const method = screen.getByTestId('dropdownMethod');
        const createAPIMonitorButton = screen.getByText('Create API Monitor');
        
        userEvent.type(monitorName, 'API Monitor 1')
        userEvent.type(requestUrl, 'www.example.com')
        userEvent.selectOptions(interval, '1 Minute');
        userEvent.selectOptions(method, 'GET');    

        const assertionButton = screen.getByText('Assertions')
        userEvent.click(assertionButton)

        const textButton = screen.getByText('Partial Text')
        userEvent.click(textButton)

        const textArea = screen.getByPlaceholderText('Type assertion here')
        userEvent.type(textArea, 'test assertion')

        userEvent.click(createAPIMonitorButton)
        await waitFor(() => {
            expect(getCurrentUrl()).toBe('/create');
        })
    })

    test('when create with JSON assertion type and exclude key (+try delete exclude key) then success', async () => {
        const response = []
        axios.post.mockImplementation(() => Promise.resolve({data: response}))
        setUserToken('d16c4059484867e8d12ff535072509e3f29719e7')
        render(<CreateAPIMonitor />);
        
        const monitorName = await screen.findByPlaceholderText("Monitor Name");
        const requestUrl = await screen.findByPlaceholderText("Request URL");
        const interval = screen.getByTestId("dropdownInterval");
        const method = screen.getByTestId('dropdownMethod');
        const createAPIMonitorButton = screen.getByText('Create API Monitor');
        
        userEvent.type(monitorName, 'API Monitor 1')
        userEvent.type(requestUrl, 'www.example.com')
        userEvent.selectOptions(interval, '1 Minute');
        userEvent.selectOptions(method, 'GET');    

        const assertionButton = screen.getByText('Assertions')
        userEvent.click(assertionButton)

        const textButton = screen.getByText('JSON')
        userEvent.click(textButton)

        const textArea = screen.getByPlaceholderText('Type assertion here')
        userEvent.type(textArea, '{"key1":"assertion value"}'.replace(/[{[]/g, '$&$&'))

        const addKeyButton = await screen.getByText('Add Key');
        userEvent.click(addKeyButton)
        userEvent.click(addKeyButton)

        const addKeys = await screen.findAllByPlaceholderText('Key')
        userEvent.type(addKeys[0], 'Key1')
        userEvent.type(addKeys[1], 'Key2')

        const removeButton = await screen.findAllByTestId('keyValueRemoveButton')
        userEvent.click(removeButton[0])

        userEvent.click(createAPIMonitorButton)
        await waitFor(() => {
            expect(getCurrentUrl()).toBe('/create');
        })
    })

    test('when create with JSON assertion type and key only then success', async () => {
        const response = []
        axios.post.mockImplementation(() => Promise.resolve({data: response}))
        setUserToken('d16c4059484867e8d12ff535072509e3f29719e7')
        render(<CreateAPIMonitor />);
        
        const monitorName = await screen.findByPlaceholderText("Monitor Name");
        const requestUrl = await screen.findByPlaceholderText("Request URL");
        const interval = screen.getByTestId("dropdownInterval");
        const method = screen.getByTestId('dropdownMethod');
        const createAPIMonitorButton = screen.getByText('Create API Monitor');
        
        userEvent.type(monitorName, 'API Monitor 1')
        userEvent.type(requestUrl, 'www.example.com')
        userEvent.selectOptions(interval, '1 Minute');
        userEvent.selectOptions(method, 'GET');    

        const assertionButton = screen.getByText('Assertions')
        userEvent.click(assertionButton)

        const textButton = screen.getByText('JSON')
        userEvent.click(textButton)

        const textArea = screen.getByPlaceholderText('Type assertion here')
        userEvent.type(textArea, '{"key1":"assertion value"}'.replace(/[{[]/g, '$&$&'))

        const keyOnlyCheckbox = screen.getByText('Assert JSON schema (key) only')
        userEvent.click(keyOnlyCheckbox)
        
        userEvent.click(createAPIMonitorButton)
        await waitFor(() => {
            expect(getCurrentUrl()).toBe('/create');
        })
    })

    test('when create with JSON assertion type, key only, and exclude key then success', async () => {
        const response = []
        axios.post.mockImplementation(() => Promise.resolve({data: response}))
        setUserToken('d16c4059484867e8d12ff535072509e3f29719e7')
        render(<CreateAPIMonitor />);
        
        const monitorName = await screen.findByPlaceholderText("Monitor Name");
        const requestUrl = await screen.findByPlaceholderText("Request URL");
        const interval = screen.getByTestId("dropdownInterval");
        const method = screen.getByTestId('dropdownMethod');
        const createAPIMonitorButton = screen.getByText('Create API Monitor');
        
        userEvent.type(monitorName, 'API Monitor 1')
        userEvent.type(requestUrl, 'www.example.com')
        userEvent.selectOptions(interval, '1 Minute');
        userEvent.selectOptions(method, 'GET');    

        const assertionButton = screen.getByText('Assertions')
        userEvent.click(assertionButton)

        const textButton = screen.getByText('JSON')
        userEvent.click(textButton)

        const textArea = screen.getByPlaceholderText('Type assertion here')
        userEvent.type(textArea, '{"key1":"assertion value"}'.replace(/[{[]/g, '$&$&'))

        const keyOnlyCheckbox = screen.getByText('Assert JSON schema (key) only')
        userEvent.click(keyOnlyCheckbox)

        const addKeyButton = screen.getByText('Add Key');
        userEvent.click(addKeyButton)

        const addKey1 = screen.getByPlaceholderText('Key')
        userEvent.type(addKey1, 'Key1')
        
        userEvent.click(createAPIMonitorButton)
        await waitFor(() => {
            expect(getCurrentUrl()).toBe('/create');
        })
    })

    test('when doesnt fill assertion textarea and click submit then get notify for error', async () => {
        const response = []
		axios.get.mockImplementation(() => Promise.resolve({data: response}))
        setUserToken('d16c4059484867e8d12ff535072509e3f29719e7')
		render(<CreateAPIMonitor />);
		
        const createAPIMonitorButton = screen.getByText('Create API Monitor');

        const bodyButton = screen.getByText('Assertions')
        userEvent.click(bodyButton)

        // Text
        const textButton = screen.getByText('Text')
        userEvent.click(textButton)
		
        userEvent.click(createAPIMonitorButton)
		await waitFor(() => {
            expect(screen.queryAllByText('Required')).toHaveLength(3)
        })

        // JSON
        const jsonButton = screen.getByText('JSON')
        userEvent.click(jsonButton)
		
        userEvent.click(createAPIMonitorButton)
		await waitFor(() => {
            expect(screen.queryAllByText('Required')).toHaveLength(3)
        })
	})
});

