import { h } from 'preact';
import TextInput from '../../components/forms/textinput/index.js';
import { Button, Spinner, Text,Box, Flex, Grid, GridItem  } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import BASE_URL from '../../config/api/constant.js';
import { useState } from 'preact/hooks';

const ForgetPassword = ()=>{
    
    const [isLoading, setIsLoading] = useState(false)

    const {
      handleSubmit,
      register,
      formState: { errors },
    } = useForm();

    const [responseMessage, setResponseMessage] = useState('')

    const onSubmit = async (data) => {
        setIsLoading(true);
        try {
            await axios.post(`${BASE_URL}/forget-password/token/`, data)
            .then((response) => {
                setResponseMessage('please check your email for reset password link')
                setIsLoading(false)
            })
        } catch(error) {
            setResponseMessage(error['response']['data']['error'])
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
                            
                            {responseMessage != '' && <Text fontSize='14px' color={responseMessage ? 'green.500' : 'red.500'}>{responseMessage}</Text>}
                            <Box mb={responseMessage ? '10px' : '20px'} />

                            <Button form="form-forget-password" id='sendEmailButton' colorScheme='teal' type='submit' width='12em' borderRadius={10}>
                                {isLoading ? <Spinner /> : "Submit"}
                            </Button>
                            
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