import { h } from 'preact';
import { useState } from 'preact/hooks';
import { useEffect } from "react";
import BASE_URL from '../../config/api/constant.js';
import axios from "axios";
import style from './style.css';

import SuccessPage from '../../components/successPage/index.js';
import InvalidPage from '../../components/invalidPage/index.js';
import LoadingPage from '../../components/loadingPage/index.js';
import { Button } from '@chakra-ui/react';
import { Link } from 'preact-router';

const VerifyUser = () => {
    const paramVerifyToken = new URLSearchParams(window.location.search).get('key')
    const [verifyToken, setVerifyToken] = useState(null)
    const [response, setResponse] = useState({})
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        if (verifyToken != null) {
            const data = {
                key: verifyToken,
            }
            axios.post(`${BASE_URL}/register/verify`, data)
            .then(() => {
                setResponse({
                    success: true
                })
                setIsLoading(false)
            })
            .catch(() => {
                setResponse({
                    success: false
                })
                setIsLoading(false)
            })
        }
        
    }, [verifyToken])

    if (paramVerifyToken){
        setVerifyToken(paramVerifyToken);
    }

    return (<div>
        {!paramVerifyToken ?
            <InvalidPage headMessage={"Token Not Passed"}
                bodyMessage1={"You are not supposed to see this page."} />
        : isLoading ?
            <LoadingPage />
        : response.success ?
            <SuccessPage headMessage={"User Email Verified"} 
                bodyMessage1={`You are now a verified user!`}
                bodyMessage2={'You can login now.'} />
        :
            <InvalidPage headMessage={"Token Invalid"}
                bodyMessage1={"Please check the link you followed are correctly copied from the email you receive."} />
        }

        {!isLoading && 
            <Link href="/login" class={style['login-button']}>
                <Button colorScheme='teal' width='12em' borderRadius={10}>
                    Back to login page
                </Button>
            </Link>
        }
    </div>)
}

export default VerifyUser;