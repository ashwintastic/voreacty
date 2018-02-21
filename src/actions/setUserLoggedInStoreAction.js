/**
 * Created by root on 17/8/17.
 */
import {
  SET_STORE_IF_TOKEN_IS_RECEIVED_VIA_OAUTH2
} from '../config/constants';

export function setUserLoggedInstore (){
    return function (dispatch) {
        dispatch(setUserLoginResponseStore())
    }
  }

 function setUserLoginResponseStore(){
  return {
    type: SET_STORE_IF_TOKEN_IS_RECEIVED_VIA_OAUTH2,
    payload: {
      isUserLoggedIn: true
    }
  }
 }