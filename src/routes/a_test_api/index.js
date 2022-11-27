import { h } from 'preact';
import style from './style.css';
import {methodOption} from './optionHelper.js'
import { Button, Text, Box, Flex, Grid, GridItem, Radio, RadioGroup, Textarea, FormControl, Spinner } from '@chakra-ui/react';
import KeyValueForm from '../../components/createAPIMonitor/keyValueForm';
import { useState } from 'preact/hooks';
import Dropdown from '../../components/forms/dropdown';
import TextInput from '../../components/forms/textinput';
import { Controller, useForm } from 'react-hook-form';
import axios from 'axios';
import BASE_URL from '../../config/api/constant.js';
import { getUserToken } from '../../config/api/auth.js';



const TestAPI = () => {
    const [selectedTab, setSelectedTab] = useState(0);	
    const [bodyType, setBodyType] = useState("EMPTY");  
    
    const [isLoading, setLoading] = useState(false) 
    const [responseMessage, setResponseMessage] = useState('-');

	const {
        handleSubmit,
        register,
        control,
        formState: { errors },
    } = useForm({
        defaultValues: {
            method: "GET",
            url: "",
            body_type: "EMPTY",
            query_params: [],
            headers: [],
            body_form: [],
            raw_body: "",    
        }
    });

    const onSubmit = (data) => {        
        setLoading(true);            
        axios.post(`${BASE_URL}/api-test/`, data, {
            headers: {
                Authorization:`Token ${getUserToken()}`
            }
        }).then((response)=>{  
            try {
                setResponseMessage(JSON.stringify(JSON.parse(response.data.response), null, 2));
                setLoading(false);
                } catch {
                setResponseMessage(response.data.response);
                setLoading(false);
                }
        }).catch((error)=> {
            setResponseMessage(error.response.data.error);
            setLoading(false);
        })                    
    };

	return(
        <div class={style['test-api']}>
            <Flex
                h="full"
                backgroundRepeat='no-repeat'
                justify='center'
                align='center'
            >
                <Grid w='60vw' h='full' justify='center' templateColumns='repeat(6, 1fr)'>
                    <GridItem colSpan={6}>
                        <Box verticalAlign='center'>
                            <Text mb={23} fontSize='32px' fontWeight='semibold' color='black'>
								API Test
                            </Text>
                            <Box as='form' onSubmit={handleSubmit(onSubmit)} id="form-create-test-api">
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
                                            dataTestId='dropdownMethod'
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
                                            id="url"
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

                                        
                                    </Grid>
                                </Box>
                                <Box mb='20px' />

                                {selectedTab == 0 &&
                                    <KeyValueForm
                                        errors={errors}
                                        register={register}
                                        keyName={'query_params'}
                                        control={control}
                                        buttonAddText={'Add Query Params'}
                                        isValueExists={true}
                                    />
                                }

                                {selectedTab == 1 &&
                                    <KeyValueForm
                                        errors={errors}
                                        register={register}
                                        keyName={'headers'}
                                        control={control}
                                        buttonAddText={'Add Headers'}
                                        isValueExists={true}
                                    />
                                }

                                {selectedTab == 2 &&
                                    <Box>
                                        <Controller name="body_type" control={control} render={({ field: { onChange, value } }) => (
                                            <RadioGroup onChange={(e)=>{onChange(e); setBodyType(e);}} value={value} colorScheme='blueChill'>
                                            <Flex direction='row' gap="25px">
                                                <Radio id='body_type_emptyempty' color="gray.300" value='EMPTY'>No Body</Radio>
                                                <Radio id='body_type_form' value='FORM' name="body_type">Form</Radio>
                                                <Radio id='body_type_raw' value='RAW' name="body_type">Raw Body</Radio>
                                            </Flex>
                                            </RadioGroup>
                                        )}
                                        />

                                        <Box mb="20px" />
                                        {bodyType == 'FORM' &&
                                            <KeyValueForm
                                                errors={errors}
                                                register={register}
                                                keyName={'body_form'}
                                                control={control}
                                                buttonAddText={'Add Form'}
                                                isValueExists={true}
                                            />
                                        }

                                        {bodyType == 'RAW' && <div>
                                            <FormControl isInvalid={errors['raw_body']}>
                                                <Textarea 
                                                    name={'raw_body'} 
                                                    {...register('raw_body', {
                                                        required: 'Required',
                                                        minLength: { value: 1, message: 'Required' },
                                                    })} 
                                                    bgColor="#F1F1F1"
                                                    placeholder={'Type request raw body here'}
                                                />
                                            </FormControl>
                                        </div>}
                                    </Box>
                                }

                            </Box>
                            <Box mb='49px' />
                            <Box align="end">
                                <Button form="form-create-test-api" id='signInButton' colorScheme='teal' type='submit' width='14em' borderRadius={10}>
                                    {isLoading ? <Spinner /> : "submit"}
                                </Button>
                            </Box>
                            <Box>     
                                <p><b>Response</b><br/>
                                <span>
                                <Box bg='gray.100' w='90%' color='black' p={3.5} mt={1.5} borderRadius='lg' class={style[`content-Response`]}>
                                    <div style={{whiteSpace: "pre-wrap"}}>{responseMessage}</div>
                                </Box>
                                </span></p>
                            </Box>

                        </Box>

                    </GridItem>
                </Grid>
            </Flex>
        </div>		
		
	)
	
};

export default TestAPI;