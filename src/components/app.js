import { h } from 'preact';
import { Router } from 'preact-router';
import Home from '../routes/home';
import Login from '../routes/login';
import { ChakraProvider } from '@chakra-ui/react';
import theme from '../config/theme';
import { Provider } from 'unistore/preact';
import { store } from '../config/store/store.js';

const App = () => {
	return (<div id="app">
		<Provider store={store}>
			<ChakraProvider theme={theme}>
				<Router>
					<Home path="/" />
					<Login path="/login" />
				</Router>
			</ChakraProvider>
		</Provider>
	</div>);
}

export default App;
