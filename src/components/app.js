import { h } from 'preact';
import { Router } from 'preact-router';

// Code-splitting is automated for `routes` directory
import Home from '../routes/home';
import Login from '../routes/login';
import { ChakraProvider } from '@chakra-ui/react';

const App = () => (
	<div id="app">
		<ChakraProvider>
			<Router>
				<Home path="/" />
				<Login path="/login" />
			</Router>
		</ChakraProvider>
	</div>
)

export default App;
