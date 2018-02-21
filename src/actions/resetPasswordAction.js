/**
 * Created by root on 5/9/17.
 */
import {
  RESET_PASSWORD_RESPONSE_FETCHING,
  RESET_PASSWORD_RESPONSE_FETCHED,
} from '../config/constants';

import callApi from '../helper/callapi'
export default function (data){
  return function (dispatch) {
    fetchResetPasswordResponse(data).then(function (response) {
      dispatch(fetched(response))
    });
    dispatch(isFetching())
  }
}

function fetchResetPasswordResponse(data){
  return callApi('resetPassword','post', data)
}

function fetched(response){
  return {
    type: RESET_PASSWORD_RESPONSE_FETCHED,
    payload: {resetpassword: response}
  }
}

function isFetching(){
  return {
    type: RESET_PASSWORD_RESPONSE_FETCHING,
    payload:{}
  }
}