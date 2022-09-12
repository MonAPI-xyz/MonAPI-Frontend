import { h } from 'preact';
import { Router } from 'preact-router';

// Code-splitting is automated for `routes` directory
import Home from '../routes/home';

const App = () => (
	<div id="app">
		<Router>
			<Home path="/" />
		</Router>
	</div>
)

export default App;
