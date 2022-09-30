import TextInput from '../../components/forms/textinput/index.js'
import { h } from "preact";
import { useState } from "preact/hooks";
import PasswordInput from '../../components/forms/passwordinput/index.js'
import { Button, Text  } from '@chakra-ui/react';
import {Box, Flex, Grid, GridItem } from '@chakra-ui/layout';
import { useForm } from 'react-hook-form';
import { route } from 'preact-router';
import ROUTE from '../../config/api/route.js';
import * as axios from "axios";

function Register() {
    console.log("Entering Register")
    
    const [errl, setErrl] = useState([])
    // Success
    const [succ, setSucc] = useState([])

    const {
      handleSubmit,
      register,
      formState: { errors },
    } = useForm();

    const onSubmit = (res) => {
        const data = {
            email: res.email,
            password: res.password,
            password2: res.password2
        }

        axios.post(`https://api-staging.monapi.xyz/register/api`, data)
        .then(data => {
            setSucc("User Created Successfully!");
            setErrl([]);
        }) 
        .catch((error) => {
            console.log("ERROR FROM VIEW: ", error)
            let error_logs = []
            if (error.response.data.response) {
                error_logs = error_logs.concat(error.response.data.response)
            }
            if (error.response.data.email) {
                const email_error = error.response.data.email
                error_logs = error_logs.concat(email_error)
            }
            if (error.response.data.password) {
                let password_error = error.response.data.password
                if (password_error[0].startsWith('[')){
                    password_error = error.response.data.password[0].split("', '")
                    password_error[0] = password_error[0].slice(2);
                    password_error[password_error.length - 1] = password_error[password_error.length - 1].slice(0, -2);
                }
                error_logs = error_logs.concat(password_error)
            }
            if (error_logs){
                setSucc([])
                setErrl(error_logs)
            }
        });

        return data
    }

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
                {succ.length != 0 && (
                    <Text color='green'>
                        User Created Successfully!
                    </Text>
                )}
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
                        rules = {{
                            required: "Required"
                        }}
                    />
                    <Box mb='20px'/>
                    
                    <PasswordInput
                        id="password"
                        title="Password"
                        placeholder='Password'
                        errors={errors}
                        register={register}
                        rules = {{
                            required: "Required"
                        }}
                    />
                    <Box mb='20px'/>

                    <PasswordInput
                        id="password2"
                        title="Confirm Password"
                        placeholder='Confirm Password'
                        errors={errors}
                        register={register}
                        rules = {{
                            required: "Required"
                        }}
                    />
                    <Box mb='20px'/>

                    {errl.length != 0 && (
                        <div>
                        <Text color='red'>Error:</Text>
                        <ul data-testid='errl'>
                            {errl.map(e => (
                                <li>{e}</li>
                            ))}
                        </ul>
                        </div>
                    )}
                    <Box mb='20px' />
                    <Button id='signInButton' colorScheme='teal' type='submit' width='12em' borderRadius={10}>
                        Sign Up
                    </Button>
                </Box>
                
                <Box mb='20px'/>
                <Text as='span'>Already have an account? </Text>
                <Text as='u' fontWeight='600'>    
                    <Text as='span' color='#4B8F8C'>sign in</Text>
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