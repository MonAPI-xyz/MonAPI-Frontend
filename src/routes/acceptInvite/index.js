import { h } from "preact";
import { useState } from 'preact/hooks';
import { useEffect } from "react";
import BASE_URL from '../../config/api/constant.js';
import axios from "axios";
import style from './style.css';

import SuccessPage from '../../components/successPage/index.js';
import InvalidPage from '../../components/invalidPage/index.js';
import LoadingPage from '../../components/loadingPage/index.js';
import { Link } from "preact-router";
import { Button } from "@chakra-ui/react";

const AcceptInvite = () => {
    const paramInviteToken = new URLSearchParams(window.location.search).get('key')
    const [inviteToken, setInviteToken] = useState(null)
    const [response, setResponse] = useState({})
    const [isLoading, setIsLoading] = useState(true)

    if (paramInviteToken){
        setInviteToken(paramInviteToken);
    } 

    useEffect(() => {
        if (inviteToken != null) {
            const data = {
                key: inviteToken,
            }
            axios.post(`${BASE_URL}/invite-member/accept/`, data)
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
        
    }, [inviteToken])

    return (<div>
        {!paramInviteToken ? 
            <InvalidPage headMessage={"Token Not Passed"}
                bodyMessage1={"You are not supposed to see this page."} />
        : isLoading ?
            <LoadingPage />
        : response.success ?
            <SuccessPage headMessage={"Team Invite Accepted"}
                bodyMessage1={"You are now a part of a new team!"}
                bodyMessage2={"Login to work with everyone else now."} />
        : 
            <InvalidPage headMessage={"Token Invalid"}
                bodyMessage1={"It seems like the token has expired or the invite was cancelled."}
                bodyMessage2={"Please request another invite from your Team or check if you are already a member."} />
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

export default AcceptInvite;