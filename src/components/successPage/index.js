import { h } from 'preact';
import { Box, Heading, Text } from '@chakra-ui/react';
import { CheckCircleIcon } from '@chakra-ui/icons';

function SuccessPage({headMessage, bodyMessage1, bodyMessage2}){
    return (
        <Box textAlign="center" py={10} px={6}>
        <CheckCircleIcon boxSize={'50px'} color={'green.500'} />
        <Heading as="h2" size="xl" mt={6} mb={2}>
            {headMessage}
        </Heading>
        <Text color={'gray.500'}>
            {bodyMessage1} <br />
            {bodyMessage2}
        </Text>
        </Box>
    )
}

export default SuccessPage;