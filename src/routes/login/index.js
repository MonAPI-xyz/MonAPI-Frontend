import { h } from 'preact';
import TextInput from '../../components/forms/textinput/index.js';
import PasswordInput from '../../components/forms/passwordinput/index.js';
import { Button, Text  } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import {Box, Flex, Grid, GridItem } from '@chakra-ui/layout';
import { connect } from 'unistore/preact';
import { actions } from '../../config/store/store.js';

const Login = connect('user', actions)( 
    ({ user, getUser }) =>{

    const {
      handleSubmit,
      register,
      formState: { errors, isSubmitting },
    } = useForm();

    const fetchLogin = async (values) => {
        try {
            console.log('Success login');
            // console.log(await increment());
            console.log( await getUser());
            console.log( user);

        } catch (error) {
            console.log('Error when login', error);
        }
      };
    
      const onSubmit = (values) => {
        return new Promise(async (resolve) => {
          await fetchLogin(values);
          resolve();
        });
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
                            Login
                        </Text>
                        <Box as='form' onSubmit={handleSubmit(onSubmit)}>
                            <TextInput 
                                id="email"
                                title='Email' 
                                placeholder='john@example.com' 
                                errors={errors}
                                rules={{
                                    required: 'Wajib diisi',
                                    minLength: { value: 3, message: 'Minimum length should be 3' },
                                }}
                                register={register}
                            />
                            <Box mb='20px'/>
                            
                            <PasswordInput
                                id="password"
                                register={register}
                                errors={errors}
                                title="Password"
                                placeholder='************'
                                rules={{
                                    required: 'Wajib diisi',
                                    minLength: { value: 8, message: 'Minimum length should be 8' },
                                }}
                            />
                            <Box mb='20px'/>
                            <Button colorScheme='teal' type='submit' width='12em' borderRadius={10}>
                                Buat
                            </Button>
                        </Box>
                        
                        <Box mb='20px'/>
                        <Text as='span'>or </Text>
                        <Text as='u' fontWeight='600'>    
                            <Text as='span' color='#4B8F8C'>sign up</Text> to create new account
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
)

export default Login;