import {
  FORGOT_PASSWORD_RESPONSE_FETCHING,
  FORGOT_PASSWORD_RESPONSE_FETCHED,
} from '../config/constants';

export default function (state = {}, action){
  switch(action.type){
    case FORGOT_PASSWORD_RESPONSE_FETCHING:{
      return Object.assign({},state,action.payload)
    }
    case FORGOT_PASSWORD_RESPONSE_FETCHED: {
      return Object.assign({},state,action.payload)
    }
  }
  return state
}