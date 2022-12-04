import { h } from 'preact';
import { Router } from 'preact-router';
import { ChakraProvider } from '@chakra-ui/react';
import * as Sentry from "@sentry/react";
import { BrowserTracing } from "@sentry/tracing";
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
import CreateNewTeam from '../routes/createTeam/index.js';
import ViewCurrentTeam from '../routes/view_current_team/index.js';
import { UserContext } from '../config/context';
import { useState } from 'preact/hooks';
import AcceptInvite from '../routes/acceptInvite/index.js';
import StatusPageDashboard from '../routes/statusPageDashboard';
import EditTeam from '../routes/editTeam/index.js';
import StatusPage from '../routes/statusPage/index.js';

const App = () => {
	const sentryDSN = process.env.PREACT_APP_SENTRY_DSN;
	const [currentTeamId, setCurrentTeamId] = useState()
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
		<UserContext.Provider value={{currentTeam: [currentTeamId, setCurrentTeamId]}}>
			<ChakraProvider theme={theme}>
				<Router>
					<Login path={ROUTE.LOGIN} />
					<Register path={ROUTE.REGISTER} />
					<ForgetPassword path={ROUTE.FORGET_PASSWORD} />
					<ForgetPasswordToken path={ROUTE.FORGET_PASSWORD_TOKEN} />
					<AcceptInvite path={ROUTE.ACCEPT_INVITE} />
					<StatusPageDashboard path={ROUTE.STATUS_PAGE_DASHBOARD} />

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
								<CreateNewTeam path={ROUTE.TEAM_MANAGEMENT} />	
								<ViewCurrentTeam path={ROUTE.VIEW_CURRENT_TEAM} />			
								<CreateNewTeam path={ROUTE.TEAM_MANAGEMENT} />			
								<EditTeam path={ROUTE.TEAM_MANAGEMENT_EDIT} />
								<StatusPage path={ROUTE.STATUS_PAGE} />
								<Redirect path="/:*?" to="/" />
							</Router>							
						</DashboardWrapper>
					</AuthenticationChecker>
				</Router>
			</ChakraProvider>
		</UserContext.Provider>
		
	</div>);
}

export default App;
