import { h } from 'preact';
import { Box, Text, Spinner } from '@chakra-ui/react';

function LoadingPage(){
    return (
        <Box textAlign="center" py={10} px={6}>
            <Text color={'gray.500'}>Loading</Text>
            <Spinner />
            <Text color={'gray.500'}>We are Accessing Your Request</Text>
        </Box>
        )
}

export default LoadingPage;