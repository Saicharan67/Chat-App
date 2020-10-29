// import React from 'react'
 import Layout from '../../Components/layout'

// /**
// * @author
// * @function HomePage
// **/

// const HomePage = (props) => {
  
//   return(
//       <Layout>
//        <div>HomePage</div>
//       </Layout>
    
//    )

//  }

// export default HomePage
import React, { useEffect } from 'react';
import './style.css';
import { useDispatch, useSelector } from 'react-redux';
import { getRealTimeUsers } from '../../actions/user.actions';

const HomePage = (props) => {
   const dispatch = useDispatch() 

   const auth = useSelector(state => state.auth)
   const user = useSelector(state => state.user)

   console.log(user)
    useEffect(()=>{
          dispatch(getRealTimeUsers(auth.uid))
    }, [])
  return (
      <Layout>
    <section className="container">
    <div className="listOfUsers">
       {
           user.users.length > 0 ? 
           user.users.map(user => {
               return(
                <div key={user.uid} className="displayName">
                    <div className="displayPic">
                        <img src="https://avatars1.githubusercontent.com/u/54733827?v=4" alt="Dp" />
                    </div>
                    <div style={{display: 'flex',flex: 1, justifyContent: 'space-between', margin: '0 10px'}}>
                        <span style={{fontWeight: 500}}>{user.FirstName} {user.LastName}</span>
                        <span>{user.isOnline ? 'Online': 'Offline'}
                        </span>
                    </div>
                </div>
               )
           })
           : null
       }
                
    </div>
    <div className="chatArea">
        <div className="chatHeader"> Sai Charan </div>
        <div className="messageSections">

            <div style={{ textAlign: 'left' }}>
                <p className="messageStyle" >Hello User</p>
            </div>

        </div>
        <div className="chatControls">
            <textarea />
            <button>Send</button>
        </div>
    </div>
</section>
</Layout>
  );
}

export default HomePage;