import React from 'react'
import {Redirect, Route} from 'react-router-dom'
/**
* @author
* @function PrivateRoute
**/

const PrivateRoute = ({component: Component, ...rest}) => {
  return(
    <Route {...rest}  component={(props)=>{
        const user = localStorage.getItem('users') ? JSON.parse(localStorage.getItem('users')) : null;
        console.log(user)
       if(user){
           return <Component {...props}/>
       }else{
           return <Redirect to={'/login'}/> 
       }
   
    }}/>
   )

 }

export default PrivateRoute