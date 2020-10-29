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