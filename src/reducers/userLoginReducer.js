import {
  USER_LOGIN_FETCHING,
  USER_LOGGEDIN_INFO_FETCHED,
  IS_USER_LOGGED_IN_STATUS_FETCHING,
  IS_USER_LOGGED_IN_STATUS_FETCHED,
  USER_LOGOUT,
  SET_STORE_IF_TOKEN_IS_ABSENT,
  SET_STORE_IF_TOKEN_IS_RECEIVED_VIA_OAUTH2
} from '../config/constants';

export default function (state = {}, action){
  switch(action.type){
    case USER_LOGIN_FETCHING:{
      return Object.assign({},state,action.payload)
    }
    case USER_LOGGEDIN_INFO_FETCHED: {
      return action.payload
    }
    case IS_USER_LOGGED_IN_STATUS_FETCHING:{
      return Object.assign({},state,action.payload)
    }
    case IS_USER_LOGGED_IN_STATUS_FETCHED:{
      if (action.payload.error === true) {
        return action.payload
      }
      return Object.assign({},state,action.payload)
    }
    case USER_LOGOUT: {
      return action.payload
    }
    case SET_STORE_IF_TOKEN_IS_ABSENT:{
      return action.payload
    }
    case SET_STORE_IF_TOKEN_IS_RECEIVED_VIA_OAUTH2:{
      return action.payload
    }
  }
  return state
}