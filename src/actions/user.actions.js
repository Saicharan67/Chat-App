import { UserConstants } from "./constants"
import {firestore} from 'firebase'
export const getRealTimeUsers = (uid) => {
   
return async dispatch => {
    dispatch({
        type: `${UserConstants.GET_REAL_TIME_USERS}_REQUEST`
    });
    const db =firestore()
   const unsubscribe = db.collection("users")
    .onSnapshot((querySnapshot)=> {
        const  users = [];
        querySnapshot.forEach(function(doc) {
            if(doc.data().uid !== uid){
                users.push(doc.data());
            }
         
        });
         console.log(users);
       dispatch({
           type: `${UserConstants.GET_REAL_TIME_USERS}_SUCCESS`,
           payload: {users}
       })
    });
    return unsubscribe;
}
}





export const getRealTimeConversations =(user)=> {
    return async dispatch => {
        const db =firestore()
        db.collection('conversation')
       // .where('user_uid_1','in',[user.uid_1,user.uid_2])
        .orderBy('createdAt','asc')
        .onSnapshot((querySnapshot)=>{
            const conversations = []
            querySnapshot.forEach(doc=>{
                if(
                    (doc.data().user_uid_1 === user.uid_1 && doc.data().user_uid_2 === user.uid_2)
                    || 
                    (doc.data().user_uid_1 === user.uid_2 && doc.data().user_uid_2 === user.uid_1)
                ){
                    conversations.push(doc.data())
                   

                }
                
                  
            })
           
                console.log(user.uid_1,user.uid_2)
            dispatch({
                type: UserConstants.GET_REALTIME_MESSAGES,
                payload: { conversations }
            })
            console.log(conversations)
        })    
        
    }

    
}
export const getRealTimeNumberOfMessages = (uid) => {
   
    return async dispatch => {
        const db =firestore()
       
        
            
            db.collection('conversation')
           .where('isView','==', false)
           .onSnapshot((querySnapshot)=>{
            const newMessages={}
            querySnapshot.forEach(doc=>{
               
               if( doc.data().user_uid_2===uid ){
                             
                               newMessages[doc.data().user_uid_1] = newMessages[doc.data().user_uid_1]?newMessages[doc.data().user_uid_1]+1:1
                            
               }                 
            })
            //console.log(newMessages)
            const messages = newMessages
            dispatch({
                type: UserConstants.GET_REALTIME_NEW_MESSAGES,
                payload: {messages}
            })
          
         
        })    
        
        
       
       
        
       
}
}
export const UpdateRealTimeView = (u) => {
    return async () => {
        const db = firestore()
        db.collection('conversation')
        .where('isView','==', false)
        .where('user_uid_2','==',u.uid_1)
        .where('user_uid_1','==',u.uid_2)
        .onSnapshot((querySnapshot)=>{
         
            querySnapshot.forEach(doc=>{
              
                  
                    db.collection('conversation')
                    .doc(doc.id)
                    .update({
                        isView: true
                    })
                    .then(()=>{
                        console.log('isViewed')
                    })
                    .catch(()=>{
                        console.log('NotViewed')
                    })
                   
                   
                
                //console.log('view updated',doc.data().user_uid_1,doc.data().user_uid_2)

                
                  
            })
            
        })    
        
        
       
}
}
export const updateMessage = (msgObj) => {
    return async dispatch => {
        const db =firestore();
        db.collection('conversation')
        .add({
            ...msgObj,
            isView: false,
            createdAt: new Date()
        })
        .then((data)=>{
           
            console.log(data,'msg updated')
        })
        .catch(err=>{
            console.log(err)
        })
    }
}