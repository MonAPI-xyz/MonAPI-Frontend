import { h } from 'preact';
import { useEffect, useState } from 'preact/hooks'
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

const ViewListMonitor = () => {	

	var today = new Date();
	var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
	var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
	var dateTime = date+' '+time;

	const [monitor,setMonitor]=useState([])
	const [detail, setDetail]=useState({})
	useEffect(()=>{
		axios.get(`${BASE_URL}/monitor/`, {
			headers: {
				Authorization:`Token ${getUserToken()}`
			}
		}).then((response)=>{
			setMonitor(response.data)
		})
	},[])

	useEffect(() => {
		axios.get(`${BASE_URL}/monitor/stats/`, {
		  headers: {
			Authorization: `Token ${getUserToken()}`
		  } 
		}).then((response) => {
		  setDetail(response.data)
		})
	  }, []);

	return(
		<div class={style.home}>
			<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.1/dist/js/bootstrap.bundle.min.js" integrity="sha384-u1OknCvxWvY5kfmNBILK2hRnQC3Pr17a+RTT6rIHI7NnikvbZlHgTPOOmMi466C8" crossorigin="anonymous" />
			<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.1/dist/css/bootstrap.min.css" rel="stylesheet" />

			<div class={style_detail['container-flex-column']}>
				
				<div class={style_detail['chart-container']}>
					<div class={style_detail['chart']}>
						<SuccessRatePercentageChart 
						success_rate = {detail.success_rate}/>
					</div>
					<div class={style_detail['chart']}>
						<ResponseTimeChart 
						response_time={detail.response_time}/>
					</div>				
				</div>
			</div>

			<div class="d-flex justify-content-between">
				<h2>API Monitors</h2>
				<Link href="/create">
					<button type="button" class="btn btn-success">Create New</button>
				</Link>
			</div>
			<br/>
			{(monitor.length != 0)?
				<div>
					<p>Last checked: {dateTime}</p>
					<div class="d-flex justify-content-between">
						<div class="d-flex justify-content-between">
							<div class={style_bar['green-bar']}></div> 
							<p>: 100% Success rate</p>
						</div>
						<div class="d-flex justify-content-between"> 
							<div class={style_bar['yellow-bar']}></div>
							<p>: 1-99% Success rate</p>
						</div>
						<div class="d-flex justify-content-between"> 
							<div class={style_bar['red-bar']}></div>
							<p>: 0% Success rate</p>
						</div>
						<div class="d-flex justify-content-between"> 
							<div class={style_bar['grey-bar']}></div>
							<p>: No data</p>
						</div>
					</div>
				</div>				
				:
				<div/>
			}
			<table style="width:100%">
				{(monitor.length != 0)?
					<tr>
						<th>API Name</th>
						<th>Path URL</th>
						<th>Success Rate</th>
						<th>Average Response Time</th>
						<th>Success Rate History (24h)</th>
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
						</td>
						<td>
							<Link aria-label="view-api-monitor-detail" href={`/${val.id}/detail/`}>
								<FaAngleRight />
							</Link>
						</td>
					</tr>
				))}
			</table>

		</div>
	)
	
};

export default ViewListMonitor;