import { h } from 'preact';
import { useEffect, useState } from 'preact/hooks'
import {
  Button,
  Box,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from '@chakra-ui/react'
import BASE_URL from '../../config/api/constant';
import style from './style.css';
import './style.css';
import axios from 'axios';
import { getUserToken } from '../../config/api/auth';
import { FaAngleRight } from 'react-icons/fa';


const ErrorLogs = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
	const [logs, setLogs]=useState([])
  const [detail, setDetail]=useState({monitor: {}})
  const [idDetail, setIdDetail]=useState()

  const headers = ["Timestamp", "API Monitor Name", "Path", "Status", "Execution Time", "Details"]

  function headerAndContent(header, content) {
    return (
      <div>
        <p><b>{header}</b><br/>
        <span class={style[`content-${header}`]}>{content}</span></p>
      </div>
    )
  }

  function headerAndBox(header, content) {
    return (
      <div>
        <p><b>{header}</b><br/>
        <span class={style[`content-${header}`]}>
          <Box bg='gray.100' w='90%' color='black' p={3.5} mt={1.5} borderRadius='lg' class={style[`content-${header}`]}>
            {content}
          </Box>
        </span></p>
      </div>
    )
  }

	useEffect(()=>{
		axios.get(`${BASE_URL}/error-logs/`, {
			headers: {
				Authorization:`Token ${getUserToken()}`
			}
		}).then((response)=>{
			setLogs(response.data)
		})
	},[])

	useEffect(()=>{
    if (idDetail != undefined) {
      axios.get(`${BASE_URL}/error-logs/${idDetail}`, {
        headers: {
          Authorization:`Token ${getUserToken()}`
        }
      }).then((response)=>{
        setDetail(response.data)
      })
    }
	},[idDetail])

  const onModal = (idx) => {
    setIdDetail(idx)
    onOpen()
  }

  function dateFormatter(dateString) {
    return new Date(dateString).toLocaleString('en-GB')
  }

	return(
		<div class={style.home}>
			<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.1/dist/js/bootstrap.bundle.min.js" integrity="sha384-u1OknCvxWvY5kfmNBILK2hRnQC3Pr17a+RTT6rIHI7NnikvbZlHgTPOOmMi466C8" crossorigin="anonymous" />
			<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.1/dist/css/bootstrap.min.css" rel="stylesheet" />

			<div class="d-flex justify-content-between">
				<h2>Error Logs</h2>
			</div>
			
			<table style="width:100%">
				<tr>
          {headers.map((val) => (
            <th>{val}</th>
          ))}
				</tr>
				{logs.map((val)=>(
					<tr key={val.id}>
						<td>{dateFormatter(val.execution_time)}</td>
						<td>{val.monitor.name}</td>
						<td>{val.monitor.url}</td>
						<td class={style['status']}>failed</td>
						<td>{val.response_time} ms</td>
						<td>
              <div role='detail-button' onClick={() => onModal(val.id)}>
                <FaAngleRight />
              </div>
						</td>
					</tr>
				))}
			</table>

      <Modal onClose={onClose} isOpen={isOpen} size={'4xl'} scrollBehavior={'inside'}>
          <ModalOverlay />
          <ModalContent>
            <ModalCloseButton mr={'10px'} />
            <ModalBody>
              <div class={style['body-modal']}>
                  <div>{headerAndContent('Timestamp', new Date(detail.execution_time).toString())}</div>
                  <div>{headerAndContent('API Monitor Name', detail.monitor.name)}</div>
                  <div>{headerAndContent('Path', detail.monitor.url)}</div>
                  <div>{headerAndContent('Status', 'failed')}</div>
                  <div>{headerAndContent('Execution Time', detail.response_time)}</div>
                  <div>{headerAndBox('Response', detail.log_response)}</div>
                  <div>{headerAndBox('Error', detail.log_error)}</div>
              </div>
            </ModalBody>
            <ModalFooter>
              <Button onClick={onClose}>Close</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
		</div>    
	)
};

export default ErrorLogs;