import { h } from 'preact';
import { ChakraProvider } from '@chakra-ui/react';
import theme from '../../../src/config/theme';
import { render } from '@testing-library/preact';

describe('Test Theme', () => {
	
	test('setup theme', async () => {
		render(<ChakraProvider theme={theme}></ChakraProvider>);
	});

});