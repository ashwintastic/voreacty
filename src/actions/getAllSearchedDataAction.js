/**
 * Created by root on 31/8/17.
 */
import {
  GET_ALL_SEARCHED_DATA_FETCHING,
  GET_ALL_SEARCHED_DATA_FETCHED,
} from '../config/constants';

import callApi from '../helper/callapi'
export default function (data){
  return function (dispatch) {
    fetchAllSearchedData(data).then(function (response) {
      dispatch(fetched(response))
    });
    dispatch(isFetching())
  }
}

function fetchAllSearchedData(data){
  return callApi('searchList','post', data)
}

function fetched(response){
  return {
    type: GET_ALL_SEARCHED_DATA_FETCHED,
    payload: response
  }
}

function isFetching(){
  return {
    type: GET_ALL_SEARCHED_DATA_FETCHING,
    payload:{}
  }
}