import { h } from 'preact';
import { Router } from 'preact-router';
import { ChakraProvider } from '@chakra-ui/react';
import { Provider } from 'unistore/preact';
import * as Sentry from "@sentry/react";
import { BrowserTracing } from "@sentry/tracing";
import { store } from '../config/store/store.js';
import theme from '../config/theme';
import ROUTE from '../config/api/route';
import { AuthenticationChecker } from '../config/middleware/middleware';
import DashboardWrapper from './dashboardWrapper';
import ViewListMonitor from '../routes/view_list_monitor';
import Login from '../routes/login';
import Register from '../routes/register';
import '../config/middleware/axios';
import ViewAPIMonitorDetail from '../routes/view_api_monitor_detail/index.js';
import ErrorLogs from '../routes/error_logs/index.js';
import CreateAPIMonitor from '../routes/createAPIMonitor';
import EditAPIMonitor from '../routes/editAPIMonitor';
import Configuration from '../routes/configuration/index.js';
import ForgetPassword from '../routes/forgetPassword/index.js';
import ForgetPasswordToken from '../routes/forgetPasswordToken/index.js';
import Redirect from './redirect/index.js';
import TestAPI from '../routes/a_test_api/index.js';

const App = () => {
	const sentryDSN = process.env.PREACT_APP_SENTRY_DSN;
	if (sentryDSN !== "") {
		Sentry.init({
			dsn: sentryDSN,
			integrations: [new BrowserTracing()],
		  
			// Set tracesSampleRate to 1.0 to capture 100%
			// of transactions for performance monitoring.
			// We recommend adjusting this value in production
			tracesSampleRate: 1.0,
		});	  
	}
	
	return (<div id="app">
		<Provider store={store}>
			<ChakraProvider theme={theme}>
				<Router>
					<Login path={ROUTE.LOGIN} />
					<Register path={ROUTE.REGISTER} />
					<ForgetPassword path={ROUTE.FORGET_PASSWORD} />
					<ForgetPasswordToken path={ROUTE.FORGET_PASSWORD_TOKEN} />

					<AuthenticationChecker path="/:*?">
						<DashboardWrapper path="/:*?">
							<Router>
								<ViewListMonitor path={ROUTE.DASHBOARD} />
								<ViewAPIMonitorDetail path={ROUTE.DETAIL} />
								<ErrorLogs path={ROUTE.ERROR_LOGS} />
								<CreateAPIMonitor path={ROUTE.CREATE_API_MONITOR} />
								<EditAPIMonitor path={ROUTE.EDIT} />
								<TestAPI path={ROUTE.TEST_API} />
								<Configuration path={ROUTE.CONFIGURATION} />			
								<Redirect path="/:*?" to="/" />
							</Router>							
						</DashboardWrapper>
					</AuthenticationChecker>
				</Router>
			</ChakraProvider>
		</Provider>
		
	</div>);
}

export default App;
