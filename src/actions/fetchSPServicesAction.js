import {
  SERVICE_PROVIDER_SERVICES_FETCHING,
  SERVICE_PROVIDER_SERVICES_FETCHED,
} from '../config/constants';

import callApi from '../helper/callapi'
export default function (spId){
  return function (dispatch) {
    fetchforgotPasswordResponse(spId).then(function (response) {
      dispatch(fetched(response))
    });
    dispatch(isFetching())
  }
}

function fetchforgotPasswordResponse(spId){
  return callApi('dashboard','post', {userId: spId})
}

function fetched(response){
  return {
    type: SERVICE_PROVIDER_SERVICES_FETCHED,
    payload: response
  }
}

function isFetching(){
  return {
    type: SERVICE_PROVIDER_SERVICES_FETCHING,
    payload:{}
  }
}