import { h } from 'preact';
import { Text, Box, Flex, Grid, GridItem, Button } from '@chakra-ui/react';
import TextInput from '../../components/forms/textinput/index.js'
import { useState, useEffect } from 'preact/hooks';
import axios from 'axios';
import BASE_URL from '../../config/api/constant.js';
import { getUserToken } from '../../config/api/auth.js';
import { Link } from 'preact-router/match'
import logo from '../../assets/icons/logo-monapi.svg';
import TeamMemberComponent from '../../components/teamMemberComponent/index.js';

import { useForm } from 'react-hook-form';

const ViewCurrentTeam = () => {        
    const [currentTeam,setCurrentTeam]=useState([])
	useEffect(()=>{
		axios.get(`${BASE_URL}/team-management/current/`, {
			headers: {
				Authorization:`Token ${getUserToken()}`
			}
		}).then((response)=>{
			setCurrentTeam(response.data)
		})
	},[])

    // Invite Form
    const {
        handleSubmit,
        register,
        formState: { errors },
    } = useForm();
    const [extraError, setExtraError] = useState(null);

    const sendInvite = (res) => {

        const data = {
            invited_email: res.invited_email
        }
        axios.post(`${BASE_URL}/invite-member/token/`, data, {
            headers: {
                Authorization: `Token ${getUserToken()}`
            }
        }).then(() => {
            window.location.reload()
        }).catch((error) => {
            setExtraError(error)
        })
    }

    const listErrors = (error_list) => {
        if (error_list != null) {
            return (
                <Text color="red">Error: Make sure the user exist or isn't already in the team</Text>
            )
        }
    }
    
    return (
        <div style={{padding: "40px 20px"}}>
            <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.1/dist/js/bootstrap.bundle.min.js" integrity="sha384-u1OknCvxWvY5kfmNBILK2hRnQC3Pr17a+RTT6rIHI7NnikvbZlHgTPOOmMi466C8" crossorigin="anonymous" />
			<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.1/dist/css/bootstrap.min.css" rel="stylesheet" />
            <Flex
                h="full"
                backgroundRepeat='no-repeat'
                justify='center'
                align='center'
            >
                <Grid w='60vw' h='full' justify='center' templateColumns='repeat(6, 1fr)'>
                    <GridItem colSpan={6}>
                        <Box verticalAlign='center'>
                            <div class="d-flex justify-content-between">
                                <Text mb={23} fontSize='32px' fontWeight='semibold' color='black'>
                                    Team Management
                                </Text>  
                                <Link href="/team-management/">
                                    <button type="button" class="btn btn-success">Create New Team</button>
                                </Link>
                            </div>

                            <div style="width:50%">
                                <div class="d-flex justify-content-between">
                                    <div>
                                        <Box w='40vw'>
                                            <Text  fontSize='16px' fontWeight='semibold' color='black'>
                                                Team Name
                                            </Text>
                                            <Text  fontSize='14px' color='black'>
                                                {currentTeam.name}
                                            </Text>
                                        </Box>
                                        <Box mb='20px' /> 
                                        <Box w='40vw'>
                                            <Text fontSize='16px' fontWeight='semibold' color='black'>
                                                Team Description
                                            </Text>
                                            <Text fontSize='14px' color='black'>
                                                {currentTeam.description!=="" ? currentTeam.description : "-" }                                                 
                                            </Text>
                                        </Box>
                                    </div>
                                    <div>
                                        <Box w='10vw'>
                                            {currentTeam.logo!==null ? <img src={BASE_URL + currentTeam.logo} /> : <img src={logo} /> } 
                                        </Box>
                                    </div>  
                                </div>
                            <Box mb='20px' />
                            <div class="float-right">
                                <Link href={`/${currentTeam.id}/team-management`}>
                                    <button type="button" class="btn btn-success">Edit</button>
                                </Link>  
                            </div>                                                          
                            </div>    
                            
                            <Box mb='40px' />
                            
                            <Box as='form' onSubmit={handleSubmit(sendInvite)}>
                                <Flex>
                                    <TextInput 
                                        id="invited_email"
                                        title='Invite Member' 
                                        placeholder='example@email.com'
                                        errors={errors}
                                        register={register}
                                        rules = {{
                                            required: "Required"
                                        }}
                                    />
                                </Flex>
                                <Box mb="20px"/>
                                <Button data-testid='test-inviteButton' id='inviteButton' colorScheme='teal' type='submit' borderRadius={10}>
                                        Invite
                                </Button>
                                {listErrors(extraError)}
                            </Box>

                            <Text mb={23} fontSize='32px' fontWeight='semibold' color='black'>
                                Team Members List
                            </Text> 

                            <TeamMemberComponent
                                header={true}
                            />
                            {currentTeam.teammember && currentTeam.teammember.map((val)=>(
                                <TeamMemberComponent
                                email={val.user.email}
                                verified={val.verified} 
                                cancelUserId= {val.user.id}
                                header={false}
                                />
                            ))}
                            
                        </Box>
                    
                    </GridItem>
                </Grid>
            </Flex>
        </div>
    );

}


export default ViewCurrentTeam;