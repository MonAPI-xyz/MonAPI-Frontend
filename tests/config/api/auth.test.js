import { h } from 'preact';
import { deleteUserToken, getUserToken, setUserToken } from '../../../src/config/api/auth.js';

describe('Test Auth Function Without Window', () => {
	const { window } = global;

	beforeAll(() => {
		delete global.window;
	});

	afterAll(() => {
		global.window = window;
	});

	test('get user token', async () => {
		expect(getUserToken()).toEqual('');
	});

	test('set user token', async () => {
		setUserToken('unsupported');
		expect(getUserToken()).toEqual('');
	});

	test('delete user token', async () => {
		deleteUserToken();
		expect(getUserToken()).toEqual('');
	});

});

describe('Test Auth Function With Window', () => {
	test('get user token', async () => {
		localStorage.setItem("MONAPI_TOKEN", 'test_token');
		expect(getUserToken()).toEqual('test_token');
	});

	test('set user token', async () => {
		setUserToken('test_token');
		expect(getUserToken()).toEqual('test_token');
	});

	test('delete user token', async () => {
		deleteUserToken();
		expect(getUserToken()).toEqual(null);
	});

});