import {auth,firestore} from 'firebase'
import { authConstants } from './constants';
export const signup = (user) => {
    return async (dispatch)=>{
        const db =firestore();
        dispatch({type: `${authConstants.USER_LOGIN}_REQUEST`})
        auth()
        .createUserWithEmailAndPassword(user.email, user.password)
        .then(data => {
           
            const currentUser = auth().currentUser;
            const name =`${user.FirstName} ${user.LastName}`
            currentUser.updateProfile({
                displayName: name
               
            })
            
            .then(()=>{
                console.log(data)
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
                console.log("Signe Up  success")
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
export const signin = (user)=> {
    return async dispatch => {
        dispatch({type: `${authConstants.USER_LOGIN}_REQUEST`})
        auth()
        .signInWithEmailAndPassword(user.email,user.password)
        .then((data)=>{
              console.log("SignIn Data",data)
              const name = data.user.displayName.split(" ");
              const FirstName = name[0]
              const LastName = name[1]
              const loggedInUser = {
                FirstName,
                LastName,
                uid: data.user.uid,
                email: data.user.email
               }
               localStorage.setItem('users',JSON.stringify(loggedInUser))
              dispatch({
                  type: `${authConstants.USER_LOGIN}_SUCCESS`,
                  payload: {user: loggedInUser}
              })
              console.log("Logged In successfully")
        })
        .catch((err)=>{
            console.log(err)
            dispatch({
                type: `${authConstants.USER_LOGIN}_FAILURE`,
                payload: {err}
            })
        })
    }
}
export const isLoggedInUser = () => {
    return async dispatch => {
      const user =   localStorage.getItem('users') ? JSON.parse(localStorage.getItem('users')) : null
    
    if(user){
        dispatch({
            type: `${authConstants.USER_LOGIN}_SUCCESS`,
            payload: {user: user}
        })
    }
    else{
        dispatch({
            type: `${authConstants.USER_LOGIN}_FAILURE`,
            payload: {err: 'Login Again Please'}
        })
    }
}
}