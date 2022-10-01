import { h } from 'preact';
import { useEffect, useState } from 'preact/hooks'
import BASE_URL from '../../config/api/constant';
import style from './style.css';
import axios from 'axios';
import SuccessRate from '../../components/success_rate';
import { getUserToken } from '../../config/api/auth';

const ViewListMonitor = () => {
	const [monitor,setMonitor]=useState([])
	useEffect(()=>{
		axios.get(`${BASE_URL}/monitor`,{headers:{Authorization:`Token ${getUserToken()}`}}).then((response)=>{setMonitor(response.data);console.log(response.data)})
	},[])
	return(
		<div class={style.home}>

			<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.1/dist/js/bootstrap.bundle.min.js" integrity="sha384-u1OknCvxWvY5kfmNBILK2hRnQC3Pr17a+RTT6rIHI7NnikvbZlHgTPOOmMi466C8" crossorigin="anonymous"></script>
			<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.1/dist/css/bootstrap.min.css" rel="stylesheet"/>

			<div class="d-flex justify-content-between">
				<h2>API Monitors</h2>
				<button type="button" class="btn btn-success">Create New</button>
			</div>
			
			<table style="width:100%">
				<tr>
					<th>API Name</th>
					<th>Path URL</th>
					<th>Success Rate</th>
					<th>Response Time (P95)</th>
					<th>Success Rate History (24h)</th>
				</tr>
				{monitor.map((val)=>(
					<tr>
						<td>{val.name}</td>
						<td>{val.url}</td>
						<td>{val.success_rate}%</td>
						<td>{val.avg_response_time}</td>
						<td>
							<div class={style['history-row']}>
							{val.success_rate_history.map((history)=>(
							<SuccessRate success={history.success} failed={history.failed}/> 						
							))}	
							</div>											
						</td>
					</tr>
				))}
			</table>

		</div>
	)
	
};

export default ViewListMonitor;