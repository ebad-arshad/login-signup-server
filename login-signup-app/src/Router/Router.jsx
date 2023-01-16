import React, { useEffect, useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from '../container/Login'
import SignUp from '../container/SignUp'
import Home from '../container/Home'
import ErrorPage from '../container/ErrorPage'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'

const Router = () => {

    const [isLoading, setIsLoading] = useState(true);

    const dispatch = useDispatch();
    const userStore = useSelector(state => state.userStore);

    useEffect(() => {
        async function auth() {
            await axios.get('http://localhost:5001/auth', {
                withCredentials: true
            })
                .then((res) => { dispatch({ type: 'USER_CONNECTED', isUser: res.data.data ? true : false, userData: res.data.data }); setIsLoading(false) })
                .catch((err) => console.log(err))
        }
        auth()
    }, [userStore.reload])

    return isLoading ? null : (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/login' element={<Login />} />
                <Route path='/signup' element={<SignUp />} />
                <Route path='/*' element={<ErrorPage />} />
            </Routes>
        </BrowserRouter >
    )
}
export default Router;