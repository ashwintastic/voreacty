/**
 * Created by root on 7/8/17.
 */
import {
  SERVICE_PROVIDER_DETAILS_FETCHING,
  SERVICE_PROVIDER_DETAILS_FETCHED
} from '../config/constants';
import callApi from '../helper/callapi'

export default function (spId){
  return function (dispatch){

    fetchingServiceProviderDetails(spId).then( function (response){
      dispatch(fetched(response))
    });
    dispatch(isFetching())
  }
}

function fetchingServiceProviderDetails(spId){
   //return userData
   //return callApi('http://localhost:4000/just_for_data','get', spId, true)
   return callApi('service/'+spId,'get')
}


function fetched(response){
  return {
    type: SERVICE_PROVIDER_DETAILS_FETCHED,
    payload: response
  }
}

function isFetching(){
  return {
    type: SERVICE_PROVIDER_DETAILS_FETCHING,
    payload: {},
    isFetching: true
  }
}