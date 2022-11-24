import { h } from "preact";
import { useState } from 'preact/hooks';
import { useEffect } from "react";
import { Box, Heading, Text, Flex, Spinner } from '@chakra-ui/react';
import { CheckCircleIcon, CloseIcon } from '@chakra-ui/icons';
import BASE_URL from '../../config/api/constant.js';
import axios from "axios";

const AcceptInvite = () => {

    const paramInviteToken = new URLSearchParams(window.location.search).get('key')
    const [inviteToken, setInviteToken] = useState(null)
    const [response, setResponse] = useState({})
    const [isLoading, setIsLoading] = useState(true)

    useEffect(async () => {
        if (inviteToken != null) {
            const data = {
                'key': inviteToken
            }
            axios.post(`${BASE_URL}/invite-member/accept/`, data)
            .then((backend_response) => {
                setIsLoading(false)
                setResponse(backend_response.response.data)
            })
            .catch((error) => {
                setIsLoading(false)
                setResponse(error.response.data)
            })
        }

    }, [inviteToken])

    if (paramInviteToken){
        setInviteToken(paramInviteToken);
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

    if (response.success == true) {
        return (
            <Box textAlign="center" py={10} px={6}>
            <CheckCircleIcon boxSize={'50px'} color={'green.500'} />
            <Heading as="h2" size="xl" mt={6} mb={2}>
                Team Invite Accepted
            </Heading>
            <Text color={'gray.500'}>
                You are now a part of a new team!
                Login to work with everyone else now.
            </Text>
            </Box>   
        )
    }

    if (response.error != null) {
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
                It seems like the token has expired or the invite was cancelled. <br></br>
                Please request another invite from your Team. <br></br>
                Error = {response.error}
            </Text>
        </Box>
        )
    }
}

export default AcceptInvite;