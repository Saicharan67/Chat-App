
import React, {  useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Redirect } from 'react-router-dom'
import {  signin } from '../../actions'

import Layout from '../../Components/layout'

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
    const [ButtonClicked,setButtonClicked]=useState(false)
    const [SignupButtonClicked,setsignup]=useState(false)
    // useEffect(()=> {
    //     if(!auth.authenticated){
    //         dispatch(isLoggedInUser)
    //     }
    // },[])
    const signUpClick=()=>{
       setsignup(true)
       
         //
    }
    const userLogin = (e) => {
        setButtonClicked(true)
        e.preventDefault()
        if ( email=== "" ){
           alert("Email Is Required")
           return
        }
        if(password===""){
            alert("Password Is Required")
            return
        }
        dispatch(signin({email,password}))

    }
    if(auth.authenticated){
        return <Redirect to={'/Chat-App'}/>
    }
    if (SignupButtonClicked){
        return <Redirect to={'/signup'}/>
      }
            
             
             
  return(
     <Layout>
       <div className='body'>
        <div className="app">
        <div className='bg'>
       
        <form>
			<header>
                <img 
                src={require('../../assets/login.svg')}/>
			</header>

			<div className="inputs">
				<input type="email" name="email" placeholder="Email"
                  value={email}
                  onChange={
                      (e)=>{
                          setEmail(e.target.value)
                      }
                  }
                ></input>
				<input type="password" name="password" placeholder="password"
                 value={password}
                 onChange={(e)=>{
                     setPassword(e.target.value)
                 }}
                ></input>

				<p className="light"><a href="#">Forgot password?</a></p>
			</div>

		</form>

	

       
        </div>
        <footer>
            <button 
             className='LoginButton'
             onClick={userLogin}>
                 {
                  ButtonClicked ?
                  <i style={{fontSize:'20px'}}className="fa fa-spinner fa-spin "></i>
                  : 'Continue'
                 }
            
            </button>
			<p>Don't have an account?  &nbsp;
            &nbsp; <h4  onClick={signUpClick} >Sign Up</h4></p>
		</footer>

        </div>
        </div>
        </Layout>
   )

 }

export default LoginPage