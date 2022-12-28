import { h } from "preact";
import { useState } from "preact/hooks";
import PasswordInput from '../../components/forms/passwordinput/index.js'
import { Button, Text, Spinner,Box, Flex, Grid, GridItem } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { route } from 'preact-router';
import ROUTE from '../../config/api/route.js';
import BASE_URL from '../../config/api/constant.js';
import * as axios from "axios";

const ForgetPasswordToken = ()=>{
    const [errl, setErrl] = useState([])
    const [isLoading, setIsLoading] = useState(false);
    const [key, setKey] = useState("")
    
    const param = new URLSearchParams(window.location.search).get('key')
    setKey(param)

    const {
    handleSubmit,
    register,
    formState: { errors },
    } = useForm();

    const onSubmit = (res) => {
        setIsLoading(true)
        const data = {
            key,
            password: res.password
        }

        axios.post(`${BASE_URL}/forget-password/change/`, data)
        .then(() => {
            route(`${ROUTE.LOGIN}?isChangePassword=true`)
            setIsLoading(false)
        }) 
        .catch((error) => {
            if (error.response.data['password']) {
                setErrl(error.response.data.password)
            } else if (error.response.data['error']) {
                setErrl([error.response.data.error])
            }
            setIsLoading(false)
        });

        return data
    }

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
                        <Box as='form' onSubmit={handleSubmit(onSubmit)}>                            
                            <PasswordInput
                                id="password"
                                title="New Password"
                                placeholder='New Password'
                                errors={errors}
                                register={register}
                                rules = {{
                                    required: "Required"
                                }}
                            />

                            {errl.length != 0 && (
                                <div>
                                <Text color='red'>Error:</Text>
                                <ul data-testid='errl'>
                                    {errl.map((e,i) => (
                                        <li key={i}>{e}</li>
                                    ))}
                                </ul>
                                </div>
                            )}
                            <Box mb='20px' />
                            <Button id='signInButton' colorScheme='teal' type='submit' width='12em' borderRadius={10}>
                                {isLoading ? <Spinner /> : "Change Password"}
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


export default ForgetPasswordToken;