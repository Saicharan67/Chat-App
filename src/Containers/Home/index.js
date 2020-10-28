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
import { useDispatch } from 'react-redux';
import { getRealTimeUsers } from '../../actions/user.actions';

const HomePage = (props) => {
   const dispatch = useDispatch() 




    useEffect(()=>{
          dispatch(getRealTimeUsers())
    }, [])
  return (
      <Layout>
    <section className="container">
    <div className="listOfUsers">

        <div className="displayName">
            <div className="displayPic">
                <img src="https://avatars1.githubusercontent.com/u/54733827?v=4" alt="Dp" />
            </div>
            <div style={{display: 'flex',flex: 1, justifyContent: 'space-between', margin: '0 10px'}}>
                <span style={{fontWeight: 500}}>Sai Charan</span>
                <span>online</span>
            </div>
        </div>
                
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