import React, { useState } from 'react'
import Layout from '../../Components/layout'
import Card from '../../Components/UI'
import './style.css'
/**
* @author
* @function LoginPage
**/

const LoginPage = (props) => {

    const [email , setEmail] = useState('');
    const [password , setPassword] = useState('')
  return(
    <Layout>
        <div className='loginContainer'>
        <Card children="Login">
            <form>
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