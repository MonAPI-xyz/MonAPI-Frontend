import { h } from 'preact';
import { useEffect, useState, useContext } from 'preact/hooks'
import { Link } from 'preact-router/match'
import BASE_URL from '../../config/api/constant';
import style from './style.css';
import axios from 'axios';
import SuccessRate from '../../components/success_rate';
import { getUserToken } from '../../config/api/auth';
import { FaAngleRight } from 'react-icons/fa';
import SuccessRatePercentageChart from '../../components/chart/success_rate_percentage_chart';
import ResponseTimeChart from '../../components/chart/response_time_chart';
import style_detail from '../view_api_monitor_detail/style.css' ;	
import style_bar from '../../components/success_rate/style.css' ;
import moment from "moment";
import { UserContext } from '../../config/context';
import { Button, Spinner } from '@chakra-ui/react';

const ViewListMonitor = () => {	
	const [monitor,setMonitor]=useState([])
	const [detail, setDetail]=useState({})
	const {currentTeam} = useContext(UserContext);
  	const [currentTeamId] = currentTeam;
	const [isLoadingStats, setIsLoadingStats] = useState(false);
	const [isLoadingMonitor, setIsLoadingMonitor] = useState(false);
	  
	useEffect(()=>{
		setIsLoadingMonitor(true);
		axios.get(`${BASE_URL}/monitor/`, {
			headers: {
				Authorization:`Token ${getUserToken()}`
			}
		}).then((response)=>{
			setMonitor(response.data)
			setIsLoadingMonitor(false);
		})
	},[currentTeamId])

	useEffect(() => {
		setIsLoadingStats(true);
		axios.get(`${BASE_URL}/monitor/stats/`, {
		  headers: {
			Authorization: `Token ${getUserToken()}`
		  } 
		}).then((response) => {
		  setDetail(response.data);
		  setIsLoadingStats(false);
		})
	  }, [currentTeamId]);

	return(
		<div class={style.home}>
			<div class={style_detail['container-flex-column']}>
				{isLoadingStats ? 
					<div class={style['spinner-container']}><Spinner /></div>
				: 
					<div class={style_detail['chart-container']}>
						<div class={style_detail['chart']}>
							<SuccessRatePercentageChart 
							success_rate = {detail.success_rate} />
						</div>
						<div class={style_detail['chart']}>
							<ResponseTimeChart 
							response_time={detail.response_time} />
						</div>				
					</div>
				}
			</div>

			<div class={style['api-monitor-title']}>
				<h2 class={style['title']}>API Monitors</h2>
				<Link href="/create">
					<Button colorScheme='teal' borderRadius={10}>
						Create New
					</Button>
				</Link>
			</div>
			<br />
			{(monitor.length != 0)?
				<div class={style['monitor-legends']}>
					<div class={style['monitor-legends-item']}>
						<div class={style_bar['green-bar']} /> 
						<p>100% Success rate</p>
					</div>
					<div class={style['monitor-legends-item']}> 
						<div class={style_bar['yellow-bar']} />
						<p>1-99% Success rate</p>
					</div>
					<div class={style['monitor-legends-item']}> 
						<div class={style_bar['red-bar']} />
						<p>0% Success rate</p>
					</div>
					<div class={style['monitor-legends-item']}> 
						<div class={style_bar['grey-bar']} />
						<p>No data</p>
					</div>
				</div>				
				:
				<div />
			}

			{isLoadingMonitor ?
			 <div class={style['spinner-container']}><Spinner /></div>
			: 
			<table class={style['monitor-list-table']}>
				{(monitor.length != 0 && !isLoadingMonitor) ?
					<tr>
						<th style={'width:15%;'}>API Name</th>
						<th style={'width:25%;'}>Path URL</th>
						<th style={'width:10%;'}>Success Rate</th>
						<th style={'width:10%;'}>Response Time (Avg)</th>
						<th>Success Rate History (24h)</th>
						<th width={'25px'}> </th>
					</tr>
					:
					<p style="text-align: center">There is no monitor. You can click green button "Create New" in the middle right side</p>
				}
				
				{monitor.map((val)=>(
					<tr key={val.id}>
						<td>{val.name}</td>
						<td>{val.url}</td>
						<td>{val.success_rate}%</td>
						<td>{val.avg_response_time} ms</td>
						<td>
							<div class={style['history-row']}>
							{val.success_rate_history.map((history, idx)=>(
								<SuccessRate success={history.success} failed={history.failed} key={idx} /> 						
							))}	
							</div>
							<p>Last checked: {val.last_result ? moment(val.last_result.execution_time).fromNow() : "-"}</p>													
						</td>
						<td width={'25px'}>
							<Link data-testid={"linkViewApiMonitorDetail"} aria-label="view-api-monitor-detail" href={`/${val.id}/detail/`}>
								<FaAngleRight />
							</Link>
						</td>
					</tr>
				))}
			</table>
			}
		</div>
	)
	
};

export default ViewListMonitor;