import React, { useEffect, useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from '../container/Login'
import SignUp from '../container/SignUp'
import Home from '../container/Home'
import ErrorPage from '../container/ErrorPage'
import axios from 'axios'

const Router = () => {

    const [userData, setUserData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [reloadPage, setReloadPage] = useState(false);

    useEffect(() => {
        async function auth() {
            await axios.get('http://localhost:5001/auth', {
                withCredentials: true
            })
                .then((data) => { setUserData(data.data.data); setIsLoading(false) })
                .catch((err) => console.log(err))
        }
        auth()
        return () => { setUserData(null); setIsLoading(true) }
    }, [reloadPage])

    return isLoading ? null : (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Home reload={setReloadPage} isLoggedIn={userData ? true : false} />} />
                <Route path='/login' element={<Login reload={setReloadPage} isLoggedIn={userData ? true : false} />} />
                <Route path='/signup' element={<SignUp reload={setReloadPage} isLoggedIn={userData ? true : false} />} />
                <Route path='/*' element={<ErrorPage />} />
            </Routes>
        </BrowserRouter >
    )
}
export default Router;