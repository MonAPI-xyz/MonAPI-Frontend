import { h } from 'preact';
import { Button, Text, Box, Flex, Grid, GridItem, Input, Spinner } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { useState, useEffect } from 'preact/hooks';
import axios from 'axios';
import { Link} from 'preact-router';
import BASE_URL from '../../config/api/constant.js';
import { getUserToken } from '../../config/api/auth.js';

const StatusPage = () => {
    const [successMessageSaveUrl, setSuccessMessageSaveUrl] = useState('');
    const [errorMessageSaveUrl, setErrorMessageSaveUrl] = useState('');
    const [isLoadingLoadUrl, setIsLoadingLoadUrl] = useState(true);
    const [isLoadingSaveUrl, setIsLoadingSaveUrl] = useState(false);


    const [categoryList, setCategoryList] = useState([]);
    const [successMessageCategory, setSuccessMessageCategory] = useState('');
    const [isLoadingLoadCategory, setIsLoadingLoadCategory] = useState(true);
    const [isLoadingAddCategory, setIsLoadingAddCategory] = useState(false);
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
            setIsLoadingLoadUrl(false)
		})
    }, [])

    useEffect(()=> {
		axios.get(`${BASE_URL}/status-page/category/`, {
			headers: {
				Authorization:`Token ${getUserToken()}`
			}
		}).then((response)=>{
			setCategoryList(response.data)
            setIsLoadingLoadCategory(false)
		})
    }, [])
    
    const onSaveUrl = (data) => {
        setIsLoadingSaveUrl(true)
        if (data.path === '') {
            data.path = null;
        }

        axios.post(`${BASE_URL}/status-page/config/`, data, {
            headers: {
                Authorization:`Token ${getUserToken()}`
            }
        }).then((response)=>{
            setErrorMessageSaveUrl('')
            setPath(response.data['path'])
            setIsLoadingSaveUrl(false);
            setSuccessMessageSaveUrl('Success update URL for status page');
        }).catch((error)=> {
            setErrorMessageSaveUrl(error.response.data.path[0]);
            setIsLoadingSaveUrl(false);
            setSuccessMessageSaveUrl('');
        })
        
    };
    const onAddCategory = (data) => {
        setIsLoadingAddCategory(true);
        const formData = new FormData()
        formData.append('name', data.name)

        axios.post(`${BASE_URL}/status-page/category/`, data, {
            headers: {
                Authorization:`Token ${getUserToken()}`
            }
        }).then((response)=>{
            const newCategoryList = categoryList.concat([response.data])
            setCategoryList(newCategoryList)
            setValue2('name', '')
            setIsLoadingAddCategory(false);
            setSuccessMessageCategory('Success add new category');
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
                            {isLoadingLoadUrl ? <Spinner /> : 
                                <Box as='form' onSubmit={handleSubmit(onSaveUrl)} id='form-save-url'>
                                    <Flex align='center'>
                                        <Text>{window.location.origin}/status/</Text>
                                        <Box mx='10px' />
                                        
                                        <Box w="30%" >
                                            <Input
                                                bgColor='#F1F1F1'
                                                borderRadius={10}
                                                id='path'
                                                placeholder='custompath'
                                                {...register('path')}
                                            />
                                        </Box>
                                        <Box mx='12px' />
                                        <Link href={`/status/${path}`} ><Text as="u">Preview Page</Text></Link>

                                    </Flex>
                                    <Box mb={'14px'} />
                                    <Text fontSize={'14px'} color={'gray'}>You can disable status page by filling empty on path</Text>
                                    {errorMessageSaveUrl != '' && <Text fontSize='14px' color='red.500'>{errorMessageSaveUrl}</Text>}
                                    <Box mb={errorMessageSaveUrl ? '14px' : '20px'} />
                                    {successMessageSaveUrl && <Text color="green">{successMessageSaveUrl}</Text>}
                                    <Box align="start">
                                        <Button form="form-save-url" id='saveUrlButton' colorScheme='teal' type='submit' width='10em' borderRadius={10}>
                                            {isLoadingSaveUrl ? <Spinner /> : "Save"}
                                        </Button>
                                    </Box>
                                </Box>
                            }
                        </Box>

                        <Box mb="40px" />

                        <Text mb={23} fontSize='32px' fontWeight='semibold' color='black'>
                            Category
                        </Text>
                        <Box mb="20px" />
                        
                        {isLoadingLoadCategory ? <Spinner /> : 
                        <Box>
                            {categoryList.length == 0 ? 'No Category Exists' :
                            <ol style={{paddingLeft:'18px'}}>
                                {categoryList.map((item) => ( 
                                <li key={item.id}>
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
                                {successMessageCategory && <Text color="green">{successMessageCategory}</Text>}
                                <Box align="start">
                                    <Button form="form-add-category" id='addCategoryButton' colorScheme='teal' type='submit' width='10em' borderRadius={10}>
                                        {isLoadingAddCategory ? <Spinner /> : "Create"}
                                    </Button>
                                </Box>
                            </Box>
                        </Box>
                        }
                    </GridItem>
                </Grid>}
            </Flex>
        </div>
    );

}


export default StatusPage;