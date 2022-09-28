import { h } from 'preact';
import { Router } from 'preact-router';
import SideBar from './SideBar';
import Login from '../routes/login';
import { ChakraProvider } from '@chakra-ui/react';
import theme from '../config/theme';
import { Provider } from 'unistore/preact';
import { store } from '../config/store/store.js';
import ROUTE from '../config/api/route';

const App = () => {
	return (<div id="app">
		<Provider store={store}>
			<ChakraProvider theme={theme}>
				<Router>
					<SideBar path="/" />
					<Login path={ROUTE.LOGIN} />
				</Router>
			</ChakraProvider>
		</Provider>
	</div>);
}

export default App;
