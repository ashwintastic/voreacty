import {
  SERVICE_IMAGE_SAVING,
  SERVICE_IMAGE_SAVED
} from '../config/constants';


export default function (state = {}, action){
  switch(action.type){
    case SERVICE_IMAGE_SAVING:{
      	return action.payload
    }
    case SERVICE_IMAGE_SAVED: {
      return action.payload
    }
  }
  return state
}