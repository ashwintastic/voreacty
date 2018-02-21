/**
 * Created by root on 26/7/17.
 */
import {
       IS_USER_LOGGED_IN_STATUS_FETCHING,
       IS_USER_LOGGED_IN_STATUS_FETCHED,
       SET_STORE_IF_TOKEN_IS_ABSENT
     } from '../config/constants';
import callApi from '../helper/callapi'
import LocalStorage from '../helper/localStorage';
export default function (){
    if(handleClientSide()) {
      return function (dispatch) {
        checkUserLoggedInStatus().then(function (response) {
          dispatch(fetched(response))
        });
        dispatch(isFetching())
      }
    }
    else{
      return function (dispatch){
        dispatch(handleStoreAtClientSide())
      }
    }
}

function checkUserLoggedInStatus(){
  return callApi('auth/isloggedin','get', {})
}

function fetched(response){
  return {
    type: IS_USER_LOGGED_IN_STATUS_FETCHED,
    payload: response
  }
}

function isFetching(){
  return {
    type: IS_USER_LOGGED_IN_STATUS_FETCHING,
    payload: false
  }
}

function handleStoreAtClientSide(){
  return {
    type: SET_STORE_IF_TOKEN_IS_ABSENT,
    payload: {
      error: true,
      reason: 'tokenAbsent'
    }
  }
}

function handleClientSide(){
  let existingToken = LocalStorage.readFromLocalStorage('accessToken');
  if (existingToken == null){
    return false
  }
  return true;
}