import { h } from 'preact';
import { Router } from 'preact-router';
import Home from '../routes/home';
import Login from '../routes/login';
import Register from '../routes/register';
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
					<Home path={ROUTE.DASHBOARD} />
					<Login path={ROUTE.LOGIN} />
					<Register path={ROUTE.REGISTER} />
				</Router>
			</ChakraProvider>
		</Provider>
		<AuthenticationChecker/>
	</div>);
}

export default App;
