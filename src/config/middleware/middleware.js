import { h } from "preact"
import { Fragment } from "preact"
import { getCurrentUrl, route } from "preact-router"
import { getUserToken } from "../api/auth"
import ROUTE from "../api/route"

const AuthenticationChecker = () => {
    if (getCurrentUrl() != ROUTE.REGISTER && !isAuthenticate()) {
        route(ROUTE.LOGIN)
    }
    return <Fragment/>
}

function isAuthenticate() {
    return (getUserToken() != null)
}

export {AuthenticationChecker, isAuthenticate}