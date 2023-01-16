import axios from 'axios';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'

const Home = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userStore = useSelector(state => state.userStore)

  useEffect(() => {
    !userStore.isUser ? navigate('/login') : null;
  }, [userStore.isUser])

  const signOut = async () => {
    await axios.get('http://localhost:5001/logout', {
      withCredentials: true
    }).then((res) => dispatch({ type: 'RELOAD', reload: !userStore.reload }))
      .catch((err) => console.log(err))
  }

  return (
    <>
      <div>Name {userStore.userData.firstName + ' ' + userStore.userData.lastName}</div>
      <div>Email {userStore.userData.email}</div>
      <div>ID {userStore.userData._id}</div>
      <button onClick={signOut}>Sign out</button>
    </>
  )
}

export default Home