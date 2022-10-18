import { h } from 'preact';
import { 
  Box,
  Button,
  ButtonGroup,
  Flex,
  Heading,
  Select,
  Spacer,
  Spinner } from '@chakra-ui/react'
import { useEffect, useState } from 'preact/hooks'
import { route } from 'preact-router';
import style from './style.css';
import AlertComponent from '../../components/alertComponent';
import axios from 'axios';
import BASE_URL from '../../config/api/constant.js';
import ROUTE from '../../config/api/route.js';
import SuccessRatePercentageChart from '../../components/chart/success_rate_percentage_chart';
import ResponseTimeChart from '../../components/chart/response_time_chart';
import { getUserToken } from '../../config/api/auth';

const ViewAPIMonitorDetail = ({id}) => {
  const options = [
    { value: "30MIN", label: "30 Minutes Ago" },
    { value: "60MIN", label: "1 Hour Ago" },
    { value: "180MIN", label: "3 Hours Ago" },
    { value: "360MIN", label: "6 Hours Ago" },
    { value: "720MIN", label: "12 Hours Ago" },
    { value: "1440MIN", label: "24 Hours Ago" },
  ];
  
  const [detail, setDetail]=useState([])
  const [deletePopup, setDeletePopup] = useState(false) 
  const [isLoadingDelete, setIsLoadingDelete] = useState(false)
  const [selectValue, setSelectValue] = useState("30MIN")

  const onDelete = () => {
    setIsLoadingDelete(true)
    axios.delete(`${BASE_URL}/monitor/${id}/`, {
      headers: {
        Authorization: `Token ${getUserToken()}`
      } 
    }).then(() => {
      route(ROUTE.DASHBOARD)
      setIsLoadingDelete(false)
    })
  }

  useEffect(() => {
    axios.get(`${BASE_URL}/monitor/${id}/`, {
      params:{
        range: `${selectValue}`
      },
      headers: {
        Authorization: `Token ${getUserToken()}`
      } 
    }).then((response) => {
      setDetail(response.data)
    })
  }, [selectValue]);

  const onChange = (e) => {
    setSelectValue(e.target.value)
  }

  return (
    <div class={style.home}>
      <Flex alignItems='center' gap='2'>
        <Box p='2'>
          <Heading size='md'>{detail.name}</Heading>
        </Box>
        <Spacer />
        <ButtonGroup gap='2'>
          <Button colorScheme='blueChill'>Edit</Button>
          <div onClick={() => {setDeletePopup(true)}}>
            <AlertComponent
                isButton={true}
                displayText='Delete'
                header='Delete'
                body='Are you sure want to delete this API monitor?'
                buttonLeftText='Cancel'
                buttonRightText={isLoadingDelete ? <Spinner /> : 'Yes'}
                popupOpen={deletePopup}
                setPopupOpen={setDeletePopup}
                onSubmit={onDelete}
                buttonRightColor='red' />
          </div>
        </ButtonGroup>
      </Flex>
      <div class={style['container-flex-column']}>
        <div class={style.requestItem}>
          <p><b>Request URL</b></p>
          <p>{detail.url}</p>
        </div>
        <div class={style.requestItem}>
          <p><b>Schedule</b></p>
          <p>{detail.schedule}</p>
        </div>
      </div>
      <div class={style['container-flex-column']}>
        <div class={style['container-dropdown-time']}>
            <Select value={selectValue} onChange={onChange} data-testid="select">
            {options.map(({ label, value }) => (
                <option data-testid={value} key={value} value={value}>
                  {label}
                </option>
            ))}
            </Select>
        </div>
        <div class={style['chart-container']}>
        <div class={style['chart']}>
          <SuccessRatePercentageChart 
          success_rate={detail.success_rate}/>
        </div>
        <div class={style['chart']}>
          <ResponseTimeChart 
          response_time={detail.response_time}/>
        </div>
      </div>
      </div>
    </div>
  )
}

export default ViewAPIMonitorDetail;