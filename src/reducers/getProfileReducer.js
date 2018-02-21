import {
	PROFILE_DETAILS_FETCHED
} from '../config/constants'


export default function (state = {}, action){
  switch(action.type){
    case PROFILE_DETAILS_FETCHED: {
      return action.payload
    }
  }
  return state
}