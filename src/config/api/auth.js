const getUserToken = () => {
    return localStorage.getItem('MONAPI_TOKEN');
}

const setUserToken = (token) => {
    localStorage.setItem('MONAPI_TOKEN', token);
}

const deleteUserToken = () => {
    localStorage.removeItem('MONAPI_TOKEN');
}

export { getUserToken, setUserToken, deleteUserToken }