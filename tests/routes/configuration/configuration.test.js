import { h } from 'preact';
import { screen, waitFor, render } from '@testing-library/preact';
import * as axios from 'axios';
import { getCurrentUrl, route } from 'preact-router';
import App from '../../../src/components/app.js';
import Configuration from '../../../src/routes/configuration/index.js'
import userEvent from '@testing-library/user-event'
import { setUserToken } from '../../../src/config/api/auth.js';

jest.mock("axios");

describe('Test configuration sites', () => {
	test('try to access configuration sites', async () => {
		const response = []
		axios.get.mockImplementation(() => Promise.resolve({data: response}))
		setUserToken("token")
		render(<App/>);
		route('/configuration/')

		await waitFor(() => {
			expect(getCurrentUrl()).toBe('/configuration/');
		})
	})	
	
	test('test save config', async () => {
		const response = {
			"is_slack_active": false,
			"slack_token": "",
			"slack_channel_id": "",
			"is_discord_active": false,
			"discord_bot_token": "",
			"discord_guild_id": "",
			"discord_channel_id": "",
			"is_pagerduty_active": false,
			"pagerduty_api_key": "",
			"pagerduty_default_from_email": "",
			"pagerduty_service_id": "",
			"is_email_active": false,
			"email_host": "",
			"email_port": null,
			"email_username": "",
			"email_password": "",
			"email_use_tls": true,
			"email_use_ssl": true,
			"threshold_pct": 100,
			"time_window":'1H',
		}
		axios.get.mockImplementation(() => Promise.resolve({data: response}))
		setUserToken("token")
		render(<App/>);
		route('/configuration/')

		const saveButton = screen.getByText("Save")
		userEvent.click(saveButton);

		axios.post.mockImplementation(()=>Promise.resolve({data: response}))

		await waitFor(() => {
			expect(screen.getByText("Successful save configuration"))
			expect(getCurrentUrl()).toBe('/configuration/');
		})
	})	

	test('test save config loading', async () => {
		const response = {
			"is_slack_active": false,
			"slack_token": "",
			"slack_channel_id": "",
			"is_discord_active": false,
			"discord_bot_token": "",
			"discord_guild_id": "",
			"discord_channel_id": "",
			"is_pagerduty_active": false,
			"pagerduty_api_key": "",
			"pagerduty_default_from_email": "",
			"pagerduty_service_id": "",
			"is_email_active": false,
			"email_host": "",
			"email_port": null,
			"email_username": "",
			"email_password": "",
			"email_use_tls": true,
			"email_use_ssl": true,
			"threshold_pct":100,
			"time_window":'1H',
		}
		axios.get.mockImplementation(() => Promise.resolve({data: response}))
		setUserToken("token")
		render(<App/>);
		route('/configuration/')

		const saveButton = screen.getByText("Save")
		userEvent.click(saveButton);		

		axios.post.mockImplementation(() => {
            return new Promise((resolve)=> {
                setTimeout(() =>  resolve({ 
                    data: response
                }), 3000)
            })
        })		

		await waitFor(() => {
			expect(screen.getByText("Loading..."))
		})

		userEvent.click(saveButton);
	})	

	test('test save config failed', async () => {
		const response = {
			"is_slack_active": false,
			"slack_token": "",
			"slack_channel_id": "",
			"is_discord_active": false,
			"discord_bot_token": "",
			"discord_guild_id": "",
			"discord_channel_id": "",
			"is_pagerduty_active": false,
			"pagerduty_api_key": "",
			"pagerduty_default_from_email": "",
			"pagerduty_service_id": "",
			"is_email_active": false,
			"email_host": "",
			"email_port": null,
			"email_username": "",
			"email_password": "",
			"email_use_tls": true,
			"email_use_ssl": true,
			"threshold_pct":100,
			"time_window":'1H',
		}
		axios.get.mockImplementation(() => Promise.resolve({data: response}))
		setUserToken("token")
		render(<App/>);
		route('/configuration/')

		const saveButton = screen.getByText("Save")
		userEvent.click(saveButton);

		axios.post.mockImplementation(()=>Promise.reject({response: {data:{error:"error test case"}}}))

		await waitFor(() => {
			expect(screen.getByText("error test case"))
			expect(getCurrentUrl()).toBe('/configuration/');
		})
	})	

	test('when do wrong input on Threshold, then appears error message', async () => {
		const response = {
			"is_slack_active": false,
			"slack_token": "",
			"slack_channel_id": "",
			"is_discord_active": false,
			"discord_bot_token": "",
			"discord_guild_id": "",
			"discord_channel_id": "",
			"is_pagerduty_active": false,
			"pagerduty_api_key": "",
			"pagerduty_default_from_email": "",
			"pagerduty_service_id": "",
			"is_email_active": false,
			"email_host": "",
			"email_port": null,
			"email_username": "",
			"email_password": "",
			"email_use_tls": true,
			"email_use_ssl": true,
			"threshold_pct":100,
			"time_window":'1H',
		}
		axios.get.mockImplementation(() => Promise.resolve({data: response}))
		setUserToken("token")
		render(<Configuration/>);

		const saveButton = screen.getByText("Save")

		const thresholdAccordion = screen.getByText("Threshold")
		userEvent.click(thresholdAccordion);
		
		const thresholdValueInput = screen.getByPlaceholderText("Insert the integer value from 1 to 100")
		
		userEvent.clear(thresholdValueInput)
		userEvent.click(saveButton);
		await waitFor(() => {
			expect(screen.getByText("Required"))
		})

		userEvent.clear(thresholdValueInput)
		userEvent.type(thresholdValueInput, '90.5')
		userEvent.click(saveButton);
		await waitFor(() => {
			expect(screen.getByText("Value must be integer"))
		})
	})
});