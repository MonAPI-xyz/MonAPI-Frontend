import { h } from 'preact';
import TextInput from '../../components/forms/textinput/index.js';
import PasswordInput from '../../components/forms/passwordinput/index.js';
import { Button, Spinner, Text,Box, Flex, Grid, GridItem  } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { connect } from 'unistore/preact';
import { actions } from '../../config/store/store.js';
import axios from 'axios';
import BASE_URL from '../../config/api/constant.js';
import { setUserToken } from '../../config/api/auth.js';
import { route } from 'preact-router';
import { useState } from 'preact/hooks';
import { isAuthenticate } from '../../config/middleware/middleware.js';
import ROUTE from '../../config/api/route.js';

const Login = connect('user', actions)( 
    ({ setUser }) =>{
    
    const paramIsRegistered = new URLSearchParams(window.location.search).get('isRegistered')
    const paramIsChangePassword = new URLSearchParams(window.location.search).get('isChangePassword')
    const [isRegistered, setIsRegistered] = useState(null)
    const [isChangePassword, setIsChangePassword] = useState(null)
    const [isLoading, setIsLoading] = useState(false)

    if (paramIsRegistered) {
        setIsRegistered(true)
    }
    if (paramIsChangePassword) {
        setIsChangePassword(true)
    }

    if (!isAuthenticate()) {
    const {
      handleSubmit,
      register,
      formState: { errors },
    } = useForm();

    const [responseMessage, setResponseMessage] = useState('')

    const onSubmit = async (data) => {
        setIsLoading(true);
        try {
            await axios.post(`${BASE_URL}/auth/login/`, data)
            .then((response) => {
                setResponseMessage('')
                setUserToken(response['data']['token'])
                setUser(response['data']['email'])
                route(ROUTE.LOGIN)
            })
        } catch(error) {
            setResponseMessage(error['response']['data']['response'])
            setIsLoading(false)
        }
    };
    return (
        <Flex
            minH='100vh'
            backgroundRepeat='no-repeat'
            justify='center'
            align='center'
        >   
            <Grid w='full' h='full' px='49px' templateColumns='repeat(10, 1fr)' gap={40} 
            >
                <GridItem colSpan={4} 
                alignSelf='center'
                >
                    <Box verticalAlign='center'>
                    {isRegistered && (
                    <Text color='green'>
                        User Created Successfully!
                    </Text>
                    )}
                    {isChangePassword && (
                    <Text color='green'>
                        Password changed successfully. Please login with your new password.
                    </Text>
                    )}
                        <Text mb={23} fontSize='32px' fontWeight='semibold' color='black'>
                            Login
                        </Text>
                        <Box as='form' onSubmit={handleSubmit(onSubmit)} id="form-login">
                            <TextInput 
                                id="email"
                                title='Email' 
                                placeholder='john@example.com' 
                                errors={errors}
                                rules={{
                                    required: 'Required',
                                    minLength: { value: 3, message: 'Minimum length should be 3' },
                                }}
                                register={register}
                            />
                            <Box mb='20px' />
                            
                            <PasswordInput
                                id="password"
                                register={register}
                                errors={errors}
                                title="Password"
                                placeholder='************'
                                rules={{
                                    required: 'Required',
                                    minLength: { value: 8, message: 'Minimum length should be 8' },
                                }}
                            />
                            <Box mb='10px' />
                            {responseMessage != '' && <Text fontSize='14px' color='red.500'>{responseMessage}</Text>}
                            <Box mb={responseMessage ? '10px' : '20px'} />

                            <Button form="form-login" id='signInButton' colorScheme='teal' type='submit' width='12em' borderRadius={10}>
                                {isLoading ? <Spinner /> : "Sign In"}
                            </Button>
                            
                        </Box>
                        
                        
                        
                        <Box mb='20px' />
                        <Text as='span'>or </Text>
                        <Text as='span' fontWeight='600'>    
                            <Text as='span' onClick={()=>route(ROUTE.REGISTER)} color='#4B8F8C' style={{cursor:'pointer', textDecoration: 'underline'}}>sign up</Text> to create new account
                        </Text>
                        <Box mb='20px' />
                        <Text as='span' fontWeight='600'>    
                            <Text as='span' onClick={()=>route(ROUTE.FORGET_PASSWORD)} color='#4B8F8C' style={{cursor:'pointer', textDecoration: 'underline'}}>Forget your password? </Text>
                        </Text>
                    </Box>
                                        
                </GridItem>
                <GridItem colSpan={5}>
                    <Text fontSize='64px' fontWeight='semibold' color='black' >
                        Get Better Insight About Your API Performance in Seconds
                    </Text>
                </GridItem>
            </Grid>
        </Flex>
            );
        } 
            route(ROUTE.DASHBOARD)
        
}
)

export default Login;