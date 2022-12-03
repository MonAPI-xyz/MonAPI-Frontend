import { h } from 'preact';
import { Box, Heading, Text, Flex } from '@chakra-ui/react';
import { CloseIcon } from '@chakra-ui/icons';

function InvalidPage({headMessage, bodyMessage1, bodyMessage2}){
    return (
        <Box textAlign="center" py={10} px={6}>
            <Box display="inline-block">
            <Flex
                flexDirection="column"
                justifyContent="center"
                alignItems="center"
                bg={'red.500'}
                rounded={'50px'}
                w={'55px'}
                h={'55px'}
                textAlign="center">
                <CloseIcon boxSize={'20px'} color={'white'} />
            </Flex>
            </Box>
            <Heading as="h2" size="xl" mt={6} mb={2}>
                {headMessage}
            </Heading>
            <Text color={'gray.500'}>
                {bodyMessage1} <br></br>
                {bodyMessage2}
            </Text>
        </Box>
        )
}

export default InvalidPage;