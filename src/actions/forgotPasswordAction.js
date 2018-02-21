/**
 * Created by root on 5/9/17.
 */
import {
  FORGOT_PASSWORD_RESPONSE_FETCHING,
  FORGOT_PASSWORD_RESPONSE_FETCHED,
} from '../config/constants';

import callApi from '../helper/callapi'
export default function (email){
  return function (dispatch) {
    fetchforgotPasswordResponse(email).then(function (response) {
      dispatch(fetched(response))
    });
    dispatch(isFetching())
  }
}

function fetchforgotPasswordResponse(email){
  return callApi('checkEmail','post', {email})
}

function fetched(response){
  return {
    type: FORGOT_PASSWORD_RESPONSE_FETCHED,
    payload: response
  }
}

function isFetching(){
  return {
    type: FORGOT_PASSWORD_RESPONSE_FETCHING,
    payload:{}
  }
}