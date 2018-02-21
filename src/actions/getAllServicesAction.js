/**
 * Created by root on 18/8/17.
 */
/**
 * Created by root on 26/7/17.
 */
import {
  GET_ALL_SERVIVES_FETCHING,
  GET_ALL_SERVIVES_FETCHED,
  GET_ALL_SERVIVES_FETCHED_WITHOUT_CATAGORY
} from '../config/constants';

import callApi from '../helper/callapi'
export default function (param = null){
  if(param == null) {
    return function (dispatch) {
      fetchAllServices().then(function (response) {
        dispatch(fetchedWithCatForCarousel(response))
      });
      dispatch(isFetching())
    }
  }
  else{
    return function (dispatch) {
      fetchAllServices(param).then(function (response) {
        dispatch(fetchedWithoutCat(response))
      });
      dispatch(isFetching())
    }
  }
}

function fetchAllServices(param= null){
  if(param != null){
    return callApi('services','post', param)  
  }
  return callApi('services','post', {cat: param})
}

function fetchedWithCatForCarousel(response){
  return {
    type: GET_ALL_SERVIVES_FETCHED,
    payload: {allsevicesWithCat: response}
  }
}


function fetchedWithoutCat(response){
  return {
    type: GET_ALL_SERVIVES_FETCHED_WITHOUT_CATAGORY,
    payload: {allsevicesWithoutCat: response}
  }
}

function isFetching(){
  return {
    type: GET_ALL_SERVIVES_FETCHING,
    payload:{}
  }
}