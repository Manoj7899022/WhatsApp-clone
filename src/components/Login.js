import './Login.css'
import React from 'react'
import { Button } from '@mui/material'
import {auth,provider} from '../firebase/firebase'
import whatsapp from '../components/img/whatsapp.png'
import { useDispatch} from 'react-redux'
import { loginAction } from '../Redux/loginAction'


const Login = () => {

    const dispatch = useDispatch();

    const signIn = () =>{
        auth.signInWithPopup(provider)
            .then(result => dispatch(loginAction(result.user)))
            .catch(error => console.log(error.message))
    } 
  return (
    <div className='login'>
        <div className='login__container'>
            <img src={whatsapp} alt="whatsApp" />
            <h1>Sign in to Whatsapp</h1>
            <Button onClick={signIn}>Sign in with Google</Button>
        </div>
    </div>
  )
}

export default Login