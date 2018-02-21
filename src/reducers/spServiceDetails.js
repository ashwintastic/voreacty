import {
  SP_SERVICE_FETCHED,
  SP_SSRVICE_FETCHING
} from '../config/constants'
export default function (state = {}, action){
  switch(action.type){
    case SP_SSRVICE_FETCHING: {
      return action.payload
    }
    case SP_SERVICE_FETCHED: {
      return action.payload
    }
  }
  return state
}