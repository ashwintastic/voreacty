import {
  REGISTERING_USER_INFO_FETCHING,
  REGISTER_USER_INFO_FETCHED
} from '../config/constants';


export default function (state = {}, action){
  switch(action.type){
    case REGISTERING_USER_INFO_FETCHING:{
      	return action.payload
    }
    case REGISTER_USER_INFO_FETCHED: {
      return action.payload
    }
  }
  return state
}