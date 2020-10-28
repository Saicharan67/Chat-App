import React, { useState } from 'react'
import Layout from '../../Components/layout'
import Card from '../../Components/UI'
import {signup} from '../../actions'
import { useDispatch, useSelector } from 'react-redux'
import { Redirect } from 'react-router-dom'
/**
* @author
* @function SignUpPage
**/
const SignUpPage = (props) => {
    const [FirstName , setFirstName] = useState('')
    const [LastName , setlastName] = useState('')
    const [email , setEmail] = useState('')
    const [password , setPassword] = useState('')
    const dispatch = useDispatch();
    const auth = useSelector(state => state.auth)
const registerUser = (e) => {
    e.preventDefault()
    const user = {
        FirstName,LastName,email,password

    }
    dispatch(signup(user))
}
if(auth.authenticated){
    return <Redirect to={'/'}/>
}

  return(
    <Layout>
        <div className='registerContainer'>
            <Card>
                <form onSubmit={registerUser}>
                    <h2>Sign Up</h2>
                <input
                name="FirstName"
                type='FirtName'
                value={FirstName}
                onChange={(e) =>{
                   setFirstName(e.target.value)
                }}
                placeholder="FirstName"
                >
                </input>
                <input
                name="LastName"
                type='LastName'
                value={LastName}
                onChange={(e) =>{
                   setlastName(e.target.value)
                }}
                placeholder="LastName"
                >
                </input>
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
                placeholder="Password"
                >
                </input>
                <button>
                    SignUp
                </button>
                </form>
            </Card>

        </div>
    </Layout>
   )

 }

export default SignUpPage