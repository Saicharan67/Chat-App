import { UserConstants } from "./constants"
import {firestore} from 'firebase'
export const getRealTimeUsers = (uid) => {
   
return async dispatch => {
    dispatch({
        type: `${UserConstants.GET_REAL_TIME_USERS}_REQUEST`
    });
    const db =firestore()
   const unsubscribe = db.collection("users")
   // .where("uid", "!=",uid)
    .onSnapshot((querySnapshot)=> {
        const  users = [];
        querySnapshot.forEach(function(doc) {
            if(doc.data().uid!= uid){
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
            // dispatch({
            //     type: UserConstants. GET_REALTIME_MESSAGES,
                
            // })
            console.log(data)
        })
        .catch(err=>{
            console.log(err)
        })
    }
}

export const getRealTimeConversations =(user)=> {
    return async dispatch => {
        const db =firestore()
        db.collection('conversation')
        .where('user_uid_1','in',[user.uid_1,user.uid_2])
        .orderBy('createdAt','asc')
        .onSnapshot((querySnapshot)=>{
            const conversations = []
            querySnapshot.forEach(doc=>{
                if(
                    (doc.data().user_uid_1 == user.uid_1 && doc.data().user_uid_2 == user.uid_2)
                    || 
                    (doc.data().user_uid_1 == user.uid_2 && doc.data().user_uid_2 == user.uid_1)
                ){
                    conversations.push(doc.data())
                }


                  
            })
            dispatch({
                type: UserConstants.GET_REALTIME_MESSAGES,
                payload: { conversations }
            })
            console.log(conversations)
        })    
    }

    
}