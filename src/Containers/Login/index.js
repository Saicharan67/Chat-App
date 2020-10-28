import { auth } from 'firebase'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { isLoggedInUser, signin } from '../../actions'
import Layout from '../../Components/layout'
import Card from '../../Components/UI'
import './style.css'
/**
* @author
* @function LoginPage
**/

const LoginPage = (props) => {
    const dispatch = useDispatch()
    const auth = useSelector(state => state.auth)
    const [email , setEmail] = useState('');
    const [password , setPassword] = useState('')

    // useEffect(()=> {
    //     if(!auth.authenticated){
    //         dispatch(isLoggedInUser)
    //     }
    // },[])
    const userLogin = (e) => {
        e.preventDefault()
        if ( email== "" ){
           alert("Email Is Required")
           return
        }
        if(password==""){
            alert("Password Is Required")
            return
        }
        dispatch(signin({email,password}))

    }
    if(auth.authenticated){
        return <Redirect to={'/'}/>
    }
  return(
    <Layout>
        <div className='loginContainer'>
        <Card children="Login">
            <form onSubmit={userLogin}>
                <input
                name="email"
                type='email'
                value={email}
                onChange={(e) =>{
                   setEmail(e.target.value)
                }}
                placeholder="Email.."
                >
                </input>
                <input
                name="password"
                type='password'
                value={password}
                onChange={(e) =>{
                   setPassword(e.target.value)
                }}
                placeholder="Password.."
                >
                </input>
                <div>
                    <button>
                        Login
                    </button>
                </div>
            </form>
        </Card>
        </div>
       
    </Layout>
   )

 }

export default LoginPage