import { UserConstants } from "../actions/constants"

const initstate ={
    users:[],
    talkingwith:'',
    conversations: []
}


export default (state = initstate,action) => {
  switch(action.type){
    case `${UserConstants.GET_REAL_TIME_USERS}_REQUEST`:
        break
    case `${UserConstants.GET_REAL_TIME_USERS}_SUCCESS`:
        state={
            ...state,
            users: action.payload.users
        }
        break
    case UserConstants.GET_REALTIME_MESSAGES:
       
       
            state={
                ...state,
                conversations: action.payload.conversations,
                talkingwith:action.payload.talkingwith
               
            }
       
        break
    case UserConstants.GET_REALTIME_NEW_MESSAGES:
       
        state={
            ...state,
            newmessages: action.payload.messages,
           
        }
        break
   
    

  }
    return state
}

