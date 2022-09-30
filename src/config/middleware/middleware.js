import { h } from "preact"
import { Fragment } from "preact"
import { getCurrentUrl, route } from "preact-router"
import { getUserToken } from "../api/auth"
import ROUTE from "../api/route"

const AuthenticationChecker = () => {
    console.log("AuthenticationChecker", getCurrentUrl())
    if (getCurrentUrl() == ROUTE.REGISTER) {
        route(ROUTE.REGISTER)
    } else if (!isAuthenticate()) {
        route(ROUTE.LOGIN)
    }
    return <Fragment/>
}

function isAuthenticate() {
    return (getUserToken() != null)
}

export {AuthenticationChecker, isAuthenticate}