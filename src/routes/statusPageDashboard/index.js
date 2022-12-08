import { h } from 'preact';
import { Box, Text, Image } from '@chakra-ui/react'
import { useEffect, useState } from 'preact/hooks'
import { Link } from 'preact-router/match'
import BASE_URL from '../../config/api/constant';
import SuccessRate from '../../components/success_rate';
import logo from '../../assets/icons/logo-monapi.svg';
import style_bar from '../../components/success_rate/style.css';
import axios from 'axios';
import style from './style.css';

const StatusPageDashboard = ({path}) => {
  const [monitor, setMonitor]=useState([])
  const [errorMessage, setErrorMessage]=useState("")
	  
	useEffect(()=>{
		axios.get(`${BASE_URL}/status-page/dashboard/`, {
      params: {
        path
      }
    }).then((response) => {
			setMonitor(response.data)
		}).catch((error) => {
      setErrorMessage(error.response.data.error)
    })
	},[path])

  function checkAllResultNotFailed(monitor) {
    return monitor.every((category) =>
      category.success_rate_category.every((hour) => hour.failed !== 0 && hour.success > 0)
    )
  }

  return(
    <Box p='40px' mx='20%'>
      <Box p='20px' align="center" display='flex' flexDirection='column'>
        <Text fontSize='4xl' as='b' mb='40px'>Status Page</Text>
        
        {(monitor.length != 0) ?
          <Box py='20px'>
            <Text pb='20px' textAlign='left'>Bar chart is calculated based on the last 24 hours where each bar block represents 1 hour</Text>
            <Box display="flex" justifyContent="space-between">
              <Box display="flex">
                <div class={style_bar['green-bar']} /> 
                <p>: 100% Success rate</p>
              </Box>
              <Box display="flex"> 
                <div class={style_bar['yellow-bar']} />
                <p>: 1-99% Success rate</p>
              </Box>
              <Box display="flex"> 
                <div class={style_bar['red-bar']} />
                <p>: 0% Success rate</p>
              </Box>
              <Box display="flex"> 
                <div class={style_bar['grey-bar']} />
                <p>: No data</p>
              </Box>
            </Box>
            <Box py='20px' />
            { checkAllResultNotFailed(monitor) ? 
              <Box py='20px' textAlign='left'>
                <Text textAlign='left' fontSize='xl' as='b' py='20px'>All feature(s) are healthy!</Text>
              </Box>
              :
              <Box py='20px' textAlign='left'>
                <Text fontSize='xl' as='b'>Some feature(s) are not healthy</Text>
                <Text fontSize='lg'>Your experience may be affected</Text>
              </Box>
            }
            <div>
            {monitor.map((val) => (
                <div class={style['status-page-category-item']}>
                  <Text textAlign='left' fontSize='2xl' as='b'>{val.name}</Text>
                  <Box pt='10px' display='flex' flexDirection='row' justifyContent='left' width={'100%'}>
                      {val.success_rate_category.map((hour, idx)=>(
                        <SuccessRate success={hour.success} failed={hour.failed} key={idx} width={'12px'} height={'30px'} /> 						
                      ))}	
                      { val.success_rate_category.length !== 0 ? <div /> : <Text fontSize='lg'>No data</Text>}	
                  </Box>
                  <Box mt={'10px'} />
                  <Text fontSize='12px' color={'gray'}>24 hours ago</Text>
                </div>
              ))
            }
            </div>
          </Box>
				:
				  <Text fontSize='2xl'>No data</Text>
        }

        { errorMessage === "" ? <div /> : <Text color='red' fontSize='2xl'>{errorMessage}</Text> }
      </Box>
        <Box mt='20px' position='fixed' right='50' bottom='10' display='flex' flexDirection='row' alignItems='center'>
          <Text pr='7px' fontSize='md'>Powered by </Text>
          <Link href="/">
              <Image src={logo} alt="MonAPI" w='88px' />
          </Link>
        </Box>
    </Box>
  )
}

export default StatusPageDashboard;