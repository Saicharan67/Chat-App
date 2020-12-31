// import React from 'react'
import Layout from '../../Components/layout'
import {firestore} from 'firebase'
import Modal from 'react-awesome-modal';
import { UserConstants } from "../../actions/constants"

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
import 'emoji-mart/css/emoji-mart.css'
import { Picker } from 'emoji-mart'
import React, { useEffect, useState } from 'react';
import './style.css';
import { useDispatch, useSelector } from 'react-redux';
import { getRealTimeConversations, getRealTimeUsers, updateMessage ,updateRealTimeView,getRealTimeNumberOfMessages} from '../../actions/user.actions';


const User = props => {
   const {user ,onClick, newmessages} = props;
   

  
return(
              <div onClick={(e)=>onClick(user,e)} key={user.uid} className="displayName">
                  <div className='item'>
                      {
                        
                       
                      newmessages?newmessages[user.uid]?<span className="notify-badge">{newmessages[user.uid]}</span> :'':''
                       
                      
                      
                        
                      }
                       <img className='Dp' src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTr3k-GgfticbNEipXYeXapEpiiawOSHjXfsQ&usqp=CAU" alt="Dp" />
                   </div>
                       
                   
                   <div className="displayPerson" style={{display: 'flex',flex: 1, justifyContent: 'space-between', margin: '0 10px',pointerEvents: 'none'}}>
                       <span style={{fontWeight: 500}}>{user.FirstName} {user.LastName}</span>
                       <span className={user.isOnline ? 'onlineStatus':'onlineStatus off' }>
                           {
                               user.isOnline? 
                               <i style={{color:'green'}} className="fa fa-dot-circle-o" aria-hidden="true"></i>:
                               <i style={{color:'red'}} className="fa fa-dot-circle-o" aria-hidden="true"></i>
                           }
                       </span>
                   </div>
               </div>
)
}
const HomePage = (props) => {
  const user = useSelector(state => state.user)
  
  const dispatch = useDispatch() 
  let unsubscribe;
  const auth = useSelector(state => state.auth)
  const newMessages = useSelector(state => state.user.newmessages)
  
  const [ChatStarted,setChatStarted] =useState(false)
  const [ChatUser,setChatUser] =useState('')
  const [message,setmessage] =useState('')
  const [UserUid,setUserUid] =useState('')
  const [view , setvisible]=useState(false)
  
  
  const openModal = () => {
      console.log('opened')
      setvisible(true)
  }
  const closeModal = () => {
   console.log('closed')
      setvisible(false)
  }
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
   useEffect(()=>{
   
    
        dispatch(getRealTimeNumberOfMessages(auth.uid))
       
   },[])
   
  
   const initChat = (talkingwith ,e) => {
          
           var chatHistory = document.getElementsByClassName("messageSections")[0];
         
           chatHistory.scrollTop = chatHistory.scrollHeight ;
           setChatStarted(true)
           setUserUid(talkingwith.uid)
           setChatUser( `${talkingwith.FirstName} ${talkingwith.LastName}`)         
            const nusers=document.getElementsByClassName('displayName')      
            for(let i = 0; i<nusers.length; i++ ){
               nusers[i].className='displayName'
              
            }
            e.target.className='displayName active'     
            //dispatch(getRealTimeConversations({uid_1: auth.uid, uid_2: talkingwith.uid  }))
            const db =firestore()
            db.collection('conversation')
             // .where('user_uid_1','in',[user.uid_1,user.uid_2])
              .orderBy('createdAt','asc')
              .onSnapshot((querySnapshot)=>{
                  const conversations = []
                  querySnapshot.forEach(doc=>{
                      if(
                          (doc.data().user_uid_1 ===auth.uid && doc.data().user_uid_2 === talkingwith.uid)
                          || 
                          (doc.data().user_uid_1 === talkingwith.uid && doc.data().user_uid_2 === auth.uid)
                      ){
                          conversations.push(doc.data())
                         
      
                      }
                      
                        
                  })
                 
                      //console.log(user.uid_1,user.uid_2)
                    
                  
                      const talking = talkingwith.uid
                     if(user.talkingwith=='' || talkingwith.uid == user.talkingwith){
                      dispatch({
                          type: UserConstants.GET_REALTIME_MESSAGES,
                          payload: { conversations , talking }
                      })
                     }
                 
      
                  console.log(conversations)
              })    
             
          
            dispatch(getRealTimeNumberOfMessages(auth.uid))            
            dispatch(updateRealTimeView({uid_1: auth.uid, uid_2: talkingwith.uid  }))
                
               
            
            console.log( auth.uid,talkingwith.uid)

           
       
       
        
   } 
   const addEmoji = e => {
       let emoji = e.native;
       setmessage(message+emoji)
       console.log(emoji)
   };
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
                <User onClick={initChat} key={user.uid} user={user} newmessages={newMessages}/>
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
               (ChatStarted && UserUid==user.talkingwith)?
               
               user.conversations.map((con,id)=>
                   <div key={id} className={con.user_uid_1===auth.uid? 'sent': 'received'}   style={{ textAlign: con.user_uid_1===auth.uid? 'right': 'left' , marginTop: id===0? '15px': '2px'}}>
                       
                        {/* <p className={con.user_uid_1==auth.uid ?'messagestyleright':'messagestyleleft'}>{con.message}</p> */}
                     
                     <p className={ con.user_uid_1===auth.uid ? id==0 || user.conversations[id-1].user_uid_1!==auth.uid?'messagestyleright': 'normalrightmessage': id==0 || user.conversations[id-1].user_uid_1===auth.uid?'messagestyleleft':'normalleftmessage'} >
                         {con.message} 
                     </p>
                    {con.user_uid_1===auth.uid?con.isView?
                    <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-check2-all" fill="blue" xmlns="http://www.w3.org/2000/svg">
                                  <path fillrule="evenodd" d="M12.354 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z"/>
                                  <path d="M6.25 8.043l-.896-.897a.5.5 0 1 0-.708.708l.897.896.707-.707zm1 2.414l.896.897a.5.5 0 0 0 .708 0l7-7a.5.5 0 0 0-.708-.708L8.5 10.293l-.543-.543-.707.707z"/>
                    </svg>
                    :
                    <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-check2-all" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                  <path fill-rule="evenodd" d="M12.354 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z"/>
                                  <path d="M6.25 8.043l-.896-.897a.5.5 0 1 0-.708.708l.897.896.707-.707zm1 2.414l.896.897a.5.5 0 0 0 .708 0l7-7a.5.5 0 0 0-.708-.708L8.5 10.293l-.543-.543-.707.707z"/>
                   </svg>:''}
                        
                  </div>
               )
               
               : <img className='startchat'
               src={require('../../assets/StartChat2.svg')}/>
           
          
           }
       </div>
       {   
           
           ChatStarted && UserUid==user.talkingwith?
           <div className="chatControls" >
               <div    > 
                   <i className='fi fa fa-smile-o fa-2x' onClick={()=>openModal()}>
                          
                            
                   </i>
                  
               </div>
               
               <div style={{width: '90%'  ,position:"relative",display:'flex',justifyContent:'center',alignItems:'center'}}>
              
                       <input         
                       className='textarea' value={message} placeholder='Enter Message..' onChange={(e)=> setmessage(e.target.value)}    
                       onKeyDown={(event)=>{
                           if(event.key==='Enter'){
                                   return submitMsg()                
                           }
                       }}></input>
              </div>

              
               <button className='SendButton' onClick={submitMsg}><i className='fa fa-send-o'></i></button>
           </div>: ""
       }
          <Modal
           effect="fadeInUp"
           onClickAway={() => closeModal()}
           visible={view}
           >
             <Picker onSelect={addEmoji}   />
           </Modal>
   </div>
</div>

</Layout>
 );
}

export default HomePage;