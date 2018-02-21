/**
 * Created by root on 12/10/17.
 */
import {
  SP_REGISTRATION_RESPONSE_FETCHING,
  SP_REGISTRATION_RESPONSE_FETCHED
} from '../config/constants'

export default function (state = {}, action){
  switch(action.type){
    case SP_REGISTRATION_RESPONSE_FETCHING: {
      return action.payload
    }
    case SP_REGISTRATION_RESPONSE_FETCHED: {
      return action.payload
    }
  }
  return state
}