import { h } from 'preact';
import { useEffect, useState } from 'preact/hooks'
import {
  Box,
  Icon,
  Link,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
  Tooltip,
  useDisclosure,
  Input,
  InputGroup,
  InputLeftAddon,
  InputRightElement,
  Spinner,
} from '@chakra-ui/react'
import BASE_URL from '../../config/api/constant';
import style from './style.css';
import axios from 'axios';
import { getUserToken } from '../../config/api/auth';
import { FaAngleRight, FaSearch, FaExternalLinkAlt } from 'react-icons/fa';


const ErrorLogs = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
	const [logs, setLogs]=useState({count:0, results:[]})
  const [detail, setDetail]=useState({monitor: {}})
  const [idDetail, setIdDetail]=useState()
  const [page, setPage]=useState(1)
  const [searchValue, setSearchValue]=useState(1)
  const [pageNumbers, setPageNumbers]=useState([])
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingDetails, setIsLoadingDetails] = useState(false);

  const pageSize = 10;
  const headers = ["Timestamp", "API Monitor Name", "Path", "Status", "Execution Time", "Details"]

  function headerAndContent(header, content) {
    return (
      <div class={style['modal-details-item']}>
        <p><b>{header}</b><br />
        <span class={style[`content-${header.replace(" ","-")}`]}>{content}</span></p>
      </div>
    )
  }

  function headerAndBox(header, content) {
    return (
      <div class={style['modal-details-item']}>
        <p><b>{header}</b><br />
        <span class={style[`content-${header.replace(" ","-")}`]}>
          <Box bg='gray.100' w='90%' color='black' p={3.5} mt={1.5} borderRadius='lg' class={style[`content-${header}`]}>
            {content ? content : "-"}
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
      pageNumbers.push(i)
    }

    return pageNumbers
  }

	useEffect(()=>{
    setIsLoading(true);
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
      setIsLoading(false);
		})
	},[page])

	useEffect(()=>{
    setIsLoadingDetails(true)
    if (idDetail != undefined) {
      axios.get(`${BASE_URL}/error-logs/${idDetail}`, {
        headers: {
          Authorization:`Token ${getUserToken()}`
        }
      }).then((response)=>{
        setDetail(response.data)
        setIsLoadingDetails(false)
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
			<div class={style['error-logs-head']}>
				<h2 class={style['title']}>Error Logs</h2>
        <InputGroup width={'300px'} maxWidth={'500px'}>
          <InputLeftAddon children={'Go To Page'} />
          <Input placeholder={`Max Page: ${Math.ceil(logs.count/pageSize)}`} role="inputSearch" onChange={(e) => setSearchValue(Number(e.currentTarget.value))} />
          <InputRightElement width='4.5rem'>
            <button class="btn btn-outline-secondary" type="button" aria-label='buttonSearch' onClick={() => setPage(searchValue)}>
              <FaSearch />
            </button>
          </InputRightElement>
        </InputGroup>
			</div>

      {isLoading ?
        <div class={style['spinner-container']}><Spinner /></div>
      :
        <div>
          <table style="width:100%" class={style['error-logs-table']}>
            <tr>
              {headers.map((val) => (
                <th key={val}>{val}</th>
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
                  <div role='detail-button' class={style['cursor-pointer']} onClick={() => onModal(val.id)}>
                    <FaAngleRight />
                  </div>
                </td>
              </tr>
            ))}
          </table>
          <div aria-label="pagination" class={style['pagination-number']}>
            <div class={style['pagination-container']}>
              <div class={`${style['pagination-item']} ${style['cursor-pointer']}`} data-testid="page-first" onClick={() => setPage(1)}>
                <a class="page-link">First Page</a>
              </div>
              {
                pageNumbers.map((val) => {
                  if (val == page) {
                    return (
                      <div key={val} class={`${style['pagination-item']} ${style['active']} ${style['cursor-pointer']}`} data-testid={`page-${val}`} onClick={() => setPage(val)}>
                        <a class="page-link">{val}</a>
                      </div>
                    )
                  } 

                  return (
                    <div key={val} class={`${style['pagination-item']} ${style['cursor-pointer']}`} data-testid={`page-${val}`} onClick={() => setPage(val)}>
                      <a class="page-link">{val}</a>
                    </div>
                  )
                })
              }
              <div class={`${style['pagination-item']} ${style['cursor-pointer']}`} data-testid="page-last" onClick={() => setPage(Math.ceil(logs.count/pageSize))}>
                <a class="page-link">Last Page</a>
              </div>
            </div>
          </div>
        </div>
      }

      <Modal onClose={onClose} isOpen={isOpen} size={'4xl'} scrollBehavior={'inside'}>
          <ModalOverlay />
          <ModalContent pb="20px">
            <ModalCloseButton mr={'10px'} />
            <ModalBody>
              {isLoadingDetails ?
                <div class={style['spinner-container']}><Spinner /></div>
              :
                <div class={style['body-modal']}>
                  <div>{headerAndContent('Timestamp', new Date(detail.execution_time).toString())}</div>
                  <div>{headerAndContent('API Monitor Name', detail.monitor.name)}</div>
                  <div>{headerAndContent('Path', detail.monitor.url)}</div>
                  <div>{headerAndContent('Status', 'failed')}</div>
                  <div>{headerAndContent('Execution Time', `${detail.response_time} ms`)}</div>
                  <div>{headerAndContent('Status Code', detail.status_code)}</div>
                  <div>{headerAndBox('Response', detail.log_response)}</div>
                  <div>{headerAndBox('Error', detail.log_error)}</div>
                  { detail.monitor.assertion_type == 'JSON' ?
                    (<div>
                      <div><b>JSON Compare</b>
                        <Tooltip label='Compare response: actual (left) to expected (right)' placement='right-end' hasArrow>
                          <Link role='json-compare' href={`https://www.jsondiff.com/?left=${detail.log_response}&right=${detail.monitor.assertion_value}`} isExternal>
                              <Icon as={FaExternalLinkAlt} pl='5px' />
                          </Link>
                        </Tooltip>
                      </div>
                    </div>)
                    :
                    (<div />)
                  }
                </div>
              }
            </ModalBody>
          </ModalContent>
        </Modal>
		</div>    
	)
};

export default ErrorLogs;