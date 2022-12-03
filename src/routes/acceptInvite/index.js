import { h } from "preact";
import { useState } from 'preact/hooks';
import { useEffect } from "react";
import BASE_URL from '../../config/api/constant.js';
import axios from "axios";

import SuccessPage from '../../components/successPage/index.js';
import InvalidPage from '../../components/invalidPage/index.js';
import LoadingPage from '../../components/loadingPage/index.js';

const AcceptInvite = () => {

    const paramInviteToken = new URLSearchParams(window.location.search).get('key')
    const [inviteToken, setInviteToken] = useState(null)
    const [response, setResponse] = useState({})
    const [isLoading, setIsLoading] = useState(true)

    useEffect(async () => {
        if (inviteToken != null) {
            const data = {
                'key': inviteToken
            }
            axios.post(`${BASE_URL}/invite-member/accept/`, data)
            .then((backend_response) => {
                setIsLoading(false)
                setResponse({
                    success: true
                })
            })
            .catch((error) => {
                setIsLoading(false)
                setResponse({
                    success: false
                })
            })
        }
        
    }, [inviteToken])

    if (paramInviteToken){
        setInviteToken(paramInviteToken);
    } else {
        return <InvalidPage headMessage={"Token Not Passed"}
                            bodyMessage1={"You are not supposed to see this page."} />
    }

    if (isLoading) {
        return <LoadingPage />
    }

    if (response.success) {
        return <SuccessPage headMessage={"Team Invite Accepted"}
                            bodyMessage1={"You are now a part of a new team!"}
                            bodyMessage2={"Login to work with everyone else now."}/>
    } else {
        return <InvalidPage headMessage={"Token Invalid"}
                            bodyMessage1={"It seems like the token has expired or the invite was cancelled."}
                            bodyMessage2={"Please request another invite from your Team or check if you are already a member."}/>
    }
}

export default AcceptInvite;