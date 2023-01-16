import axios from 'axios';
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const Home = ({ isLoggedIn, reload }) => {

  const navigate = useNavigate();

  useEffect(() => {
    !isLoggedIn ? navigate('/login') : null;
  }, [])

  const signOut = async () => {
    await axios.get('http://localhost:5001/logout', {
      withCredentials: true
    }).then((res) => reload(e => !e))
      .catch((err) => console.log(err))
  }

  return (
    <>
      <div>Hello </div>
      <button onClick={signOut}>Sign out</button>
    </>
  )
}

export default Home