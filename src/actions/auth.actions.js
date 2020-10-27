import {auth,firestore} from 'firebase'
import { authConstants } from './constants';
export const signup = (user) => {
    return async (dispatch)=>{
        const db =firestore();
        dispatch({type: `${authConstants.USER_LOGIN}_REQUEST`})
        auth()
        .createUserWithEmailAndPassword(user.email, user.password)
        .then(data => {
            console.log(user)
            const currentUser = auth().currentUser;
            const name =`${user.FirstName} ${user.LastName}`
            currentUser.updateProfile({
                displayName: name
            })
            .then(()=>{
               // console.log('updated')
               db.collection('users').add({
                   FirstName: user.FirstName,
                   LastName: user.LastName,
                   uid: data.user.uid,
                   createdAt: new Date()
               })
               .then(()=>{
                   const loggedInUser = {
                    FirstName: user.FirstName,
                    LastName: user.LastName,
                    uid: data.user.uid,
                    email: user.email
                   }
                localStorage.setItem('users' ,JSON.stringify({
                    loggedInUser
                }))
                console.log("Logged in succees")
                dispatch({
                    type: `${authConstants.USER_LOGIN}_SUCCESS`,
                    payload: {user: loggedInUser}
                })
               })
               .catch(err=>{
                console.log(err)
                dispatch({type:`${authConstants.USER_LOGIN}_FAILURE`,
            payload: {err} })
               })
           })
        })
        .catch(err=>alert(err))
    }
} 