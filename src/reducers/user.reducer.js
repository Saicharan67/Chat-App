import { UserConstants } from "../actions/constants"

const initstate ={
    users:[]
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

    }
}