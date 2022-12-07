import { h } from 'preact';
import { Text, Box, Flex, Grid, GridItem, Button, Spinner } from '@chakra-ui/react';
import TextInput from '../../components/forms/textinput/index.js'
import { useState, useEffect } from 'preact/hooks';
import axios from 'axios';
import BASE_URL from '../../config/api/constant.js';
import { getUserToken } from '../../config/api/auth.js';
import { Link } from 'preact-router/match'
import logo from '../../assets/icons/logo-monapi.svg';
import TeamMemberComponent from '../../components/teamMemberComponent/index.js';
import style from './style.css';

import { useForm } from 'react-hook-form';

const ViewCurrentTeam = () => {        
    const [currentTeam,setCurrentTeam]=useState([])
    const [successMessage, setSuccessMessage] = useState(null);
    const [extraError, setExtraError] = useState(null);
    const [isLoadingInvite, setIsLoadingInvite] = useState(false);
    const [isLoadingDetails, setIsLoadingDetails] = useState(true);

    const getCurrentTeamDetails = () => {
        axios.get(`${BASE_URL}/team-management/current/`, {
			headers: {
				Authorization:`Token ${getUserToken()}`
			}
		}).then((response)=>{
			setCurrentTeam(response.data)
            setIsLoadingDetails(false);
		}).catch(()=>{
            setIsLoadingDetails(false);
        })
    }

	useEffect(()=>{
        getCurrentTeamDetails();
	},[])

    // Invite Form
    const {
        handleSubmit,
        register,
        setValue,
        formState: { errors },
    } = useForm();

    const sendInvite = (res) => {
        setIsLoadingInvite(true);
        const data = {
            invited_email: res.invited_email
        }
        axios.post(`${BASE_URL}/invite-member/token/`, data, {
            headers: {
                Authorization: `Token ${getUserToken()}`
            }
        }).then(() => {
            getCurrentTeamDetails();
            setIsLoadingInvite(false);
            setValue('invited_email', '');
            setSuccessMessage(`Successfully invite ${res.invited_email} to the team`)
        }).catch((error) => {
            setExtraError(error)
            setIsLoadingInvite(false);
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
            <Flex
                h="full"
                backgroundRepeat='no-repeat'
                justify='center'
                align='center'
            >
                <Grid w='60vw' h='full' justify='center' templateColumns='repeat(6, 1fr)'>
                    <GridItem colSpan={6}>
                        <Box verticalAlign='center'>
                            <div class={style['team-management-header']}>
                                <Text mb={23} fontSize='32px' fontWeight='semibold' color='black'>
                                    Team Management
                                </Text>  
                                <Link href="/team-management/">
                                    <Button colorScheme='teal' borderRadius={10}>
                                        Create New Team
                                    </Button>
                                </Link>
                            </div>

                            {isLoadingDetails ? 
                                <div class={style['spinner-container']}><Spinner /></div>
                            : <div>
                                <div style="width:50%">
                                    <div class={style['team-details']}>
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
                                            <Button colorScheme='teal' borderRadius={10}>
                                                Edit
                                            </Button>
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
                                            w={'300px'}
                                        />
                                    </Flex>
                                    <Box mb="20px" />
                                    {successMessage && <Text color="green">{successMessage}</Text>}
                                    <Box mb="20px" />
                                    <Button data-testid='test-inviteButton' id='inviteButton' colorScheme='teal' type='submit' borderRadius={10}>
                                        {isLoadingInvite ? <Spinner /> : "Invite"}
                                    </Button>
                                    {listErrors(extraError)}
                                </Box>
                            </div>}
                           

                            <Box mb='40px' />

                            <Text mb={23} fontSize='32px' fontWeight='semibold' color='black'>
                                Team Members List
                            </Text> 

                            <TeamMemberComponent
                                header={true}
                            />
                            {isLoadingDetails && 
                                <div class={style['spinner-container']}><Spinner /></div>
                            }
                            {currentTeam.teammember && currentTeam.teammember.map((val)=>(
                                <TeamMemberComponent
                                    key={val.user.id}
                                    email={val.user.email}
                                    verified={val.verified} 
                                    cancelUserId= {val.user.id}
                                    header={false}
                                    refreshTeamData={getCurrentTeamDetails}
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