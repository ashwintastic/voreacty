/**
 * Created by root on 26/7/17.
 */
import {
    USER_LOGIN_FETCHING,
    USER_LOGGEDIN_INFO_FETCHED
} from '../config/constants'
import LocalStorage from '../helper/localStorage'

import callApi from '../helper/callapi'

export default function (userInfo){
  return function (dispatch){
    fetchingUserLoginResponse(userInfo).then( function (response){
      dispatch(fetched(response))
    });
    dispatch(isFetching())
  }
}

function fetchingUserLoginResponse(userInfo){
  return callApi('auth/login','post',userInfo)
}


function fetched(response){
  onSuccessFullLogin(response);
  return {
    type: USER_LOGGEDIN_INFO_FETCHED,
    payload: response
  }
}

function isFetching(){
  return {
    type: USER_LOGIN_FETCHING,
    payload: {}
  }
}

function onSuccessFullLogin(response){
  if (response.isUserLoggedIn === true) {
    LocalStorage.writeOnLocalStorage(response.token);
  }
}