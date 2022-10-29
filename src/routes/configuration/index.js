import { h } from 'preact';
import { Accordion,
	AccordionItem,
	AccordionButton,
	AccordionPanel,
	AccordionIcon,
	Button, Checkbox, Spinner, Text, Box, Flex, Grid, GridItem, Radio, RadioGroup, Textarea, FormErrorMessage, FormControl } from '@chakra-ui/react';
import { Controller, useForm } from 'react-hook-form';
import { useState } from 'preact/hooks';
import axios from 'axios';
import { route } from 'preact-router';
import TextInput from '../../components/forms/textinput/index.js';
import BASE_URL from '../../config/api/constant.js';
import { getUserToken } from '../../config/api/auth.js';
import style from './style.css';
import { useEffect } from 'react';

const Configuration = () => {
    const [isLoading, setIsLoading] = useState(false)
    const [responseMessage, setResponseMessage] = useState('')
	const [successMessage, setSuccessMessage] = useState('');

    const {
        handleSubmit,
        register,
        control,
        formState: { errors },
		setValue,
	} = useForm({
        defaultValues: {
            is_slack_active:false,
            slack_token:'',
            slack_channel_id:'',
            is_discord_active:false,
            discord_bot_token:'',
            discord_guild_id:'',
            discord_channel_id:'',
            is_pagerduty_active:false,
            pagerduty_api_key:'',
            pagerduty_default_from_email:'',
            is_email_active:false,
            email_host:'',
            email_port:0,
            email_username:'',
            email_password:'',
			email_use_tls:false,
    		email_use_ssl:false,
        }
    });

    const onSubmit = (data) => {
        if (!isLoading) {
            setIsLoading(true);
            axios.post(`${BASE_URL}/alerts/config/`, data, {
                headers: {
                    Authorization:`Token ${getUserToken()}`
                }
            }).then(()=>{
                route('/configuration/');
                setIsLoading(false);
				setSuccessMessage("successful save configuration");
            }).catch((error)=> {
                setResponseMessage(error.response.data.error);
                setIsLoading(false);
            })
        }
    };

	useEffect(()=> {
		axios.get(`${BASE_URL}/alerts/config/`, {
			headers: {
				Authorization:`Token ${getUserToken()}`
			}
		}).then((response)=> {
			const fields = [
				'is_slack_active',
				'slack_token',
				'slack_channel_id',
				'is_discord_active',
				'discord_bot_token',
				'discord_guild_id',
				'discord_channel_id',
				'is_pagerduty_active',
				'pagerduty_api_key',
				'pagerduty_default_from_email',
				'is_email_active',
				'email_host',
				'email_port',
				'email_username',
				'email_password',
				'email_use_tls',
				'email_use_ssl',
			]
			fields.forEach((value)=>{
				setValue(value, response.data[value])
			})
		})
	}, [])

	return(
        <div class={style['alert-configuration']}>
            <Flex
                h="full"
                backgroundRepeat='no-repeat'
                justify='center'
                align='center'
            >
                <Grid w='60vw' h='full' justify='center' templateColumns='repeat(6, 1fr)'>
                    <GridItem colSpan={6}>
                        <Box verticalAlign='center'>
                        
                            <Box as='form' onSubmit={handleSubmit(onSubmit)} id="form-configuration">

								<Box style={{ padding: '10px', textAlign: 'center' }}>
									<Accordion allowToggle>
										<AccordionItem>
										<h2>
											<AccordionButton>
											<Box flex='1' textAlign='left'>
												<Text fontSize='20px' fontWeight='semibold' color='black'>
													Slack
												</Text>												
											</Box>
											
											<AccordionIcon />
											</AccordionButton>
										</h2>
										<AccordionPanel pb={4}>
											<Box w='40vw'textAlign='left'> 
											<Controller name='is_slack_active' control={control} render={({ field: { onChange, value } }) => (
                                                <Checkbox onChange={(e) => onChange(e)} isChecked={value} colorScheme='blueChill'>Activate Slack Notification</Checkbox>
                                            )}
                                            />
											</Box>
											<Box mb='20px' />
											<Box w='40vw'>
												<TextInput
													id='slack_token'
													title='Token'
													placeholder='Insert your slack token'
													errors={errors}
													register={register}
												/>
											</Box>
											<Box mb='20px' />
											<Box w='40vw'>
												<TextInput
													id='slack_channel_id'
													title='Channel ID'
													placeholder='Insert your slack channel ID'
													errors={errors}
													register={register}
												/>
											</Box>
										</AccordionPanel>
										</AccordionItem>
									</Accordion>
								</Box>

								<Box style={{ padding: '10px', textAlign: 'center' }}>
									<Accordion allowToggle>
										<AccordionItem>
										<h2>
											<AccordionButton>
											<Box flex='1' textAlign='left'>
												<Text fontSize='20px' fontWeight='semibold' color='black'>
													Discord
												</Text>	
											</Box>
											<AccordionIcon />
											</AccordionButton>
										</h2>
										<AccordionPanel pb={4}>
											<Box w='40vw'textAlign='left'> 
												<Controller name='is_discord_active' control={control} render={({ field: { onChange, value } }) => (
													<Checkbox onChange={(e) => onChange(e)} isChecked={value} colorScheme='blueChill'>Activate Discord Notification</Checkbox>
												)}
												/>
											</Box>
											<Box mb='20px' />
											<Box w='40vw'>
												<TextInput
													id='discord_bot_token'
													title='Bot Token'
													placeholder='Insert your discord bot token'
													errors={errors}
													register={register}
												/>
											</Box>
											<Box mb='20px' />
											<Box w='40vw'>
												<TextInput
													id='discord_guild_id'
													title='Guild ID / Server ID'
													placeholder='Insert your discord guild ID / server ID'
													errors={errors}
													register={register}
												/>
											</Box>
											<Box mb='20px' />
											<Box w='40vw'>
												<TextInput
													id='discord_channel_id'
													title='Channel ID'
													placeholder='Insert your discord channel ID'
													errors={errors}
													register={register}
												/>
											</Box>
										</AccordionPanel>
										</AccordionItem>
									</Accordion>
								</Box>

								<Box style={{ padding: '10px', textAlign: 'center' }}>
									<Accordion allowToggle>
										<AccordionItem>
										<h2>
											<AccordionButton>
											<Box flex='1' textAlign='left'>
												<Text fontSize='20px' fontWeight='semibold' color='black'>
													PagerDuty
												</Text>													
											</Box>
											<AccordionIcon />
											</AccordionButton>
										</h2>
										<AccordionPanel pb={4}>
											<Box w='40vw'textAlign='left'> 
												<Controller name='is_pagerduty_active' control={control} render={({ field: { onChange, value } }) => (
													<Checkbox onChange={(e) => onChange(e)} isChecked={value} colorScheme='blueChill'>Activate PagerDuty Notification</Checkbox>
												)}
												/>
											</Box>
											<Box mb='20px' />
											<Box w='40vw'>
												<TextInput
													id='pagerduty_api_key'
													title='PagerDuty API Key'
													placeholder='Insert your pagerduty API key'
													errors={errors}
													register={register}
												/>
											</Box>
											<Box mb='20px' />
											<Box w='40vw'>
												<TextInput
													id='pagerduty_default_from_email'
													title='Default From Email'
													placeholder='Insert bot pagerduty email'
													errors={errors}
													register={register}
												/>
											</Box>
										</AccordionPanel>
										</AccordionItem>
									</Accordion>
								</Box>

								<Box style={{ padding: '10px', textAlign: 'center' }}>
									<Accordion allowToggle>
										<AccordionItem>
										<h2>
											<AccordionButton>
											<Box flex='1' textAlign='left'>
												<Text fontSize='20px' fontWeight='semibold' color='black'>
													Email SMTP
												</Text>	
											</Box>
											<AccordionIcon />
											</AccordionButton>
										</h2>
										<AccordionPanel pb={4}>
											<Box w='40vw'textAlign='left'> 
												<Controller name='is_email_active' control={control} render={({ field: { onChange, value } }) => (
													<Checkbox onChange={(e) => onChange(e)} isChecked={value} colorScheme='blueChill'>Activate Email Notification</Checkbox>
												)}
												/>
											</Box>
											<Box mb='20px' />
											<Box w='40vw'>
												<TextInput
													id='email_host'
													title='SMTP Host'
													placeholder='Insert your email SMTP host'
													errors={errors}
													register={register}
												/>
											</Box>
											<Box mb='20px' />
											<Box w='40vw'>
												<TextInput
													id='email_port'
													title='SMTP Port'
													placeholder='Insert your email SMTP port'
													errors={errors}
													register={register}
												/>
											</Box>
											<Box mb='20px' />
											<Box w='40vw'>
												<TextInput
													id='email_username'
													title='Username'
													placeholder='Insert bot pagerduty username'
													errors={errors}
													register={register}
												/>
											</Box>
											<Box mb='20px' />
											<Box w='40vw'>
												<TextInput
													id='email_password'
													title='Password'
													placeholder='Insert bot pagerduty password'
													errors={errors}
													register={register}
												/>
											</Box>
											<Box w='40vw'textAlign='left'> 
												<Controller name='email_use_tls' control={control} render={({ field: { onChange, value } }) => (
													<Checkbox onChange={(e) => onChange(e)} isChecked={value} colorScheme='blueChill'>Use TLS</Checkbox>
												)}
												/>
											</Box>
											<Box mb='20px' />
											<Box w='40vw'textAlign='left'> 
												<Controller name='email_use_ssl' control={control} render={({ field: { onChange, value } }) => (
													<Checkbox onChange={(e) => onChange(e)} isChecked={value} colorScheme='blueChill'>Use SSL</Checkbox>
												)}
												/>
											</Box>									
										</AccordionPanel>
										</AccordionItem>
									</Accordion>
								</Box>
								{successMessage != '' && <Text fontSize='14px' color='black.500'>{successMessage}</Text>}
                                {responseMessage != '' && <Text fontSize='14px' color='red.500'>{responseMessage}</Text>}
                                <Box mb={responseMessage ? '10px' : '20px'} />
								

                            </Box>
                            <Box mb='49px' />
                            <Box align="end">
                                <Button form="form-configuration" id='signInButton' colorScheme='teal' type='submit' width='14em' borderRadius={10}>
                                    {isLoading ? <Spinner /> : "Save"}
                                </Button>
                            </Box>

                        </Box>

                    </GridItem>
                </Grid>
            </Flex>
        </div>

		
	)
	
};

export default Configuration;