import { h, Fragment } from 'preact';
import { screen, waitFor, render } from '@testing-library/preact';
import * as axios from 'axios';
import { getCurrentUrl, route } from 'preact-router';
import App from '../../../src/components/app.js';
import moment from "moment"
import { setUserToken } from '../../../src/config/api/auth.js';

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

	test('there is a monitor in list', async () => {
		const response = [{"id":1,"name":"Ferdi","method":"GET","url":"url","schedule":"5MIN","body_type":"FORM","query_params":[],"headers":[],"body_form":[],"raw_body":[],"success_rate":100.0,"avg_response_time":0,"success_rate_history":[{"date":"2022-09-30","hour":17,"minute":0,"success":0,"failed":0},{"date":"2022-09-30","hour":18,"minute":0,"success":0,"failed":0},{"date":"2022-09-30","hour":19,"minute":0,"success":0,"failed":0},{"date":"2022-09-30","hour":20,"minute":0,"success":0,"failed":0},{"date":"2022-09-30","hour":21,"minute":0,"success":0,"failed":0},{"date":"2022-09-30","hour":22,"minute":0,"success":0,"failed":0},{"date":"2022-09-30","hour":23,"minute":0,"success":0,"failed":0},{"date":"2022-10-01","hour":0,"minute":0,"success":0,"failed":0},{"date":"2022-10-01","hour":1,"minute":0,"success":0,"failed":0},{"date":"2022-10-01","hour":2,"minute":0,"success":0,"failed":0},{"date":"2022-10-01","hour":3,"minute":0,"success":0,"failed":0},{"date":"2022-10-01","hour":4,"minute":0,"success":0,"failed":0},{"date":"2022-10-01","hour":5,"minute":0,"success":0,"failed":0},{"date":"2022-10-01","hour":6,"minute":0,"success":0,"failed":0},{"date":"2022-10-01","hour":7,"minute":0,"success":0,"failed":0},{"date":"2022-10-01","hour":8,"minute":0,"success":0,"failed":0},{"date":"2022-10-01","hour":9,"minute":0,"success":0,"failed":0},{"date":"2022-10-01","hour":10,"minute":0,"success":0,"failed":0},{"date":"2022-10-01","hour":11,"minute":0,"success":0,"failed":0},{"date":"2022-10-01","hour":12,"minute":0,"success":0,"failed":0},{"date":"2022-10-01","hour":13,"minute":0,"success":0,"failed":0},{"date":"2022-10-01","hour":14,"minute":0,"success":0,"failed":0},{"date":"2022-10-01","hour":15,"minute":0,"success":0,"failed":0},{"date":"2022-10-01","hour":16,"minute":0,"success":0,"failed":0}]}]
		axios.get.mockImplementation(() => Promise.resolve({data: response}))
		setUserToken("token")
		render(<App/>);
		route('/')

		await waitFor(() => {
			expect(screen.getAllByText('Ferdi'))
			expect(screen.getByText('url'))
			expect(screen.getByText('100%'))
			expect(screen.getByText('0 ms'))
			expect(getCurrentUrl()).toBe('/');
		})
	})

	test('last checked', async () => {
		const response = [{"id":1,"name":"Test API Monitor","method":"GET","url":"https://api-staging.monapi.xyz","schedule":"1MIN","body_type":"EMPTY","query_params":[{"id":1,"monitor":1,"key":"key query","value":"value query"}],"headers":[{"id":1,"monitor":1,"key":"key header","value":"value header"}],"body_form":[{"id":1,"monitor":1,"key":"key body","value":"value body"}],"raw_body":{"id":1,"monitor":1,"body":"{}"},"success_rate":"0.0","avg_response_time":20,"success_rate_history":[{"start_time":"2022-10-29T21:54:35.717815+07:00","end_time":"2022-10-29T22:54:35.717815+07:00","success":0,"failed":60},{"start_time":"2022-10-29T22:54:35.717815+07:00","end_time":"2022-10-29T23:54:35.717815+07:00","success":0,"failed":60},{"start_time":"2022-10-29T23:54:35.717815+07:00","end_time":"2022-10-30T00:54:35.717815+07:00","success":0,"failed":60},{"start_time":"2022-10-30T00:54:35.717815+07:00","end_time":"2022-10-30T01:54:35.717815+07:00","success":0,"failed":60},{"start_time":"2022-10-30T01:54:35.717815+07:00","end_time":"2022-10-30T02:54:35.717815+07:00","success":0,"failed":60},{"start_time":"2022-10-30T02:54:35.717815+07:00","end_time":"2022-10-30T03:54:35.717815+07:00","success":0,"failed":60},{"start_time":"2022-10-30T03:54:35.717815+07:00","end_time":"2022-10-30T04:54:35.717815+07:00","success":0,"failed":60},{"start_time":"2022-10-30T04:54:35.717815+07:00","end_time":"2022-10-30T05:54:35.717815+07:00","success":0,"failed":60},{"start_time":"2022-10-30T05:54:35.717815+07:00","end_time":"2022-10-30T06:54:35.717815+07:00","success":0,"failed":60},{"start_time":"2022-10-30T06:54:35.717815+07:00","end_time":"2022-10-30T07:54:35.717815+07:00","success":0,"failed":60},{"start_time":"2022-10-30T07:54:35.717815+07:00","end_time":"2022-10-30T08:54:35.717815+07:00","success":0,"failed":60},{"start_time":"2022-10-30T08:54:35.717815+07:00","end_time":"2022-10-30T09:54:35.717815+07:00","success":0,"failed":59},{"start_time":"2022-10-30T09:54:35.717815+07:00","end_time":"2022-10-30T10:54:35.717815+07:00","success":0,"failed":60},{"start_time":"2022-10-30T10:54:35.717815+07:00","end_time":"2022-10-30T11:54:35.717815+07:00","success":0,"failed":60},{"start_time":"2022-10-30T11:54:35.717815+07:00","end_time":"2022-10-30T12:54:35.717815+07:00","success":0,"failed":60},{"start_time":"2022-10-30T12:54:35.717815+07:00","end_time":"2022-10-30T13:54:35.717815+07:00","success":0,"failed":60},{"start_time":"2022-10-30T13:54:35.717815+07:00","end_time":"2022-10-30T14:54:35.717815+07:00","success":0,"failed":60},{"start_time":"2022-10-30T14:54:35.717815+07:00","end_time":"2022-10-30T15:54:35.717815+07:00","success":0,"failed":60},{"start_time":"2022-10-30T15:54:35.717815+07:00","end_time":"2022-10-30T16:54:35.717815+07:00","success":0,"failed":60},{"start_time":"2022-10-30T16:54:35.717815+07:00","end_time":"2022-10-30T17:54:35.717815+07:00","success":0,"failed":60},{"start_time":"2022-10-30T17:54:35.717815+07:00","end_time":"2022-10-30T18:54:35.717815+07:00","success":0,"failed":60},{"start_time":"2022-10-30T18:54:35.717815+07:00","end_time":"2022-10-30T19:54:35.717815+07:00","success":0,"failed":60},{"start_time":"2022-10-30T19:54:35.717815+07:00","end_time":"2022-10-30T20:54:35.717815+07:00","success":0,"failed":60},{"start_time":"2022-10-30T20:54:35.717815+07:00","end_time":"2022-10-30T21:54:35.717815+07:00","success":0,"failed":60}],"last_result":{"id":134491,"monitor":1,"execution_time":"2022-10-30T21:54:26.090562+07:00","response_time":19,"success":false,"status_code":401,"log_response":"{\"detail\":\"Authentication credentials were not provided.\"}","log_error":"Error code not in acceptable range 2xx"}}]
		axios.get.mockImplementation(() => Promise.resolve({data: response}))
		setUserToken("token")
		render(<App/>);
		route('/')
		let last_checked = moment(response[0]["last_result"]["execution_time"]).fromNow()

		await waitFor(() => {
			expect(screen.getAllByText('Test API Monitor'))
			expect(screen.getByText('https://api-staging.monapi.xyz'))
			expect(screen.getByText('0.0%'))
			expect(screen.getByText('20 ms'))
			expect(screen.getByText(`Last checked: ${last_checked}`))
			expect(getCurrentUrl()).toBe('/');
		})
	})

	test('indicator bar color', async () => {
		const response = [{"id":1,"name":"Ferdi","method":"GET","url":"url","schedule":"5MIN","body_type":"FORM","query_params":[],"headers":[],"body_form":[],"raw_body":[],"success_rate":100.0,"avg_response_time":0,"success_rate_history":[{"date":"2022-09-30","hour":17,"minute":0,"success":0,"failed":0},{"date":"2022-09-30","hour":18,"minute":0,"success":0,"failed":0},{"date":"2022-09-30","hour":19,"minute":0,"success":0,"failed":0},{"date":"2022-09-30","hour":20,"minute":0,"success":0,"failed":0},{"date":"2022-09-30","hour":21,"minute":0,"success":0,"failed":0},{"date":"2022-09-30","hour":22,"minute":0,"success":0,"failed":0},{"date":"2022-09-30","hour":23,"minute":0,"success":0,"failed":0},{"date":"2022-10-01","hour":0,"minute":0,"success":0,"failed":0},{"date":"2022-10-01","hour":1,"minute":0,"success":0,"failed":0},{"date":"2022-10-01","hour":2,"minute":0,"success":0,"failed":0},{"date":"2022-10-01","hour":3,"minute":0,"success":0,"failed":0},{"date":"2022-10-01","hour":4,"minute":0,"success":0,"failed":0},{"date":"2022-10-01","hour":5,"minute":0,"success":0,"failed":0},{"date":"2022-10-01","hour":6,"minute":0,"success":0,"failed":0},{"date":"2022-10-01","hour":7,"minute":0,"success":0,"failed":0},{"date":"2022-10-01","hour":8,"minute":0,"success":0,"failed":0},{"date":"2022-10-01","hour":9,"minute":0,"success":0,"failed":0},{"date":"2022-10-01","hour":10,"minute":0,"success":0,"failed":0},{"date":"2022-10-01","hour":11,"minute":0,"success":0,"failed":0},{"date":"2022-10-01","hour":12,"minute":0,"success":0,"failed":0},{"date":"2022-10-01","hour":13,"minute":0,"success":0,"failed":0},{"date":"2022-10-01","hour":14,"minute":0,"success":0,"failed":0},{"date":"2022-10-01","hour":15,"minute":0,"success":0,"failed":0},{"date":"2022-10-01","hour":16,"minute":0,"success":0,"failed":0}]}]
		axios.get.mockImplementation(() => Promise.resolve({data: response}))
		setUserToken("token")
		render(<App/>);
		route('/')

		await waitFor(() => {
			expect(screen.getByText('100% Success rate'));
			expect(screen.getByText('1-99% Success rate'));
			expect(screen.getByText('0% Success rate'));
			expect(screen.getByText('No data'));
		})
	})

	test('if there is no monitor in list', async () => {
		const response = []
		axios.get.mockImplementation(() => Promise.resolve({data: response}))
		setUserToken("token")
		render(<App/>);
		route('/')

		await waitFor(() => {
			expect(screen.getByText('There is no monitor. You can click green button "Create New" in the middle right side'))
			expect(getCurrentUrl()).toBe('/');
		})
	})
	
	test('success rate & response time chart', async () => {
		const response = [{"id":1,"name":"Ferdi","method":"GET","url":"url","schedule":"5MIN","body_type":"FORM","query_params":[],"headers":[],"body_form":[],"raw_body":[],"success_rate":100.0,"avg_response_time":0,"success_rate_history":[{"date":"2022-09-30","hour":17,"minute":0,"success":0,"failed":0},{"date":"2022-09-30","hour":18,"minute":0,"success":0,"failed":0},{"date":"2022-09-30","hour":19,"minute":0,"success":0,"failed":0},{"date":"2022-09-30","hour":20,"minute":0,"success":0,"failed":0},{"date":"2022-09-30","hour":21,"minute":0,"success":0,"failed":0},{"date":"2022-09-30","hour":22,"minute":0,"success":0,"failed":0},{"date":"2022-09-30","hour":23,"minute":0,"success":0,"failed":0},{"date":"2022-10-01","hour":0,"minute":0,"success":0,"failed":0},{"date":"2022-10-01","hour":1,"minute":0,"success":0,"failed":0},{"date":"2022-10-01","hour":2,"minute":0,"success":0,"failed":0},{"date":"2022-10-01","hour":3,"minute":0,"success":0,"failed":0},{"date":"2022-10-01","hour":4,"minute":0,"success":0,"failed":0},{"date":"2022-10-01","hour":5,"minute":0,"success":0,"failed":0},{"date":"2022-10-01","hour":6,"minute":0,"success":0,"failed":0},{"date":"2022-10-01","hour":7,"minute":0,"success":0,"failed":0},{"date":"2022-10-01","hour":8,"minute":0,"success":0,"failed":0},{"date":"2022-10-01","hour":9,"minute":0,"success":0,"failed":0},{"date":"2022-10-01","hour":10,"minute":0,"success":0,"failed":0},{"date":"2022-10-01","hour":11,"minute":0,"success":0,"failed":0},{"date":"2022-10-01","hour":12,"minute":0,"success":0,"failed":0},{"date":"2022-10-01","hour":13,"minute":0,"success":0,"failed":0},{"date":"2022-10-01","hour":14,"minute":0,"success":0,"failed":0},{"date":"2022-10-01","hour":15,"minute":0,"success":0,"failed":0},{"date":"2022-10-01","hour":16,"minute":0,"success":0,"failed":0}]}]
		const response_stats = {
			"success_rate": [
				{
					"start_time": "2022-10-14T10:18:39.865038+07:00",
					"end_time": "2022-10-14T11:18:39.865038+07:00",
					"success": 0,
					"failed": 0
				},
				{
					"start_time": "2022-10-14T11:18:39.865038+07:00",
					"end_time": "2022-10-14T12:18:39.865038+07:00",
					"success": 0,
					"failed": 0
				},
				{
					"start_time": "2022-10-14T12:18:39.865038+07:00",
					"end_time": "2022-10-14T13:18:39.865038+07:00",
					"success": 0,
					"failed": 0
				},
				{
					"start_time": "2022-10-14T13:18:39.865038+07:00",
					"end_time": "2022-10-14T14:18:39.865038+07:00",
					"success": 0,
					"failed": 0
				},
				{
					"start_time": "2022-10-14T14:18:39.865038+07:00",
					"end_time": "2022-10-14T15:18:39.865038+07:00",
					"success": 0,
					"failed": 0
				},
				{
					"start_time": "2022-10-14T15:18:39.865038+07:00",
					"end_time": "2022-10-14T16:18:39.865038+07:00",
					"success": 0,
					"failed": 0
				},
				{
					"start_time": "2022-10-14T16:18:39.865038+07:00",
					"end_time": "2022-10-14T17:18:39.865038+07:00",
					"success": 0,
					"failed": 0
				},
				{
					"start_time": "2022-10-14T17:18:39.865038+07:00",
					"end_time": "2022-10-14T18:18:39.865038+07:00",
					"success": 0,
					"failed": 0
				},
				{
					"start_time": "2022-10-14T18:18:39.865038+07:00",
					"end_time": "2022-10-14T19:18:39.865038+07:00",
					"success": 0,
					"failed": 0
				},
				{
					"start_time": "2022-10-14T19:18:39.865038+07:00",
					"end_time": "2022-10-14T20:18:39.865038+07:00",
					"success": 0,
					"failed": 0
				},
				{
					"start_time": "2022-10-14T20:18:39.865038+07:00",
					"end_time": "2022-10-14T21:18:39.865038+07:00",
					"success": 0,
					"failed": 0
				},
				{
					"start_time": "2022-10-14T21:18:39.865038+07:00",
					"end_time": "2022-10-14T22:18:39.865038+07:00",
					"success": 0,
					"failed": 0
				},
				{
					"start_time": "2022-10-14T22:18:39.865038+07:00",
					"end_time": "2022-10-14T23:18:39.865038+07:00",
					"success": 0,
					"failed": 0
				},
				{
					"start_time": "2022-10-14T23:18:39.865038+07:00",
					"end_time": "2022-10-15T00:18:39.865038+07:00",
					"success": 0,
					"failed": 0
				},
				{
					"start_time": "2022-10-15T00:18:39.865038+07:00",
					"end_time": "2022-10-15T01:18:39.865038+07:00",
					"success": 0,
					"failed": 0
				},
				{
					"start_time": "2022-10-15T01:18:39.865038+07:00",
					"end_time": "2022-10-15T02:18:39.865038+07:00",
					"success": 0,
					"failed": 0
				},
				{
					"start_time": "2022-10-15T02:18:39.865038+07:00",
					"end_time": "2022-10-15T03:18:39.865038+07:00",
					"success": 0,
					"failed": 0
				},
				{
					"start_time": "2022-10-15T03:18:39.865038+07:00",
					"end_time": "2022-10-15T04:18:39.865038+07:00",
					"success": 0,
					"failed": 0
				},
				{
					"start_time": "2022-10-15T04:18:39.865038+07:00",
					"end_time": "2022-10-15T05:18:39.865038+07:00",
					"success": 0,
					"failed": 0
				},
				{
					"start_time": "2022-10-15T05:18:39.865038+07:00",
					"end_time": "2022-10-15T06:18:39.865038+07:00",
					"success": 0,
					"failed": 0
				},
				{
					"start_time": "2022-10-15T06:18:39.865038+07:00",
					"end_time": "2022-10-15T07:18:39.865038+07:00",
					"success": 0,
					"failed": 0
				},
				{
					"start_time": "2022-10-15T07:18:39.865038+07:00",
					"end_time": "2022-10-15T08:18:39.865038+07:00",
					"success": 0,
					"failed": 0
				},
				{
					"start_time": "2022-10-15T08:18:39.865038+07:00",
					"end_time": "2022-10-15T09:18:39.865038+07:00",
					"success": 0,
					"failed": 0
				},
				{
					"start_time": "2022-10-15T09:18:39.865038+07:00",
					"end_time": "2022-10-15T10:18:39.865038+07:00",
					"success": 0,
					"failed": 0
				}
			],
			"response_time": [
				{
					"start_time": "2022-10-14T10:18:39.865038+07:00",
					"end_time": "2022-10-14T11:18:39.865038+07:00",
					"avg": 0
				},
				{
					"start_time": "2022-10-14T11:18:39.865038+07:00",
					"end_time": "2022-10-14T12:18:39.865038+07:00",
					"avg": 0
				},
				{
					"start_time": "2022-10-14T12:18:39.865038+07:00",
					"end_time": "2022-10-14T13:18:39.865038+07:00",
					"avg": 0
				},
				{
					"start_time": "2022-10-14T13:18:39.865038+07:00",
					"end_time": "2022-10-14T14:18:39.865038+07:00",
					"avg": 0
				},
				{
					"start_time": "2022-10-14T14:18:39.865038+07:00",
					"end_time": "2022-10-14T15:18:39.865038+07:00",
					"avg": 0
				},
				{
					"start_time": "2022-10-14T15:18:39.865038+07:00",
					"end_time": "2022-10-14T16:18:39.865038+07:00",
					"avg": 0
				},
				{
					"start_time": "2022-10-14T16:18:39.865038+07:00",
					"end_time": "2022-10-14T17:18:39.865038+07:00",
					"avg": 0
				},
				{
					"start_time": "2022-10-14T17:18:39.865038+07:00",
					"end_time": "2022-10-14T18:18:39.865038+07:00",
					"avg": 0
				},
				{
					"start_time": "2022-10-14T18:18:39.865038+07:00",
					"end_time": "2022-10-14T19:18:39.865038+07:00",
					"avg": 0
				},
				{
					"start_time": "2022-10-14T19:18:39.865038+07:00",
					"end_time": "2022-10-14T20:18:39.865038+07:00",
					"avg": 0
				},
				{
					"start_time": "2022-10-14T20:18:39.865038+07:00",
					"end_time": "2022-10-14T21:18:39.865038+07:00",
					"avg": 0
				},
				{
					"start_time": "2022-10-14T21:18:39.865038+07:00",
					"end_time": "2022-10-14T22:18:39.865038+07:00",
					"avg": 0
				},
				{
					"start_time": "2022-10-14T22:18:39.865038+07:00",
					"end_time": "2022-10-14T23:18:39.865038+07:00",
					"avg": 0
				},
				{
					"start_time": "2022-10-14T23:18:39.865038+07:00",
					"end_time": "2022-10-15T00:18:39.865038+07:00",
					"avg": 0
				},
				{
					"start_time": "2022-10-15T00:18:39.865038+07:00",
					"end_time": "2022-10-15T01:18:39.865038+07:00",
					"avg": 0
				},
				{
					"start_time": "2022-10-15T01:18:39.865038+07:00",
					"end_time": "2022-10-15T02:18:39.865038+07:00",
					"avg": 0
				},
				{
					"start_time": "2022-10-15T02:18:39.865038+07:00",
					"end_time": "2022-10-15T03:18:39.865038+07:00",
					"avg": 0
				},
				{
					"start_time": "2022-10-15T03:18:39.865038+07:00",
					"end_time": "2022-10-15T04:18:39.865038+07:00",
					"avg": 0
				},
				{
					"start_time": "2022-10-15T04:18:39.865038+07:00",
					"end_time": "2022-10-15T05:18:39.865038+07:00",
					"avg": 0
				},
				{
					"start_time": "2022-10-15T05:18:39.865038+07:00",
					"end_time": "2022-10-15T06:18:39.865038+07:00",
					"avg": 0
				},
				{
					"start_time": "2022-10-15T06:18:39.865038+07:00",
					"end_time": "2022-10-15T07:18:39.865038+07:00",
					"avg": 0
				},
				{
					"start_time": "2022-10-15T07:18:39.865038+07:00",
					"end_time": "2022-10-15T08:18:39.865038+07:00",
					"avg": 0
				},
				{
					"start_time": "2022-10-15T08:18:39.865038+07:00",
					"end_time": "2022-10-15T09:18:39.865038+07:00",
					"avg": 0
				},
				{
					"start_time": "2022-10-15T09:18:39.865038+07:00",
					"end_time": "2022-10-15T10:18:39.865038+07:00",
					"avg": 0
				}
			]
		}
		axios.get.mockImplementation((url) => {
			if (url.includes('monitor/stats/')) {
			  return Promise.resolve({ data: response_stats }) 
			}
			else {
				return Promise.resolve({ data: response})
			}
		  });
		setUserToken("token")
		render(<App/>);
		route('/')

		await waitFor(() => {
			expect(screen.getAllByText('Ferdi'))
			expect(screen.getByText('url'))
			expect(screen.getByText('100%'))
			expect(screen.getByText('0 ms'))
			expect(getCurrentUrl()).toBe('/');
		})
	})

	
});