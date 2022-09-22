import { h } from 'preact';
import { Router } from 'preact-router';

// Code-splitting is automated for `routes` directory
import Home from '../routes/home';
import Login from '../routes/login';
import { ChakraProvider } from '@chakra-ui/react';
// import { store, useGlobalState } from 'preact-global-state';
import { Provider } from 'unistore/preact';
import { store } from '../config/store/store.js';

const App = () => {
	return (<div id="app">
		<Provider store={store}>
			<ChakraProvider>
				<Router>
					<Home path="/" />
					<Login path="/login" />
				</Router>
			</ChakraProvider>
		</Provider>
	</div>);
}

export default App;
