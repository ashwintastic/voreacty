import {
  RESET_PASSWORD_RESPONSE_FETCHING,
  RESET_PASSWORD_RESPONSE_FETCHED,
  IS_TOKEN_VALID_FETCHING,
  IS_TOKEN_VALID_FETCHED
} from '../config/constants';

export default function (state = {}, action){
  switch(action.type){
    case RESET_PASSWORD_RESPONSE_FETCHING:{
      return Object.assign({},state,action.payload)
    }
    case RESET_PASSWORD_RESPONSE_FETCHED: {
      return Object.assign({},state,action.payload)
    }
    case IS_TOKEN_VALID_FETCHING: {
      return Object.assign({},state,action.payload)
    }
    case IS_TOKEN_VALID_FETCHED: {
      return Object.assign({},state,action.payload)
    }
  }
  return state
}