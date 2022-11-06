import { h } from 'preact';
import style from './style.css';
import {Text} from '@chakra-ui/react';

const TestAPI = () => {

	return(
        <div class={style['test-api']}>
            <Text fontSize='24px' fontWeight='semibold' color='black'>
				API Test
			</Text>
        </div>		
	)
	
};

export default TestAPI;