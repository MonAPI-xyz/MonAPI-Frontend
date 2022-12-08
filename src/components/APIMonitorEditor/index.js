import { h } from 'preact';
import { Button, Checkbox, Spinner, Text, Box, Flex, Grid, GridItem, Radio, RadioGroup, Textarea, FormErrorMessage, FormControl } from '@chakra-ui/react';
import { Controller, useForm } from 'react-hook-form';
import { useEffect, useState } from 'preact/hooks';
import axios from 'axios';
import { route } from 'preact-router';

import Dropdown from '../forms/dropdown/index.js';
import TextInput from '../forms/textinput/index.js';
import KeyValueForm from '../createAPIMonitor/keyValueForm/index.js';
import BASE_URL from '../../config/api/constant.js';
import { getUserToken } from '../../config/api/auth.js';
import { methodOption, intervalOption } from './optionHelper.js'
import style from './style.css';


function APIMonitorEditor({headerMessage, buttonMessage, mode, id}) {
    // headerMessage: String
    // buttonMessage: String
    // mode: choose one --> "CREATE" or "EDIT"
    // id: path to send the data, ignored if mode is "CREATE"
    const [bodyType, setBodyType] = useState("EMPTY");
    const [assertionType, setAssertionType] = useState("DISABLED");
    const [selectedTab, setSelectedTab] = useState(0);
    const [isLoadingCreate, setLoadingCreate] = useState(false)
    const [isLoadingPreviousStep, setLoadingPreviousStep] = useState(true)
    const [previousStep, setPreviousStep] = useState([])
    const [categoryList, setCategoryList] = useState([]);
    const [responseMessage, setResponseMessage] = useState('');

    const {
        handleSubmit,
        register,
        control,
        formState: { errors },
        setValue
    } = useForm({
        defaultValues: {
            name: "",
            method: "GET",
            url: "",
            schedule: "1MIN",
            body_type: "EMPTY",
            previous_step_id: null,
            query_params: [],
            headers: [],
            body_form: [],
            raw_body: "",
            assertion_type: "DISABLED",
            assertion_value: "",
            is_assert_json_schema_only: false,
            exclude_keys: [],
        }
    });

    useEffect( () => {
        if (mode == 'EDIT') {
        axios.get(`${BASE_URL}/monitor/${id}`, {
            headers: {
                Authorization: `Token ${getUserToken()}`
            }
        }).then( async (response) => {
            const fields = ["name", "method", "url", "schedule", "body_type", "query_params",
                "headers", "body_form", "assertion_type", "assertion_value", "status_page_category_id",
                "is_assert_json_schema_only", "exclude_keys"]
            fields.forEach(field => setValue(field, response.data[field]));
            if (response.data["raw_body"]) {
                setValue("raw_body", response.data["raw_body"]["body"])
            }
            setValue('previous_step_id', response.data['previous_step_id'] === null ? '' : response.data['previous_step_id'])
            setBodyType(response.data['body_type'])
            setAssertionType(response.data['assertion_type'])
        })
    }}, [id, previousStep])

    const onSubmit = (data) => {
        if (!isLoadingCreate) {
            setLoadingCreate(true);
            if (mode == "CREATE") {
                axios.post(`${BASE_URL}/monitor/`, data, {
                    headers: {
                        Authorization:`Token ${getUserToken()}`
                    }
                }).then(()=>{
                    route('/');
                    setLoadingCreate(false);
                }).catch((error)=> {
                    setResponseMessage(error.response.data.error);
                    setLoadingCreate(false);
                })
            } else if (mode == "EDIT") {
                axios.put(`${BASE_URL}/monitor/${id}/`, data, {
                    headers: {
                        Authorization:`Token ${getUserToken()}`
                    }
                }).then(()=>{
                    route(`/${id}/detail`);
                    setLoadingCreate(false);
                }).catch((error)=> {
                    setResponseMessage(error.response.data.error);
                    setLoadingCreate(false);
                })
            }
        }
    };

    const transformPreviousStepResponse = async (responseData) =>  {
        let outputArray = [
            {
                key: "",
                value: "-"
            }
        ]
        await responseData.forEach((item)=> {
            if (item.id != id) {
                outputArray.push({
                    key: item.id,
                    value: `${item.name} - ${item.url}`
                })
            }
        })
        return outputArray
    }

    useEffect(() => {
        axios.get(`${BASE_URL}/monitor/`, {
            headers: {
                Authorization: `Token ${getUserToken()}`
            }
        }).then( async (response)=> {
            setPreviousStep(await transformPreviousStepResponse(response.data))
            setLoadingPreviousStep(false)
        })
    }, [])

    useEffect(()=> {
		axios.get(`${BASE_URL}/status-page/category/`, {
			headers: {
				Authorization:`Token ${getUserToken()}`
			}
		}).then((response)=>{
             const newResponse = [{
                id: "",
                team: -1,
                name: "-"
            }].concat(response.data)
			setCategoryList(newResponse)
		})
    }, [])

    return (
        <div class={style['new-api-monitor']}>
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
                                {headerMessage}
                            </Text>
                            <Box as='form' onSubmit={handleSubmit(onSubmit)} id="form-create-api-monitor">
                                <Box w='40vw'>
                                    <TextInput
                                        id="name"
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

                                <Box w='20vw'>
                                    <Dropdown
                                        id="schedule"
                                        title='Check Interval'
                                        dataTestId='dropdownInterval'
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
                                        id="status_page_category_id"
                                        title='Select Category'
                                        dataTestId='selectCategory'
                                        placeholder=''
                                        errors={errors}
                                        options={categoryList}
                                        isCategory={true}
                                        keyName='name'
                                        valueName='name' 
                                        register={register}
                                    />
                                </Box>

                                <Box mb='20px' />
                            
                            <Box w='40vw'>
                                {isLoadingPreviousStep ? <Spinner ml="20px" /> :
                                <Dropdown 
                                    id="previous_step_id"
                                    title='Previous Step API Monitor' 
                                    dataTestId='dropdownMultiStep'
                                    placeholder='' 
                                    errors={errors}
                                    options={previousStep}
                                    rules={{
                                        required: 'Required',
                                        minLength: { value: 1, message: 'Required' },
                                    }}
                                    register={register}
                                />
                                }
                            </Box>
                            
                            <Box mb='10px' />

                            <Text fontSize='sm' color='gray'>
                                Multi-step API monitor can causing previous API monitor executed multiple times
                            </Text>
                            <Text fontSize='sm' color='gray'>
                                Please select "-" if you want to create single-step API Monitor
                            </Text>
                            <Text fontSize='sm' color='gray'>
                                Sample format to use parameter from previous API response &#123;&#123;data.result[0].name&#125;&#125;
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
                                                <FormErrorMessage>{errors['raw_body'] && errors['raw_body'].message}</FormErrorMessage>
                                            </FormControl>
                                        </div>}
                                    </Box>
                                }

                                {selectedTab == 3 &&
                                    <Box>
                                        <Controller name="assertion_type" control={control} render={({ field: { onChange, value } }) => (
                                            <RadioGroup onChange={(e)=>{onChange(e); setAssertionType(e);}} value={value} colorScheme='blueChill'>
                                            <Flex direction='row' gap="25px">
                                                <Radio id='assertion_type_disabled' color="gray.300" value='DISABLED'>Disabled</Radio>
                                                <Radio id='assertion_type_text' value='TEXT' name="assertion_type">Text</Radio>
                                                <Radio id='assertion_type_json' value='JSON' name="assertion_type">JSON</Radio>
                                                <Radio id='assertion_type_json' value='PARTIAL' name="assertion_type">Partial Text</Radio>
                                            </Flex>
                                            </RadioGroup>
                                        )}
                                        />

                                        <Box mb="20px" />
                                        {assertionType != 'DISABLED' && <div>
                                            <FormControl isInvalid={errors['assertion_value']}>
                                                <Textarea
                                                    name={'assertion_value'} 
                                                    {...register('assertion_value', {
                                                        required: 'Required',
                                                        minLength: { value: 1, message: 'Required' },
                                                    })} 
                                                    bgColor="#F1F1F1"
                                                    placeholder={'Type assertion here'}
                                                />
                                                <FormErrorMessage>{errors['assertion_value'] && errors['assertion_value'].message}</FormErrorMessage>
                                            </FormControl>
                                        </div>}

                                        {assertionType == 'JSON' && <Box mt='20px'>
                                            <Controller name="is_assert_json_schema_only" control={control} render={({ field: { onChange, value } }) => (
                                                <Checkbox onChange={(e) => onChange(e)} isChecked={value} colorScheme='blueChill'>Assert JSON schema (key) only</Checkbox>
                                            )}
                                            />
                                            
                                            <Box py={5}>
                                                <Text fontSize='xl' as='b'>Exclude keys</Text>
                                                <KeyValueForm
                                                    errors={errors}
                                                    register={register}
                                                    keyName={'exclude_keys'}
                                                    control={control}
                                                    buttonAddText={'Add Key'}
                                                    isValueExists={false}
                                                />
                                            </Box>
                                        </Box>}
                                    </Box>
                                }

                                <Box mb='10px' />
                                {responseMessage != '' && <Text fontSize='14px' color='red.500'>{responseMessage}</Text>}
                                <Box mb={responseMessage ? '10px' : '20px'} />

                            </Box>
                            <Box mb='49px' />
                            <Box align="end">
                                <Button form="form-create-api-monitor" id='signInButton' colorScheme='teal' type='submit' width='14em' borderRadius={10}>
                                    {isLoadingCreate ? <Spinner /> : `${buttonMessage}` }
                                </Button>
                            </Box>

                        </Box>

                    </GridItem>
                </Grid>
            </Flex>
        </div>
    );

}


export default APIMonitorEditor;