import { h } from 'preact';
import { Router } from 'preact-router';
import { ChakraProvider } from '@chakra-ui/react';
import { Provider } from 'unistore/preact';
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
import Configuration from '../routes/configuration/index.js';

const App = () => {
	return (<div id="app">
		<Provider store={store}>
			<ChakraProvider theme={theme}>
				<Router>
					<AuthenticationChecker path="/:*?">
						<DashboardWrapper path="/:*?">
							<Router>
								<ViewListMonitor path={ROUTE.DASHBOARD} />
								<ViewAPIMonitorDetail path={ROUTE.DETAIL} />
								<ErrorLogs path={ROUTE.ERROR_LOGS} />
								<CreateAPIMonitor path={ROUTE.CREATE_API_MONITOR} />
								<Configuration path={ROUTE.CONFIGURATION} />			
							</Router>							
						</DashboardWrapper>
					</AuthenticationChecker>
					
					<Login path={ROUTE.LOGIN} />
					<Register path={ROUTE.REGISTER} />
				</Router>
			</ChakraProvider>
		</Provider>
		
	</div>);
}

export default App;
