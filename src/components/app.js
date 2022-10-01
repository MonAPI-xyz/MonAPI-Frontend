import { h } from 'preact';
import { Router } from 'preact-router';
import Login from '../routes/login';
import Register from '../routes/register';
import { ChakraProvider } from '@chakra-ui/react';
import theme from '../config/theme';
import { Provider } from 'unistore/preact';
import { store } from '../config/store/store.js';
import ROUTE from '../config/api/route';
import { AuthenticationChecker } from '../config/middleware/middleware';
import DashboardWrapper from './dashboardWrapper/index.js';
import ViewListMonitor from '../routes/view_list_monitor/index.js';

const App = () => {
	return (<div id="app">
		<Provider store={store}>
			<ChakraProvider theme={theme}>
				<Router>
					<AuthenticationChecker path="/:*?">
						<DashboardWrapper path="/:*?">
							<Router>
								<ViewListMonitor path={ROUTE.DASHBOARD} />
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
