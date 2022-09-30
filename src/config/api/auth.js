const getUserToken = () => {
    if (typeof window !== "undefined") {
        return localStorage.getItem('MONAPI_TOKEN');
    }
    return "";
}

const setUserToken = (token) => {
    if (typeof window !== "undefined") {
        localStorage.setItem('MONAPI_TOKEN', token);
    }
}

const deleteUserToken = () => {
    if (typeof window !== "undefined") {
        localStorage.removeItem('MONAPI_TOKEN');
    }
}

export { getUserToken, setUserToken, deleteUserToken }