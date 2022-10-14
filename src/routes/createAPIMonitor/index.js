import { h } from 'preact';
import TextInput from '../../components/forms/textinput/index.js';
import { Button, Spinner, Text,Box, Flex, Grid, GridItem, Radio, RadioGroup  } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { useState } from 'preact/hooks';
import Dropdown from '../../components/forms/dropdown/index.js';
import style from './style.css';
import KeyValueInput from '../../components/forms/keyValueInput/index.js';
import KeyValueForm from '../../components/createAPIMonitor/keyValueForm/index.js';
import Assertions from '../../components/createAPIMonitor/assertions/index.js';

const CreateAPIMonitor = () =>{
    
    const [isLoading, setIsLoading] = useState(false)
    const {
      handleSubmit,
      register,
      formState: { errors },
    } = useForm();

    const [responseMessage, setResponseMessage] = useState('')
    const [selectedTab, setSelectedTab] = useState(0)

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

    function RadioButtonBody() {
        const [value, setValue] = useState('0')
        return (
            <Box>
                <RadioGroup onChange={setValue} value={value}>
                    <Flex direction='row' gap="25px">
                    <Radio color="gray.300" value='0'>No Body</Radio>
                    <Radio value='1'>Form</Radio>
                    <Radio value='2'>Raw Body</Radio>
                    </Flex>
                </RadioGroup>

                <Box mb="20px" />
                {value == '1' &&
                          <KeyValueForm 
                          errors={errors}
                          register={register}
                           />  }
            </Box>
        )
      }


    const onSubmit = async () => {
        setIsLoading(true);
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

                            <Box mb="40px" />
                            <Box>
                                <Grid justify="start" w='50vw' h='full' templateColumns='repeat(4, 1fr)' gap="20px" >
                                    <GridItem colSpan={1}>
                                        <Text onClick={() => setSelectedTab(0)} textAlign="center" fontWeight={selectedTab == 0 ? "700" : "500"} className={style['noselect']}>
                                            Query Params
                                        </Text>
                                    </GridItem>

                                    <GridItem colSpan={1}>
                                        <Text onClick={() => setSelectedTab(1)} textAlign="center" fontWeight={selectedTab == 1 ? "700" : "500"} className={style['noselect']}>
                                            Headers
                                        </Text>
                                    </GridItem>

                                    <GridItem colSpan={1}>
                                        <Text onClick={() => setSelectedTab(2)} textAlign="center" fontWeight={selectedTab == 2 ? "700" : "500"} className={style['noselect']}>
                                            Body
                                        </Text>
                                    </GridItem>

                                    <GridItem colSpan={1}>
                                        <Text onClick={() => setSelectedTab(3)} textAlign="center" fontWeight={selectedTab == 3 ? "700" : "500"} className={style['noselect']}>
                                            Assertions
                                        </Text>
                                    </GridItem>
                                </Grid>
                            </Box>
                            <Box mb='20px' />

                            {selectedTab == 0 &&
                            <KeyValueForm 
                            errors={errors}
                            register={register}
                             />}

                            {selectedTab == 1 &&
                            <Box>
                                <Grid w='full' h='full' templateColumns='repeat(8, 1fr)' gap="20px">
                                    <GridItem colSpan={3}>
                                        <Text>
                                            Query Params
                                        </Text>
                                    </GridItem>

                                    <GridItem colSpan={5}>
                                        <Text>
                                            Headers
                                        </Text>
                                    </GridItem>
                                </Grid>

                                <Box mb='6px' />
                                
                                <KeyValueInput
                                    id="request-url"
                                    title='Request URL' 
                                    placeholder='' 
                                    errors={errors}
                                    rules={{
                                        required: 'Required',
                                        minLength: { value: 1, message: 'Required' },
                                    }}
                                    register={register}
                                />
                                <Box mb='16px' />
                                <Button form="add" colorScheme='teal' type='submit' width='4em' borderRadius={10}>
                                    Add
                                </Button>
                            </Box>}

                            {selectedTab == 2 &&
                            <Box>
                                <RadioButtonBody />
                                
                            </Box>}

                            {selectedTab == 3 &&
                            <Assertions 
                                errors={errors}
                                register={register}
                            /> 
                            }

                            <Box mb='10px' />
                            {responseMessage != '' && <Text fontSize='14px' color='red.500'>{responseMessage}</Text>}
                            <Box mb={responseMessage ? '10px' : '20px'} />

                        </Box>                        
                        <Box mb='49px' />
                        <Box align="end">
                            <Button form="form-create-api-monitor" id='signInButton' colorScheme='teal' type='submit' width='14em' borderRadius={10}>
                                {isLoading ? <Spinner /> : "Create API Monitor"}
                            </Button>
                        </Box>
                        
                    </Box>
                                        
                </GridItem>
            </Grid>
        </Flex>
            );
        
}


export default CreateAPIMonitor;