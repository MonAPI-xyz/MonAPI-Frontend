import { h } from 'preact';
import { Text, Box, Flex, Grid, GridItem } from '@chakra-ui/react';
import { useState, useEffect } from 'preact/hooks';
import axios from 'axios';
import BASE_URL from '../../config/api/constant.js';
import { getUserToken } from '../../config/api/auth.js';
import { Link } from 'preact-router/match'
import logo from '../../assets/icons/logo-monapi.svg';
import TeamMemberComponent from '../../components/teamMemberComponent/index.js';

const ViewCurrentTeam = () => {        
    const [currentTeam,setCurrentTeam]=useState([])
	useEffect(()=>{
		axios.get(`${BASE_URL}/team-management/current/`, {
			headers: {
				Authorization:`Token ${getUserToken()}`
			}
		}).then((response)=>{
			setCurrentTeam(response.data)
            console.log(response)
		})
	},[])

    
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
                                <Link href="/">
                                    <button type="button" class="btn btn-success">Edit</button>
                                </Link>  
                            </div>                                                          
                            </div>    
                            
                            <Box mb='20px' />

                            <Box mb='20px' /> 

                            <Text mb={23} fontSize='32px' fontWeight='semibold' color='black'>
                                Team Members List
                            </Text> 

                            <table style="width:100%">
                                <tr>
                                    <th>Members</th>
                                    <th>Status</th>
                                </tr>
                                {currentTeam.teammember && currentTeam.teammember.map((val)=>(
                                    <tr>
                                        <td>{val.user.username}</td>
                                        <td>{val.verified ? "Member" : 'Pending' }</td> 
                                    </tr>
                                ))}
                            </table>
                            
                        </Box>
                    
                    </GridItem>
                </Grid>
            </Flex>
        </div>
    );

}


export default ViewCurrentTeam;