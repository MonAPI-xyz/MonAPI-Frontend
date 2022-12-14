import { h } from 'preact';
import { Button, Spinner, Text, Box, Flex, Grid, GridItem } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { useState } from 'preact/hooks';
import axios from 'axios';
import { route } from 'preact-router';

import TextInput from '../../components/forms/textinput/index.js';
import TeamEditor from '../../components/teamEditor/index.js';
import BASE_URL from '../../config/api/constant.js';
import ROUTE from '../../config/api/route.js';
import { getUserToken } from '../../config/api/auth.js';

const CreateTeam = () => {
    const [isLoadingCreate, setLoadingCreate] = useState(false);

    const {
        handleSubmit,
        register,
        control,
        formState: { errors },
    } = useForm({
        defaultValues: {
            name: "",
            description: "",
            logo: null,
        }
    });
    
    const onSubmit = (data) => {
        setLoadingCreate(true);
        let formData = new FormData()
        formData.append('name', data.name)
        formData.append('description', data.description)
        if (data.logo) {
            formData.append('logo', data.logo)
        }

        axios.post(`${BASE_URL}/team-management/`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization':`Token ${getUserToken()}`
            }
        }).then(()=>{
            route(`${ROUTE.TEAM_MANAGEMENT}/current`);
            setLoadingCreate(false);
            window.location.reload();
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
                <Grid w='60vw' h='full' justify='center' templateColumns='repeat(6, 1fr)'>
                    <GridItem colSpan={6}>
                        <Box verticalAlign='center'>
                            <Text mb={23} fontSize='32px' fontWeight='semibold' color='black'>
                                Create New Team
                            </Text>
                            <Box as='form' onSubmit={handleSubmit(onSubmit)} id="form-create-new-team">
                                <Box w='40vw'>
                                    <TextInput
                                        id="name"
                                        title='Team Name'
                                        placeholder='Insert Team Name'
                                        errors={errors}
                                        rules={{
                                            required: 'Required',
                                            minLength: { value: 1, message: 'Required' },
                                        }}
                                        register={register}
                                    />
                                </Box>
                                <Box mb='20px' />                       

                                <TeamEditor
                                     errors={errors}
                                     register={register}
                                     control={control}
                                />       
                        
                            <Box mb='10px' />
                            </Box>

                            <Box mb='30px' />
                            <Box align="start">
                                <Button form="form-create-new-team" id='signInButton' colorScheme='teal' type='submit' width='14em' borderRadius={10}>
                                    {isLoadingCreate ? <Spinner /> : 'Create' }
                                </Button>
                            </Box>
                        </Box>
                    </GridItem>
                </Grid>
            </Flex>
        </div>
    );

}


export default CreateTeam;