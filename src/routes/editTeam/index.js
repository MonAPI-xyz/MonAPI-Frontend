import { h } from 'preact';
import { Button, Spinner, Text, Box, Flex, Grid, GridItem, FormLabel } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { useState, useEffect } from 'preact/hooks';
import axios from 'axios';
import { route } from 'preact-router';
import BASE_URL from '../../config/api/constant.js';
import ROUTE from '../../config/api/route.js';
import { getUserToken } from '../../config/api/auth.js';
import TeamEditor from '../../components/teamEditor/index.js';

const EditTeam = ({id}) => {
    const [isLoadingEdit, setLoadingEdit] = useState(false);
    const {
        handleSubmit,
        register,
        control,
        formState: { errors },
    } = useForm({
        defaultValues: {
            logo: null,
        }
    });

    const [currentTeam, setCurrentTeam] = useState()

	useEffect(()=>{
		axios.get(`${BASE_URL}/team-management/current/`, {
			headers: {
				Authorization:`Token ${getUserToken()}`
			}
		}).then((response)=>{
			setCurrentTeam(response.data)
		})
	},[])

    
    const onSubmit = (data) => {
        setLoadingEdit(true);
        let formData = new FormData()
        formData.append('description', data.description)
        
        if (data.logo) {
            formData.append('logo', data.logo)
        }

        axios.put(`${BASE_URL}/team-management/${id}/`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization':`Token ${getUserToken()}`
            }
        }).then(()=>{
            route(ROUTE.TEAM_MANAGEMENT + '/current');
            setLoadingEdit(false) 
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
                {currentTeam != undefined && <Grid w='60vw' h='full' justify='center' templateColumns='repeat(6, 1fr)'>
                    <GridItem colSpan={6}>
                        <Box verticalAlign='center'>
                            <Text mb={23} fontSize='32px' fontWeight='semibold' color='black'>
                                Edit New Team
                            </Text>
                            <Box as='form' onSubmit={handleSubmit(onSubmit)} id="form-edit-team">
                                <Box w='40vw'>
                                <FormLabel fontWeight='semibold'>
                                    Team Name
                                </FormLabel>
                                {currentTeam?.name}
                                </Box>
                                <Box mb='20px' />                       

                                <TeamEditor
                                     errors={errors}
                                     register={register}
                                     control={control}
                                     description={currentTeam?.description}
                                     logo={`${BASE_URL}${currentTeam?.logo}`}
                                />   
                        
                                <Box mb='10px' />
                            </Box>

                            <Box mb='30px' />
                            
                            <Box mb='30px' />
                            <Box align="start">
                                <Button form="form-edit-team" id='signInButton' colorScheme='teal' type='submit' width='10em' borderRadius={10}>
                                    {isLoadingEdit ? <Spinner /> : 'Edit' }
                                </Button>
                            </Box>
                        </Box>
                    </GridItem>
                </Grid>}
            </Flex>
        </div>
    );

}


export default EditTeam;