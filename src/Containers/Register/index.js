import React, { useState } from 'react'
import Layout from '../../Components/layout'
import Card from '../../Components/UI'
import {signup} from '../../actions'
import { useDispatch, useSelector } from 'react-redux'
import { Redirect } from 'react-router-dom'
import './style.css'
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
    document.getElementsByClassName("SignUpButton")[0].innerHTML=`<i className="fa fa-spinner fa-spin">`;
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
        <div className='body2'>
        <div class="app2">
        <div className='bg2'>
       
        <form className="signinform"
        >
        <img className="Signimg" src={require('../../assets/sign.svg')}/>

			<div className="Signinputs"
           >
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

			</div>

		</form>

	    
                
       
       
        </div>
        <footer>
			<button className='SignUpButton' onClick={registerUser}>Sign Up</button>
			<p className="p">Already a User ?<a href='login'>  Login</a></p>
		</footer>

        </div>
        </div>
    </Layout>
   )

 }

export default SignUpPage