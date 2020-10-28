import { UserConstants } from "./constants"
import {firestore} from 'firebase'
export const getRealTimeUsers = () => {
   
return async dispatch => {
    dispatch({
        type: `${UserConstants.GET_REAL_TIME_USERS}_REQUEST`
    });
    const db =firestore()
    db.collection("users")
  //  .where()
    .onSnapshot((querySnapshot)=> {
        const  users = [];
        querySnapshot.forEach(function(doc) {
           users.push(doc.data());
        });
       // console.log(users);
       dispatch({
           type: `${UserConstants.GET_REAL_TIME_USERS}_SUCCESS`,
           payload: 
       })
    });
}
}