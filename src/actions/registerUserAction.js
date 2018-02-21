/**
 * Created by root on 26/7/17.
 */
import {
  REGISTERING_USER_INFO_FETCHING,
       REGISTER_USER_INFO_FETCHED
} from '../config/constants'
import callApi from '../helper/callapi'

export default function (userInfo){
  return function (dispatch){
    fetchingRegistrationResponse(userInfo).then( function (response){
      dispatch(fetched(response))
    });
    dispatch(isFetching())
  }
}

function fetchingRegistrationResponse(userInfo){
  return callApi('auth/register','post',userInfo)
}


function fetched(response){
  return {
    type: REGISTER_USER_INFO_FETCHED,
    payload: response
  }
}

function isFetching(){
  return {
    type: REGISTERING_USER_INFO_FETCHING,
    payload: {},
    isFetching: true
  }
}