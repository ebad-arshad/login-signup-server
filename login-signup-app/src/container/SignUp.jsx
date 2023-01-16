import React, { useEffect, useState } from 'react'
import '../css/bgImage.css'
import { MdLandscape } from 'react-icons/md'
import { FaUserAlt } from 'react-icons/fa'
import { FaLock } from 'react-icons/fa'
import { BsEye } from 'react-icons/bs'
import { BsEyeSlash } from 'react-icons/bs'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'

const SignUp = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch()
    const userStore = useSelector(state => state.userStore)

    useEffect(() => {
        userStore.isUser ? navigate('/') : null;
    }, [userStore.isUser])

    const [name, setName] = useState({ firstName: '', lastName: '' });
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [regexFlag, setRegexFlag] = useState(false);
    const [eyeOpen, setEyeOpen] = useState(true);

    const nameReg = /^[a-zA-Z]+ [a-zA-Z]+$/;
    const emailReg = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    const passReg = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;

    const signUpBtn = async () => {
        const fullName = `${name.firstName?.trim()} ${name.lastName?.trim()}`;
        try {
            if (email?.match(emailReg) && password?.match(passReg) && fullName?.match(nameReg)) {
                await axios.post('http://localhost:5001/signup', {
                    firstName: name.firstName.charAt(0).toUpperCase() + name.firstName.slice(1),
                    lastName: name.lastName.charAt(0).toUpperCase() + name.lastName.slice(1),
                    email,
                    password,
                }, {
                    withCredentials: true
                })
                dispatch({ type: 'RELOAD', reload: !userStore.reload })
            } else {
                setRegexFlag(true)
                setTimeout(() => {
                    setRegexFlag(false)
                }, 3000);
            }
        }
        catch (error) {
            console.log(error);
        }
    }

    return (
        <div className='relative flex items-center justify-center w-full h-[100vh]'>
            <div className="bgImage" ></div>
            <div className="z-1 flex flex-col items-center bg-gradient-to-b from-[#7579ff] to-[#b224ef] w-[500px] rounded-[10px] px-[55px] pt-[55px] pb-[37px]">
                <div className="w-[120px] h-[120px] rounded-full bg-white flex items-center justify-center"><MdLandscape color='#333' size={60} /></div>
                <div className="font-bold text-[30px] text-white tracking-[1px] mt-[30px]">SIGN UP</div>
                {
                    regexFlag ?
                        <div className='text-[14px] text-white mt-[10px] text-center'>
                            *Name,Email or Password is not valid
                        </div>
                        : null
                }
                <div className='w-full mt-[40px]'>
                    <div className='flex w-full gap-5'>
                        <div className='flex-[.5] flex items-center border-b-white/25 border-b-[2px] '>
                            <input value={name.firstName} onChange={(v) => setName(e => { return { ...e, firstName: v.target.value } })} className='w-full outline-none border-0 placeholder:text-white p-[10px] bg-transparent text-white' placeholder='Firstname' type="text" />
                        </div>
                        <div className='flex-[.5] flex items-center border-b-white/25 border-b-[2px] '>
                            <input value={name.lastName} onChange={(v) => setName(e => { return { ...e, lastName: v.target.value } })} className='w-full outline-none border-0 placeholder:text-white p-[10px] bg-transparent text-white' placeholder='Lastname' type="text" />
                        </div>
                    </div>
                    <div className='flex items-center border-b-white/25 border-b-[2px] mt-[30px]'>
                        <FaUserAlt color='white' size={16} />
                        <input value={email} onChange={(e) => setEmail(e.target.value)} className='w-full outline-none border-0 bg-transparent placeholder:text-white p-[10px] text-white' placeholder='Username' type="text" />
                    </div>
                    <div className='flex items-center border-b-white/25 border-b-[2px] mt-[30px]'>
                        <FaLock color='white' size={16} />
                        <input value={password} onChange={(e) => setPassword(e.target.value)} className='w-full outline-none border-0 bg-transparent placeholder:text-white p-[10px] text-white' placeholder='Password' type={eyeOpen ? 'password' : 'text'} />
                        {eyeOpen ?
                            <BsEye onClick={() => setEyeOpen(false)} color='white' size={20} className='cursor-pointer select-none' />
                            :
                            <BsEyeSlash onClick={() => setEyeOpen(true)} color='white' size={20} className='cursor-pointer select-none' />
                        }
                    </div>
                </div>
                <button className='bg-white p-[14px] rounded-[25px] mt-[30px] w-[120px] text-[#555] text-[16px] active:opacity-[.2] outline-none' onClick={signUpBtn}>Sign up</button>
                <button onClick={() => navigate('/login')} className='bg-transparent text-[#e5e5e5] text-[14px] mt-[30px] active:opacity-[.2] outline-none'>Login instead</button>
            </div>
        </div>
    )
}

export default SignUp