import TextInput from '../../components/forms/textinput/index.js'
import { h } from "preact";
import PasswordInput from '../../components/forms/passwordinput/index.js'
import { Button, Text  } from '@chakra-ui/react';
import {Box, Flex, Grid, GridItem } from '@chakra-ui/layout';
import { useForm } from 'react-hook-form';

function Register() {
    console.log("Entering Register")
    const {
      handleSubmit,
      register,
      formState: { errors },
    } = useForm();

    const onSubmit = () => {};

    return         (
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
                    Register
                </Text>
                <Box as='form' onSubmit={handleSubmit(onSubmit)}>
                    <TextInput 
                        id="email"
                        title='Email' 
                        placeholder='Your Email'
                        errors={errors}
                        register={register}
                    />
                    <Box mb='20px'/>
                    
                    <PasswordInput
                        id="password"
                        title="Password"
                        placeholder='Password'
                        errors={errors}
                        register={register}
                    />
                    <Box mb='20px'/>

                    <PasswordInput
                        id="password2"
                        title="Password2"
                        placeholder='Confirm Password'
                        errors={errors}
                        register={register}
                    />
                    <Box mb='20px'/>
                    <Button id='signInButton' colorScheme='teal' type='submit' width='12em' borderRadius={10}>
                        Sign Up
                    </Button>
                </Box>
                
                <Box mb='20px'/>
                <Text as='span'>or </Text>
                <Text as='u' fontWeight='600'>    
                    Have an account? <Text as='span' color='#4B8F8C'>sign in</Text> to login.
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

export default Register;