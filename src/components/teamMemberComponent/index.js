import { h, Fragment } from 'preact';
import { Flex, Spacer, Box, CloseButton, Text, Heading, Spinner } from '@chakra-ui/react';
import { getUserToken } from '../../config/api/auth.js';
import axios from "axios";
import BASE_URL from '../../config/api/constant.js';
import { useState } from 'preact/hooks';

function TeamMemberComponent({email=null, verified=null, cancelUserId=null, header=false, refreshTeamData=()=>{}}){
    /*
    email= user name
    verified = Split into 2 case:
    true --> give green color and "member"
            false --> give grey color and "pending"
        cancelUserId = user_id that is not yet verified, only used when verified=false
    */

   const [isLoadingDelete, setIsLoadingDelete]  = useState(false);
    if (header){
        return(
            <Flex>
                <Box w='180px' h='10'>
                    <Heading size='md'>Members</Heading>
                </Box>
                <Spacer />
                <Box w='100px' h='10'>
                    <Heading size='md'>Status</Heading>
                </Box>
                <Box w='80px' h='10' />
            </Flex>
        )
    } 

    
    const removeUser = () => {
        setIsLoadingDelete(true);
        const data = {
            user_id: cancelUserId
        }

        axios.post(`${BASE_URL}/invite-member/cancel/`, data, {
            headers: {
                Authorization: `Token ${getUserToken()}`
            }
        }).then(() => {
            refreshTeamData();
        })
    }

    return(
        <Flex>
            <Box w='250px' h='10'>
                {email}
            </Box>
            <Spacer />
            {verified ? 
                <>
                    <Box w='100px' h='10'>
                        <Text color='green'>member</Text>
                    </Box>
                    <Box w='80px' h='10' />
                </>
            :
                <>
                    <Box w='100px' h='10'>
                        <Text color='grey'>pending</Text>
                    </Box>
                    <Box w='80px' h='10'>
                        {isLoadingDelete ? 
                            <Spinner /> 
                        :    
                            <CloseButton size='md' onclick={removeUser} />
                        }
                    </Box>
                </>
            }
        </Flex>
    )
}

export default TeamMemberComponent;