import {
  SERVICES_HISTORY_FETCHING,
  SERVICES_HISTORY_FETCHED
} from '../config/constants'
export default function (state = {}, action){
  switch(action.type){
    case SERVICES_HISTORY_FETCHING: {
      return action.payload
    }
    case SERVICES_HISTORY_FETCHED: {
      //return action.payload
      return Object.assign({},state,action.payload);
    }
  }
  return state
}