import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {NavLink,Link} from 'react-router-dom'
import './style.css'
import {logout} from '../../actions'
/**
* @author
* @function Header
**/

const Header = (props) => {
    const auth = useSelector(state => state.auth)
    const dispatch = useDispatch()
    

    
  return(
    <header className={auth.authenticated? "header" : 'loginheader'}>
        <div style={{display: 'flex'}}>
            <div className='logo'>Chat-App</div>
        </div>
       
  <div style={{margin: '20px 0' , color: '#fff' , fontWeight: '3rem'}}>{auth.authenticated ? `Hi ${auth.FirstName} ${auth.LastName}`: ''}</div>
        <ul className="menu">
          {
              auth.authenticated ? 
              <li>
              <Link to={"#"} onClick={()=>{
                dispatch(logout(auth.uid))
              }}>Logout</Link>
              </li>
              :null

          }
        </ul>
          {
            !auth.authenticated ?
            <ul className="RightMenu">
            <li><NavLink to={'./login'}>Login</NavLink></li>
            <li><NavLink to={'./signup'}>Signup</NavLink></li>
            </ul>: null
            }
    </header>
   )

 }

export default Header