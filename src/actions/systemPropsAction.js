
import {
	SYSTEM_CONFIG_FETCHED,
	SYSTEM_CONFIG_FETCHING
} from '../config/constants'
import callApi from '../helper/callapi'


export default function (){
  return function (dispatch){
    fetchingSystemConfigResponse().then( function (response){
      dispatch(fetched(response))
    });
    dispatch(isFetching())
  }
}


function fetchingSystemConfigResponse(userInfo){
  return callApi('config/getConfig','get')
}


function fetched(response){
  //debugger;
  return {
    type: SYSTEM_CONFIG_FETCHED,
    payload: response
  }
}

function isFetching(){
  return {
    type: SYSTEM_CONFIG_FETCHING,
    payload: {},
    isFetching: true
  }
}


