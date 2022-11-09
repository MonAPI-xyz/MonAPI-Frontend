import { h } from 'preact';
import TextInput from '../../components/forms/textinput/index.js';
import { Button, Spinner, Text,Box, Flex, Grid, GridItem  } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import BASE_URL from '../../config/api/constant.js';
import { useState } from 'preact/hooks';
import { route } from 'preact-router';
import ROUTE from '../../config/api/route.js';

const ForgetPassword = ()=>{
    const [isLoading, setIsLoading] = useState(false)

    const {
      handleSubmit,
      register,
      formState: { errors },
    } = useForm();

    const [responseMessage, setResponseMessage] = useState('')
    const [errorMessage, setErrorMessage] = useState('')

    const onSubmit = async (data) => {
        setIsLoading(true);
        setErrorMessage('');
        setResponseMessage('');
        try {
            await axios.post(`${BASE_URL}/forget-password/token/`, data)
            .then(() => {
                setResponseMessage('Please check your email and follow instruction on the email')
                setIsLoading(false)
            })
        } catch(error) {
            if (error.response.data.error) {
                setErrorMessage(error['response']['data']['error'])
            } else if (error.response.data.email) {
                setErrorMessage(error['response']['data']['email'][0])
            } else {
                setErrorMessage('We have encountered an error. Please contact our team and try again')
            }
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
                        <Text mb={23} fontSize='32px' fontWeight='semibold' color='black'>
                            Forget Password
                        </Text>
                        <Box as='form' onSubmit={handleSubmit(onSubmit)} id="form-forget-password">
                            <TextInput 
                                id="email"
                                title='Email' 
                                placeholder='john@example.com' 
                                errors={errors}
                                rules={{
                                    required: 'Required',
                                }}
                                register={register}
                            />
                            <Box mb='20px' />
                            
                            {responseMessage != '' && <Text fontSize='14px' color={'green.500'}>{responseMessage}</Text>}

                            {errorMessage.length != 0 && (
                                <Text color='red'>Error: {errorMessage}</Text>                                
                            )}
                            <Box mb='20px' />

                            <Button form="form-forget-password" id='sendEmailButton' colorScheme='teal' type='submit' width='12em' borderRadius={10}>
                                {isLoading ? <Spinner /> : "Submit"}
                            </Button>
                            <Box mb='20px' />
                            <Text as='span' fontWeight='600'>    
                                <Text as='span' onClick={()=>route(ROUTE.LOGIN)} color='#4B8F8C' style={{cursor:'pointer', textDecoration: 'underline'}}>Login with your account</Text>
                            </Text>
                        </Box>
                        
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


export default ForgetPassword;