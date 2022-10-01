import { h, Fragment } from 'preact';
import Login from '../../../src/routes/login/index.js';
import { Provider } from 'unistore/preact';
import { store } from '../../../src/config/store/store';
import { screen, waitFor, render } from '@testing-library/preact';
import * as axios from 'axios';
import { getCurrentUrl, route } from 'preact-router';
import App from '../../../src/components/app.js';
import userEvent from '@testing-library/user-event'
import { deleteUserToken, setUserToken } from '../../../src/config/api/auth.js';
import ViewListMonitor from '../../../src/routes/view_list_monitor/index.js';

jest.mock("axios");

describe('Test API Monitors sites', () => {
	test('try to access API Monitors sites', async () => {
		const response = []
		axios.get.mockImplementation(() => Promise.resolve({data: response}))
		setUserToken("token")
		render(<App/>);
		route('/')

		await waitFor(() => {
			expect(screen.getByText('API Monitors'))
			expect(getCurrentUrl()).toBe('/');
		})
	})
	test('try to match model and view list', async () => {
		const response = [{"id":1,"name":"Ferdi","method":"GET","url":"url","schedule":"5MIN","body_type":"FORM","query_params":[],"headers":[],"body_form":[],"raw_body":[],"success_rate":100.0,"avg_response_time":0,"success_rate_history":[{"date":"2022-09-30","hour":17,"minute":0,"success":0,"failed":0},{"date":"2022-09-30","hour":18,"minute":0,"success":0,"failed":0},{"date":"2022-09-30","hour":19,"minute":0,"success":0,"failed":0},{"date":"2022-09-30","hour":20,"minute":0,"success":0,"failed":0},{"date":"2022-09-30","hour":21,"minute":0,"success":0,"failed":0},{"date":"2022-09-30","hour":22,"minute":0,"success":0,"failed":0},{"date":"2022-09-30","hour":23,"minute":0,"success":0,"failed":0},{"date":"2022-10-01","hour":0,"minute":0,"success":0,"failed":0},{"date":"2022-10-01","hour":1,"minute":0,"success":0,"failed":0},{"date":"2022-10-01","hour":2,"minute":0,"success":0,"failed":0},{"date":"2022-10-01","hour":3,"minute":0,"success":0,"failed":0},{"date":"2022-10-01","hour":4,"minute":0,"success":0,"failed":0},{"date":"2022-10-01","hour":5,"minute":0,"success":0,"failed":0},{"date":"2022-10-01","hour":6,"minute":0,"success":0,"failed":0},{"date":"2022-10-01","hour":7,"minute":0,"success":0,"failed":0},{"date":"2022-10-01","hour":8,"minute":0,"success":0,"failed":0},{"date":"2022-10-01","hour":9,"minute":0,"success":0,"failed":0},{"date":"2022-10-01","hour":10,"minute":0,"success":0,"failed":0},{"date":"2022-10-01","hour":11,"minute":0,"success":0,"failed":0},{"date":"2022-10-01","hour":12,"minute":0,"success":0,"failed":0},{"date":"2022-10-01","hour":13,"minute":0,"success":0,"failed":0},{"date":"2022-10-01","hour":14,"minute":0,"success":0,"failed":0},{"date":"2022-10-01","hour":15,"minute":0,"success":0,"failed":0},{"date":"2022-10-01","hour":16,"minute":0,"success":0,"failed":0}]}]
		axios.get.mockImplementation(() => Promise.resolve({data: response}))
		setUserToken("token")
		render(<App/>);
		route('/')

		await waitFor(() => {
			expect(screen.getByText('Ferdi'))
			expect(screen.getByText('url'))
			expect(screen.getByText('100%'))
			expect(screen.getByText('0'))
			expect(getCurrentUrl()).toBe('/');
		})
	})
});