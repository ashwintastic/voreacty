import {
  SERVICE_BACKGROUND_SAVING,
  SERVICE_BACKGROUND_SAVED
} from '../config/constants';


export default function (state = {}, action){
  switch(action.type){
    case SERVICE_BACKGROUND_SAVING:{
      	return action.payload
    }
    case SERVICE_BACKGROUND_SAVED: {
      return action.payload
    }
  }
  return state
}