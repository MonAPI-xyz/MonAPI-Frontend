import { h } from 'preact';
import TextInput from '../../components/forms/textinput/index.js';
import { Button, Text, Box, Flex, Grid, GridItem } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import Dropdown from '../../components/forms/dropdown/index.js';

const CreateAPIMonitor = () =>{
    
    const {
      handleSubmit,
      register,
      formState: { errors },
    } = useForm();

    const methodOption = [
        {
            key: "get",
            value: "GET",
        },
        {
            key: "post",
            value: "POST",
        },
        {
            key: "put",
            value: "PUT",
        },
        {
            key: "patch",
            value: "PATCH",
        },
    ]
    
    const intervalOption = [
        {
            key: "1MIN",
            value: "1 Minute",
        },
        {
            key: "2MIN",
            value: "2 Minutes",
        },
        {
            key: "3MIN",
            value: "3 Minutes",
        },
        {
            key: "5MIN",
            value: "5 Minutes",
        }
        
    ]

    const onSubmit = async () => {
        try {
            
        } catch(error) {
            
        }
    };

    return (
        <Flex
            h="full"
            backgroundRepeat='no-repeat'
            justify='center'
            align='center'
        >   
            <Grid w='60vw' h='full' justify='center' templateColumns='repeat(6, 1fr)'  
            >
                <GridItem colSpan={6}
                >
                    <Box verticalAlign='center'>
                    
                        <Text mb={23} fontSize='32px' fontWeight='semibold' color='black'>
                            Create new API Monitor
                        </Text>
                        <Box as='form' onSubmit={handleSubmit(onSubmit)} id="form-create-api-monitor">
                            <Box w='40vw'>
                                <TextInput 
                                    id="monitor-name"
                                    title='Monitor Name' 
                                    placeholder='Monitor Name' 
                                    errors={errors}
                                    rules={{
                                        required: 'Required',
                                        minLength: { value: 1, message: 'Required' },
                                    }}
                                    register={register}
                                />
                            </Box>
                            <Box mb='20px' />
                            
                            <Flex 
                                w='full'
                                h='full' 
                                templateColumns='repeat(6, 1fr)'
                                gap='1.6vw'
                                flexWrap='wrap'
                            >
                                <Box w='8vw'
                                >
                                    <Dropdown 
                                        id="method"
                                        title='Method' 
                                        placeholder='Method' 
                                        errors={errors}
                                        options={methodOption}
                                        rules={{
                                            required: 'Required',
                                            minLength: { value: 1, message: 'Required' },
                                        }}
                                        register={register}
                                    />
                                </Box>
                                <Box w='50vw'>
                                    <TextInput 
                                        id="request-url"
                                        title='Request URL' 
                                        placeholder='Request URL' 
                                        errors={errors}
                                        rules={{
                                            required: 'Required',
                                            minLength: { value: 1, message: 'Required' },
                                        }}
                                        register={register}
                                    />
                                </Box>
                            </Flex>

                            <Box mb='20px' />
                            
                            <Box w='20vw'>
                                <Dropdown 
                                    id="interval"
                                    title='Check Interval' 
                                    dataTestId='interval'
                                    placeholder='' 
                                    errors={errors}
                                    options={intervalOption}
                                    rules={{
                                        required: 'Required',
                                        minLength: { value: 1, message: 'Required' },
                                    }}
                                    register={register}
                                />
                            </Box>

                            <Box mb='20px' />
                            
                            <Box w='40vw'>
                                <Dropdown 
                                    id="previousStepAPI"
                                    title='Previous Step API Monitor' 
                                    dataTestId='previousStep'
                                    placeholder='' 
                                    errors={errors}
                                    options={intervalOption}
                                    rules={{
                                        required: 'Required',
                                        minLength: { value: 1, message: 'Required' },
                                    }}
                                    register={register}
                                />
                            </Box>
                            
                            <Box mb='10px' />

                            <Text>
                                Please select "none" if you want to create single-step API Monitor
                            </Text>
                            <Text>
                            Sample format to use previous API response &#123;&#123;data.result[0].name&#125;&#125;. More documentation link
                            </Text>

                            <Box mb='10px' />
                           

                        </Box>                        
                        <Box mb='49px' />
                        <Box w="full" align="end">
                            <Button form="form-create-api-monitor" id='signInButton' colorScheme='teal' type='submit' width='14em' borderRadius={10}>
                                Create API Monitor
                            </Button>
                        </Box>
                        
                    </Box>
                                        
                </GridItem>
            </Grid>
        </Flex>
            );
        
}


export default CreateAPIMonitor;