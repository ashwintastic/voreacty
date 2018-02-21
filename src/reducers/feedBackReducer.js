import {
  SEND_USER_FEEDBACK,
} from '../config/constants';
export default function (state = {}, action) {
  switch (action.type) {
    case SEND_USER_FEEDBACK: {
      return action.payload
    }
    /*  case FORGOT_PASSWORD_RESPONSE_FETCHED: {
     return Object.assign({},state,action.payload)
     }*/
  }
  return state
}

