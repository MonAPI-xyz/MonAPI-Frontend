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
import axios from 'axios';
import { getUserToken } from '../../config/api/auth';
import { FaAngleRight, FaSearch } from 'react-icons/fa';


const ErrorLogs = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
	const [logs, setLogs]=useState({count:0, results:[]})
  const [detail, setDetail]=useState({monitor: {}})
  const [idDetail, setIdDetail]=useState()
  const [page, setPage]=useState(1)
  const [searchValue, setSearchValue]=useState(1)
  const [pageNumbers, setPageNumbers]=useState([])

  const pageSize = 10;
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

  function paginationNumber(current, total) {
    const pageNumbers = []
    const start = (current - 2) < 1 ? 1 : (current - 2)
    const end = (current + 2) > total ? total : (current + 2)
    for (let i = start; i <= end; i++) {
      if (i === current) {
        pageNumbers.push(-1 * i)
      } else {
        pageNumbers.push(i)
      }
    }

    return pageNumbers
  }

	useEffect(()=>{
		axios.get(`${BASE_URL}/error-logs/`, {
      params: {
        page: `${page}`
      },
			headers: {
				Authorization:`Token ${getUserToken()}`
			}
		}).then((response)=>{
			setLogs(response.data)
      setPageNumbers(paginationNumber(page, Math.ceil(response.data.count/pageSize)))
		})
	},[page])

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
        <div class="input-group input-group-sm mb-3" style={{height: "auto", maxWidth: "250px"}}>
          <span class="input-group-text" id="inputGroup-sizing-default">Go to page:</span>
          <input type="text" class="form-control" placeholder={`Max Page: ${Math.ceil(logs.count/pageSize) > 150 ? 150 : Math.ceil(logs.count/pageSize)}`} role="inputSearch" onChange={(e) => setSearchValue(Number(e.currentTarget.value))}/>
          <button class="btn btn-outline-secondary" type="button" aria-label='buttonSearch' onClick={() => setPage(searchValue)}>
            <FaSearch />
          </button>
        </div>
			</div>
			
			<table style="width:100%">
				<tr>
          {headers.map((val) => (
            <th>{val}</th>
          ))}
				</tr>
				{logs.results.map((val)=>(
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

      <div aria-label="pagination" class={style['pagination-number']}>
        <ul class="pagination justify-content-center">
          <li class="page-item first-page" data-testid="page-first" onClick={() => setPage(1)}>
            <a class="page-link">First Page</a>
          </li>
          {
            pageNumbers.map((val) => {
              if (val < 0) {
                const currentVal = -1 * val
                return (
                  <li class="page-item active" data-testid={`page-${currentVal}`} onClick={() => setPage(currentVal)}>
                    <a class="page-link">{currentVal}</a>
                  </li>
                )
              } else {
                return (
                  <li class="page-item" data-testid={`page-${val}`} onClick={() => setPage(val)}>
                    <a class="page-link">{val}</a>
                  </li>
                )
              }
            })
          }
          <li class="page-item last-page" data-testid="page-last" onClick={() => setPage(Math.ceil(logs.count/pageSize))}>
            <a class="page-link">Last Page</a>
          </li>
        </ul>
      </div>

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
                  <div>{headerAndContent('Status Code', detail.status_code)}</div>
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