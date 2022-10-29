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
			"is_email_active": false,
			"email_host": "",
			"email_port": null,
			"email_username": "",
			"email_password": "",
			"email_use_tls": true,
			"email_use_ssl": true
		}
		axios.get.mockImplementation(() => Promise.resolve({data: response}))
		setUserToken("token")
		render(<App/>);
		route('/configuration/')

		const saveButton = screen.getByText("Save")
		userEvent.click(saveButton);

		axios.post.mockImplementation(()=>Promise.resolve({data: response}))

		await waitFor(() => {
			expect(screen.getByText("successful save configuration"))
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
			"is_email_active": false,
			"email_host": "",
			"email_port": null,
			"email_username": "",
			"email_password": "",
			"email_use_tls": true,
			"email_use_ssl": true
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
			"is_email_active": false,
			"email_host": "",
			"email_port": null,
			"email_username": "",
			"email_password": "",
			"email_use_tls": true,
			"email_use_ssl": true
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
	test('test form', async () => {
		const response = []
		axios.get.mockImplementation(() => Promise.resolve({data: response}))
		setUserToken("token")
		render(<App/>);
		route('/configuration/')

		await waitFor(() => {
			expect(screen.getByText('Slack'))
			expect(screen.getByText('Activate Slack Notification'))
			expect(screen.getByText('Token'))
			expect(screen.getByPlaceholderText('Insert your slack token'))
			// expect(screen.getByText('Channel ID'))
			expect(screen.getByPlaceholderText('Insert your slack channel ID'))
			expect(screen.getByText('Discord'))
			expect(screen.getByText('Activate Discord Notification'))
			expect(screen.getByText('Bot Token'))
			expect(screen.getByPlaceholderText('Insert your discord bot token'))
			expect(screen.getByText('Guild ID / Server ID'))
			expect(screen.getByPlaceholderText('Insert your discord guild ID / server ID'))
			// expect(screen.getByText('Channel ID'))
			expect(screen.getByPlaceholderText('Insert your discord channel ID'))
			expect(screen.getByText('Activate PagerDuty Notification'))
			expect(screen.getByText('PagerDuty API Key'))
			expect(screen.getByPlaceholderText('Insert your pagerduty API key'))
			expect(screen.getByText('Default From Email'))
			expect(screen.getByPlaceholderText('Insert bot pagerduty email'))
			expect(screen.getByText('Email SMTP'))
			expect(screen.getByText('Activate Email Notification'))
			expect(screen.getByText('SMTP Host'))
			expect(screen.getByPlaceholderText('Insert your email SMTP host'))
			expect(screen.getByText('SMTP Port'))
			expect(screen.getByPlaceholderText('Insert your email SMTP port'))
			expect(screen.getByText('Username'))
			expect(screen.getByPlaceholderText('Insert bot pagerduty username'))
			expect(screen.getByText('Password'))
			expect(screen.getByPlaceholderText('Insert bot pagerduty password'))
			expect(screen.getByText('Use TLS'))
			expect(screen.getByText('Use SSL'))
			
			expect(getCurrentUrl()).toBe('/configuration/');
		})
	})
});