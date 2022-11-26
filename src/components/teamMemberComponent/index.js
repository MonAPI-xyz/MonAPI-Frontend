import { h } from 'preact';
import { Flex, Spacer, Box, CloseButton, Text, Heading } from '@chakra-ui/react';
import { getUserToken } from '../../config/api/auth.js';
import axios from "axios";
import BASE_URL from '../../config/api/constant.js';

function TeamMemberComponent({email=null, verified=null, cancelUserId=null, header=false}){
    /*
        email= user name
        verified = Split into 2 case:
            true --> give green color and "member"
            false --> give grey color and "pending"
        cancelUserId = user_id that is not yet verified, only used when verified=false
    */
    if (header == true){
        return(
            <Flex>
                <Box w='180px' h='10'>
                    <Heading size='md'>Members</Heading>
                </Box>
                <Spacer />
                <Box w='100px' h='10'>
                    <Heading size='md'>Status</Heading>
                </Box>
                <Box w='80px' h='10'>
                </Box>
            </Flex>
        )
    } else if (verified) {
        return(
            <Flex>
                <Box w='180px' h='10'>
                    {email}
                </Box>
                <Spacer />
                <Box w='100px' h='10'>
                    <Text color='green'>member</Text>
                </Box>
                <Box w='80px' h='10'>
                </Box>
            </Flex>
        )
    } else {
        const data = {
            'user_id': cancelUserId
        }
        const removeUser = () => {
            axios.post(`${BASE_URL}/invite-member/cancel/`, data, {
                headers: {
                    Authorization: `Token ${getUserToken()}`
                }
            }).then(() => {
                window.location.reload()
            })
        }

        return(
            <Flex>
                <Box w='180px' h='10'>
                    {email}
                </Box>
                <Spacer />
                <Box w='100px' h='10'>
                    <Text color='grey'>pending</Text>
                </Box>
                <Box w='80px' h='10'>
                    <CloseButton size='md' onclick={removeUser}/>
                </Box>
            </Flex>
        )
    }

}
export default TeamMemberComponent;