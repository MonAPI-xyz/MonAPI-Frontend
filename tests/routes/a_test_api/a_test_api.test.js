import { h } from 'preact';
import { screen, waitFor, render } from '@testing-library/preact';
import * as axios from 'axios';
import userEvent from '@testing-library/user-event'
import { getCurrentUrl, route } from 'preact-router';
import { setUserToken } from '../../../src/config/api/auth.js';
import TestAPI from '../../../src/routes/a_test_api/index.js';

jest.mock("axios");

describe('Test test API sites', () => {
	test('try to access test API sites', async () => {
		const response = []
		axios.get.mockImplementation(() => Promise.resolve({data: response}))
		setUserToken("token")
		render(<TestAPI />);
		route('/test-api/')

		await waitFor(() => {
			expect(screen.getByText("API Test")).toBeDefined()
			expect(getCurrentUrl()).toBe('/');
		})
	})	

    test('when processing data then show loader', async() => {
        axios.post.mockImplementation(() => 
            new Promise((resolve) => {
                setTimeout(()=> resolve({
                    status: 200
                }), 3000)
            })   
        )

        render(<TestAPI />)
        
        const requestUrl = await screen.findByPlaceholderText("Request URL");
        const method = await screen.getByTestId('dropdownMethod');
        const submitButton = await screen.getByText('Submit');
        
        userEvent.type(requestUrl, 'www.example.com')
        userEvent.selectOptions(method, 'GET'); 
       
        userEvent.click(submitButton)

        await waitFor(async () => {
            expect(screen.getByText('Loading...')).toBeDefined()
        })

    })

	test('fill the test API Monitor then failed', async () => {
        const response = {error:"test response"}
		axios.post.mockImplementation(() => Promise.reject({response: {data: response}}))
        setUserToken('d16c4059484867e8d12ff535072509e3f29719e7')
		render(<TestAPI />);
		
		const requestUrl = await screen.findByPlaceholderText("Request URL");
        const method = await screen.getByTestId('dropdownMethod');
        const submitButton = await screen.getByText('Submit');
        
        userEvent.type(requestUrl, 'www.example.com')
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

        userEvent.click(submitButton)
        await waitFor(() => {
            expect(screen.getByText("test response")).toBeDefined();
        })
	})
	test('fill the test API Monitor then success', async () => {
        const response = {response:"test response"}
		axios.post.mockImplementation(() => Promise.resolve({data: response}))
        setUserToken('d16c4059484867e8d12ff535072509e3f29719e7')
		render(<TestAPI />);
		
		const requestUrl = await screen.findByPlaceholderText("Request URL");
        const method = await screen.getByTestId('dropdownMethod');
        const submitButton = await screen.getByText('Submit');
        
        userEvent.type(requestUrl, 'www.example.com')
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

        const formButton = await screen.getByText('Raw Body')
        userEvent.click(formButton)

        const rawBody = await screen.findByPlaceholderText('Type request raw body here')

        userEvent.type(rawBody, 'Type request raw body here')

        userEvent.click(submitButton)
		
        await waitFor(() => {
            expect(screen.getByText("test response")).toBeDefined();
            expect(screen.queryAllByText('Loading...')).toHaveLength(0);
        })
	})
});