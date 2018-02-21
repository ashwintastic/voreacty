import {
  SHOW_NOTIFICATION,
  SHOW_ERROR_NOTIFICATION
} from '../config/constants';


export default function (state = {}, action){
  switch(action.type){
    case SHOW_NOTIFICATION: {
      return action.payload
    }
  }
  return state
}