import { h } from 'preact';
import { render } from '@testing-library/preact';
import { getCurrentUrl, route } from 'preact-router';
import axios from 'axios';
import App from '../../src/components/app.js';
import { getUserToken, setUserToken } from '../../src/config/api/auth.js';

describe('Test Axios Interceptor', () => {
	test('when return success then return actual data', async () => {
        render(<App />)
        route('/')

		const result = axios.interceptors.response.handlers[0].fulfilled({status: 200, data: {foo:'bar'}});

        expect(result).toStrictEqual({status: 200, data: {foo:'bar'}})
	});

    test('when return 401 then delete local storage and redirect to login', async () => {
        render(<App />)
        route('/')
        setUserToken('test token')

		const reject = axios.interceptors.response.handlers[0].rejected({response: {status: 401}});

        expect(getCurrentUrl()).toBe('/login')
        expect(getUserToken()).toBe(null)
        await expect(reject).rejects.toEqual({response: {status: 401}})
    })

    test('when return 403 then delete local storage and redirect to login', async () => {
        render(<App />)
        route('/')
        setUserToken('test token')

		const reject = axios.interceptors.response.handlers[0].rejected({response: {status: 403}});

        expect(getCurrentUrl()).toBe('/login')
        expect(getUserToken()).toBe(null)
        await expect(reject).rejects.toEqual({response: {status: 403}});
    })

    test('when return 500 then return error', async () => {
        render(<App />)
        route('/')
        setUserToken('test token')

		const reject = axios.interceptors.response.handlers[0].rejected({response: {status: 500}});

        expect(getCurrentUrl()).toBe('/')
        expect(getUserToken()).toBe('test token')
        await expect(reject).rejects.toEqual({response: {status: 500}});
    })

});