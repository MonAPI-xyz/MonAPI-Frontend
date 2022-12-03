import { h } from 'preact';
import { useState } from 'preact/hooks';
import { useEffect } from "react";
import { Box, Heading, Text, Flex, Spinner } from '@chakra-ui/react';
import { CheckCircleIcon, CloseIcon } from '@chakra-ui/icons';
import BASE_URL from '../../config/api/constant.js';
import axios from "axios";

const VerifyUser = () => {

    const paramVerifyToken = new URLSearchParams(window.location.search).get('key')
    const [verifyToken, setVerifyToken] = useState(null)
    const [response, setResponse] = useState({})
    const [isLoading, setIsLoading] = useState(true)

    useEffect(async () => {
        console.log("Entereing useEffect with verifyToken =", verifyToken)
        if (verifyToken != null) {
            const data = {
                'key': verifyToken
            }
            axios.post(`${BASE_URL}/register/verify`, data)
            .then((backend_response) => {
                setIsLoading(false)
                setResponse({
                    success: true
                })
            })
            .catch((error) => {
                console.log("Error:", error)
                setIsLoading(false)
                setResponse({
                    success: false
                })
            })
        }
        
    }, [verifyToken])

    if (paramVerifyToken){
        setVerifyToken(paramVerifyToken);
    } else {
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
                    Token Not Passed
                </Heading>
                <Text color={'gray.500'}>
                    You are not supposed to see this page.
                </Text>
            </Box>
        )
    }

    if (isLoading) {
        return (
        <Box textAlign="center" py={10} px={6}>
            <Text color={'gray.500'}>Loading</Text>
            <Spinner />
            <Text color={'gray.500'}>We are Accessing Your Request</Text>
        </Box>
        )
    }

    if (response.success) {
        return (
            <Box textAlign="center" py={10} px={6}>
            <CheckCircleIcon boxSize={'50px'} color={'green.500'} />
            <Heading as="h2" size="xl" mt={6} mb={2}>
                User Email Verified
            </Heading>
            <Text color={'gray.500'}>
                You are now a verified user!
                You can login now.
            </Text>
            </Box>
        )
    } else {
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
                Token Invalid
            </Heading>
            <Text color={'gray.500'}>
                Please check the link you followed are correctly copied from the email you receive. <br></br>
            </Text>
        </Box>
        )
    }

}

export default VerifyUser;