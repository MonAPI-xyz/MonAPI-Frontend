import { h } from "preact"
import { route } from "preact-router"
import { getUserToken } from "../api/auth"
import ROUTE from "../api/route"

const AuthenticationChecker = ({children}) => {
    return isAuthenticate() ? children : route(ROUTE.LOGIN)
}

function isAuthenticate() {
    return (getUserToken() != null)
}

export {AuthenticationChecker, isAuthenticate}