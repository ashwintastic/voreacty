import {
  SERVICE_APPROVING,
  SERVICE_APPROVED
} from '../config/constants';


export default function (state = {}, action){
  switch(action.type){
    case SERVICE_APPROVING:{
      	return action.payload
    }
    case SERVICE_APPROVED: {
      return action.payload
    }
  }
  return state
}