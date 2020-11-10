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
import React, { useEffect, useState } from 'react';
import './style.css';
import { useDispatch, useSelector } from 'react-redux';
import { getRealTimeConversations, getRealTimeUsers, updateMessage } from '../../actions/user.actions';
const User = props => {
    const {user ,onClick} = props;
return(
               <div onClick={()=>onClick(user)} key={user.uid} className="displayName">
                       
                        <img className='Dp' src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTr3k-GgfticbNEipXYeXapEpiiawOSHjXfsQ&usqp=CAU" alt="Dp" />
                        {/* <img className='Dp' src="https://pikmail.herokuapp.com/mahankalisaicharan@gmail.com?size=50" alt="Profile Picture"></img> */}
                    
                    <div className="displayPerson" style={{display: 'flex',flex: 1, justifyContent: 'space-between', margin: '0 10px'}}>
                        <span style={{fontWeight: 500}}>{user.FirstName} {user.LastName}</span>
                        <span className={user.isOnline ? 'onlineStatus':'onlineStatus off' }>
                            {
                                user.isOnline? 
                                <i style={{color:'green'}} class="fa fa-dot-circle-o" aria-hidden="true"></i>:
                                <i style={{color:'red'}} class="fa fa-dot-circle-o" aria-hidden="true"></i>
                            }
                        </span>
                    </div>
                </div>
)
}
const HomePage = (props) => {
   const dispatch = useDispatch() 
   let unsubscribe;
   const auth = useSelector(state => state.auth)
   const user = useSelector(state => state.user)
   const [ChatStarted,setChatStarted] =useState(false)
   const [ChatUser,setChatUser] =useState('')
   const [message,setmessage] =useState('')
   const [UserUid,setUserUid] =useState('')
   

    useEffect(()=>{
       unsubscribe =  dispatch(getRealTimeUsers(auth.uid))
          .then((unsubscribe)=>{
             return unsubscribe
          })
          .catch((err)=>{
              console.log(err)
          })

       
    }, [])

    useEffect(()=>{
        return ()=>{
            unsubscribe.then(f=>f()).catch(err=>console.log(err))
        }
    },[])

    const initChat = (talkingwith) => {
            
             setChatStarted(true)
             setUserUid(talkingwith.uid)
             setChatUser( `${talkingwith.FirstName} ${talkingwith.LastName}`)
          
             dispatch(getRealTimeConversations({uid_1: auth.uid, uid_2: talkingwith.uid  }))
         
    } 
    const submitMsg = () => {
        
        var chatHistory = document.getElementsByClassName("messageSections")[0];
        
       
       
        chatHistory.scrollTop = chatHistory.scrollHeight ;
       
         const msgObj ={
             user_uid_1: auth.uid,
             user_uid_2: UserUid,
             message
         }
         if(message!==''){
             dispatch(updateMessage(msgObj))
             .then(()=>{
               setmessage('')
             })
         }
         
    }
  return (
      <Layout>
          
    <div className="container">
    <div className="listOfUsers">
       {
           user.users.length > 0 ? 
           user.users.map(user => {
               return(
                 <User onClick={initChat} key={user.uid} user={user}/>
               )
           })
           : null
       }
                
    </div>
    <div className="chatArea">
      
          
        <div className="chatHeader">
               {
                   ChatStarted?
                   ChatUser: 'Start Chating By Clicking On Users'
                   
               }
        </div>
       
        <div className="messageSections">
            {
                ChatStarted?
                
                user.conversations.map((con,id)=>
                    <div key={id} className={con.user_uid_1==auth.uid? 'sent': 'received'}   style={{ textAlign: con.user_uid_1==auth.uid? 'right': 'left' , marginTop: id==0? '15px': '2px'}}>
                        
            {/* <p className={con.user_uid_1==auth.uid ?'messagestyleright':'messagestyleleft'}>{con.message}</p> */}
                      <p className={con.user_uid_1==auth.uid ? id==0 || user.conversations[id-1].user_uid_1!=auth.uid?'messagestyleright': 'normalrightmessage': id==0 || user.conversations[id-1].user_uid_1==auth.uid?'messagestyleleft':'normalleftmessage' } >{con.message}</p>
                   </div>
                )
                
                : <img className='startchat'
                src={require('../../assets/StartChat2.svg')}/>
            
           
            }
        </div>
        {
            ChatStarted?
            <div className="chatControls">
                <div style={{width: '90%'  ,position:"relative",display:'flex',justifyContent:'center',alignItems:'center'}}>
               <input         
               className='textarea' value={message} placeholder='Enter Message..' onChange={(e)=> setmessage(e.target.value)}    
               onKeyDown={(event)=>{
                   if(event.key=='Enter'){
                        return submitMsg()                
                   }
               }}></input>
               </div>

               
                <button className='SendButton' onClick={submitMsg}><i className='fa fa-send-o'></i></button>
            </div>: null
        }
    </div>
</div>

</Layout>
  );
}

export default HomePage;