import { h } from 'preact';
import { render } from '@testing-library/preact';
import App from '../../src/components/app.js';

describe('Test App', () => {
	beforeEach(() => {
		jest.resetModules()
    });
	
	test('setup app', async () => {
		render(<App/>);
	});
	
	test('setup app without sentry', async () => {
		const prevEnv = process.env.PREACT_APP_SENTRY_DSN;
		process.env.PREACT_APP_SENTRY_DSN = "";

		render(<App />)

		process.env.PREACT_APP_SENTRY_DSN = prevEnv;

	})
});