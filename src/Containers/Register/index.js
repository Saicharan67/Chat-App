import React, { useState } from 'react'
import Layout from '../../Components/layout'
import Card from '../../Components/layout/UI'

/**
* @author
* @function SignUpPage
**/

const SignUpPage = (props) => {
    const {FirstName , setFirstName} = useState('')
    const {lastName , setlastName} = useState('')
    const {email , setEmail} = useState('')
    const {password , setPassword} = useState('')



  return(
    <Layout>
        <div className='registerConatainer'>
            <Card>
                <form>

                </form>
            </Card>

        </div>
    </Layout>
   )

 }

export default SignUpPage