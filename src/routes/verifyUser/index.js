import { h } from 'preact';
import { useState } from 'preact/hooks';
import { useEffect } from "react";
import { Box, Heading, Text, Flex, Spinner } from '@chakra-ui/react';
import { CheckCircleIcon, CloseIcon } from '@chakra-ui/icons';
import BASE_URL from '../../config/api/constant.js';
import axios from "axios";

import SuccessPage from '../../components/successPage/index.js';
import InvalidPage from '../../components/invalidPage/index.js';
import LoadingPage from '../../components/loadingPage/index.js';

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
        return <InvalidPage headMessage={"Token Not Passed"}
                            bodyMessage1={"You are not supposed to see this page."} />
    }

    if (isLoading) {
        return <LoadingPage />
    }

    if (response.success) {
        return <SuccessPage headMessage={"User Email Verified"} 
                            bodyMessage1={`You are now a verified user!`}
                            bodyMessage2={'You can login now.'}/>
    } else {
        return <InvalidPage headMessage={"Token Invalid"}
                            bodyMessage1={"Please check the link you followed are correctly copied from the email you receive."}/>
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