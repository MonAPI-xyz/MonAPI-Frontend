import { h } from 'preact';
import { Button, Text, Box, Flex, Grid, GridItem, Input } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { useState, useEffect } from 'preact/hooks';
import axios from 'axios';
import { Link} from 'preact-router';
import BASE_URL from '../../config/api/constant.js';
import { getUserToken } from '../../config/api/auth.js';

const StatusPage = () => {
    const [errorMessageSaveUrl, setErrorMessageSaveUrl] = useState('');
    const [categoryList, setCategoryList] = useState([]);
    const [path, setPath] = useState('');

    const {
        handleSubmit,
        register,
        setValue,
    } = useForm({});

    const {
        register: register2,
        setValue: setValue2,
        handleSubmit: handleSubmit2,
      } = useForm({});

    useEffect(()=> {
		axios.get(`${BASE_URL}/status-page/config/`, {
			headers: {
				Authorization:`Token ${getUserToken()}`
			}
		}).then((response)=>{
			setValue("path", response.data["path"])
            setPath(response.data['path'])
		})
    }, [])

    useEffect(()=> {
		axios.get(`${BASE_URL}/status-page/category/`, {
			headers: {
				Authorization:`Token ${getUserToken()}`
			}
		}).then((response)=>{
			setCategoryList(response.data)
		})
    }, [categoryList])
    
    const onSaveUrl = (data) => {
        const formData = new FormData()
        formData.append('path', data.path)

        axios.post(`${BASE_URL}/status-page/config/`, formData, {
            headers: {
                'Authorization':`Token ${getUserToken()}`
            }
        }).then((response)=>{
            setErrorMessageSaveUrl('')
            setPath(response.data['path'])
        }).catch((error)=> {
            setErrorMessageSaveUrl(error.response.data.path[0]);
        })
        
    };
    const onAddCategory = (data) => {
        const formData = new FormData()
        formData.append('name', data.name)

        axios.post(`${BASE_URL}/status-page/category/`, data, {
            headers: {
                'Authorization':`Token ${getUserToken()}`
            }
        }).then((response)=>{
            categoryList.push(response.data)
            setValue2('name', '')
        })
        
    };

    return (
        <div style={{padding: "40px 20px"}}>
            <Flex
                h="full"
                backgroundRepeat='no-repeat'
                justify='center'
                align='center'
            >
                {<Grid w='60vw' h='full' justify='center' templateColumns='repeat(6, 1fr)'>
                    <GridItem colSpan={6}>
                        <Box verticalAlign='center'>
                            <Text mb={23} fontSize='32px' fontWeight='semibold' color='black'>
                            Status Page Configuration
                            </Text>
                            
                            <Box mb='30px' />

                            <Text mb={23} fontSize='32px' fontWeight='semibold' color='black'>
                            Status Page URL
                            </Text>
                            
                            <Box mb='10px' />
                            <Box as='form' onSubmit={handleSubmit(onSaveUrl)} id='form-save-url'>
                                <Flex align='center'>
                                    <Text>https://status.monapi.com/</Text>
                                    <Box mx='10px' />
                                    
                                    <Box w="30%" >
                                        <Input
                                            bgColor='#F1F1F1'
                                            borderRadius={10}
                                            id='path'
                                            placeholder='custompath'
                                            {...register('path', {
                                                required: 'Required',
                                                minLength: { value: 1, message: 'Required' },
                                            })}
                                        />
                                    </Box>
                                    <Box mx='12px' />
                                    <Link href={`/status/${path}`} ><Text as="u">Preview Page</Text></Link>

                                </Flex>
                                {errorMessageSaveUrl != '' && <Text fontSize='14px' color='red.500'>{errorMessageSaveUrl}</Text>}
                                <Box mb={errorMessageSaveUrl ? '14px' : '20px'} />
                                <Box align="start">
                                    <Button form="form-save-url" id='saveUrlButton' colorScheme='teal' type='submit' width='10em' borderRadius={10}>
                                        Save
                                    </Button>
                                </Box>
                            </Box>
                        </Box>

                        <Box mb="40px" />

                        <Text mb={23} fontSize='32px' fontWeight='semibold' color='black'>
                            Category
                        </Text>
                        <Box mb="20px" />

                        <Box>
                            {categoryList.length == 0 ? 'No Category List' :
                            <ol style={{paddingLeft:'18px'}}>
                                {categoryList.map((item, index) => ( 
                                <li key={index}>
                                    {item.name}
                                </li>
                                )) }
                            </ol> 
                            }
                            
                            <Box mb="20px" />
                            <Text mb='20px' fontSize='32px' fontWeight='semibold' color='black'>
                                Add New Category
                            </Text>

                            <Box as="form" id='form-add-category' onSubmit={handleSubmit2(onAddCategory)}>
                                <Box w="54%" >
                                <Input
                                    bgColor='#F1F1F1'
                                    borderRadius={10}
                                    id='name'
                                    placeholder='Category Name'
                                    {...register2('name', {
                                        required: 'Required',
                                        minLength: { value: 1, message: 'Required' },
                                    })}
                                />
                                </Box>
                                <Box mb="20px" />

                                <Box align="start">
                                    <Button form="form-add-category" id='addCategoryButton' colorScheme='teal' type='submit' width='10em' borderRadius={10}>
                                        Create
                                    </Button>
                                </Box>
                            </Box>
                        
                        </Box>
                    </GridItem>
                </Grid>}
            </Flex>
        </div>
    );

}


export default StatusPage;