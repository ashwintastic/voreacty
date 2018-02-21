import {
  IS_TOKEN_VALID_FETCHING,
  IS_TOKEN_VALID_FETCHED,
} from '../config/constants';

import callApi from '../helper/callapi'
export default function (token){
  return function (dispatch) {
     isTokenValid(token).then(function (response) {
      dispatch(fetched(response))
    });
    dispatch(isFetching())
  }
}

function isTokenValid(token){
  return callApi('checkToken','post', {token})
}

function fetched(response){
  return {
    type: IS_TOKEN_VALID_FETCHED,
    payload: {istokenValid: response}
  }
}

function isFetching(){
  return {
    type: IS_TOKEN_VALID_FETCHING,
    payload:{}
  }
}