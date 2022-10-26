import { h } from 'preact';
import { useEffect, useState } from 'preact/hooks'
import { Link } from 'preact-router/match'
import BASE_URL from '../../config/api/constant';
import style from './style.css';
import axios from 'axios';;
import { getUserToken } from '../../config/api/auth';

const Configuration = () => {

	return(
		<div class={style.home}>
			<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.1/dist/js/bootstrap.bundle.min.js" integrity="sha384-u1OknCvxWvY5kfmNBILK2hRnQC3Pr17a+RTT6rIHI7NnikvbZlHgTPOOmMi466C8" crossorigin="anonymous" />
			<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.1/dist/css/bootstrap.min.css" rel="stylesheet" />

		</div>
	)
	
};

export default Configuration;