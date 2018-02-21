import {
  SERVICES_HISTORY_FETCHING,
  SERVICES_HISTORY_FETCHED,
} from '../config/constants';

import callApi from '../helper/callapi'
export default function (data,prevHistory){
  return function (dispatch) {
    fetchServiceHistoryResponse(data).then(function (response) {
      dispatch(fetched(response,prevHistory))
    });
    dispatch(isFetching())
  }
}

function fetchServiceHistoryResponse(data){
  return callApi('getDetailedServiceHistory','post', data)
}

function fetched(response,prevHistory){
  return {
    type: SERVICES_HISTORY_FETCHED,
    //payload: response
    payload: Object.assign({},response,prevHistory)
  }
}

function isFetching(){
  return {
    type: SERVICES_HISTORY_FETCHING,
    payload:{}
  }
}