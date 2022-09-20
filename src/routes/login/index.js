import TextInput from '../../components/forms/textinput/index.js';
import PasswordInput from '../../components/forms/passwordinput/index.js';
import { Button, Text  } from '@chakra-ui/react';
import {Box, Flex, Grid, GridItem } from '@chakra-ui/layout';

const Login = () => {
    return (
        <Flex
            minH='100vh'
            backgroundRepeat='no-repeat'
            justify='center'
            align='center'
        >   
            <Grid w='full' h='full' px='49px' templateColumns='repeat(10, 1fr)' gap={40}>
                <GridItem colSpan={4} >
                    <Box verticalAlign='center'>
                        <Text mb={23} fontSize='32px' fontWeight='semibold' color='black'>
                            Login
                        </Text>
                        <TextInput title='Email' placeholder='john@example.com' isRequired={true} />
                        <Box mb='20px'/>
                        <PasswordInput title='Password' placeholder='************' isRequired={true} />
                        <Box mb='20px'/>
                        <Button colorScheme='teal' type='submit' width='12em' borderRadius={10}>
                            Buat
                        </Button>
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

export default Login;