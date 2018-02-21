import {
  PROFILE_IMAGE_FETCHING,
  PROFILE_IMAGE_FETCHED
} from '../config/constants';


export default function (state = {}, action){
  switch(action.type){
    case PROFILE_IMAGE_FETCHING:{
      	return action.payload
    }
    case PROFILE_IMAGE_FETCHED: {
      return action.payload
    }
  }
  return state
}