import { h } from "preact"
import { route } from "preact-router"
import { useEffect } from "react"
import { getUserToken } from "../api/auth"
import ROUTE from "../api/route"

const AuthenticationChecker = ({children}) => {
    const isAuthenticated = isAuthenticate();

    useEffect(()=>{
        if (!isAuthenticated) {
            route(ROUTE.LOGIN, true)
        }
    }, [isAuthenticated])

    return (<div>
        {isAuthenticated && children}
    </div>)
}

function isAuthenticate() {
    return (getUserToken() != null)
}

export {AuthenticationChecker, isAuthenticate}