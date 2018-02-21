import {
	SYSTEM_CONFIG_FETCHED,
	SYSTEM_CONFIG_FETCHING
} from '../config/constants'


export default function (state = {}, action){
  switch(action.type){
    case SYSTEM_CONFIG_FETCHED: {
      return action.payload
    }
    case SYSTEM_CONFIG_FETCHING: {
      return action.payload
    }
  }
  return state
}