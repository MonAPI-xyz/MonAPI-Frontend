import { h } from 'preact';
import { Router } from 'preact-router';
import SideBar from './sideBar/index.js';
import Login from '../routes/login';
import { ChakraProvider } from '@chakra-ui/react';
import theme from '../config/theme';
import { Provider } from 'unistore/preact';
import { store } from '../config/store/store.js';
import ROUTE from '../config/api/route';
import { AuthenticationChecker } from '../config/middleware/middleware';

const App = () => {
	return (<div id="app">
		<Provider store={store}>
			<ChakraProvider theme={theme}>
				<Router>
					<AuthenticationChecker path="/:*?">
						<SideBar path={ROUTE.DASHBOARD} />
					</AuthenticationChecker>
					<Login path={ROUTE.LOGIN} />
					<div path={ROUTE.REGISTER} />
				</Router>
			</ChakraProvider>
		</Provider>
		
	</div>);
}

export default App;
