import {
  SP_REGISTRATION_RESPONSE_FETCHING,
  SP_REGISTRATION_RESPONSE_FETCHED,
  SHOWLOADINGBAR,
  RESETLOADINGBAR
} from '../config/constants'

import axios from 'axios';
import {API_SERVER_URL} from '../config/config'
import {showNotification} from './NotificationAction'

export function sendSpDataForApproval (data){
  return function (dispatch){
    postSpData(data).then( function (response){
      if(data.hasOwnProperty('isEdit')){
        dispatch(showNotification({message: 'Service Details Updated'}, 'success'))
        }
      dispatch(fetched(response))
      dispatch(hideSubmitLoader())
    }).catch(
       (reason) => {
            dispatch(hideSubmitLoader())
        });
    dispatch(isFetchingResponse())
  }
}

function postSpData(data){
  if(data.hasOwnProperty('clear')){

    let promise = new Promise(function(resolve, reject) {
        let result = {};
        resolve(result);
    });
    return promise;
  }
  else{
    let fdata = new FormData();
    fdata.append('spData', JSON.stringify(data) );
    fdata.append('spImage', data['spImage'] );
    console.log("image sent for service provider registration", fdata.get('spImage'));
    console.log("data sent for service provider registration", JSON.stringify(data));
    let apiUrl = API_SERVER_URL+ 'sp';
    return axios.post(apiUrl, fdata);
  }
}

function fetched(response){
  //debugger;
  return {
    type: SP_REGISTRATION_RESPONSE_FETCHED,
    payload: response
  }
}

function isFetchingResponse(){
  return {
    type: SHOWLOADINGBAR,
    payload: {},
    isFetching: true
  }
}

function hideSubmitLoader(){
  return {
    type: RESETLOADINGBAR,
    payload: {},
    isFetching: true
  }
}



