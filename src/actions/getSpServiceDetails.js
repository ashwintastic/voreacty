import {
  SP_SERVICE_FETCHED,
  SP_SSRVICE_FETCHING
} from '../config/constants'

import callApi from '../helper/callapi'

export function getSpServiceDetails (data){
  return function (dispatch){
    getserviceDtails(data).then( function (response){
      dispatch(fetched(response))
    });
    dispatch(isFetchingResponse())
  }
}

function getserviceDtails(serviceId){
  return callApi("sp/"+serviceId,'post', serviceId);
}

function fetched(response){
  return {
    type: SP_SERVICE_FETCHED,
    payload: response
  }
}

function isFetchingResponse(){
  return {
    type: SP_SSRVICE_FETCHING,
    payload: {},
    isFetching: true
  }
}



