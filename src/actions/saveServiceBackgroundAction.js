
import {
	SERVICE_BACKGROUND_SAVED,
  SERVICE_BACKGROUND_SAVING
} from '../config/constants';
import {API_SERVER_URL} from '../config/config'
import callApi from '../helper/callapi'
import axios from 'axios';

export default function (userInfo){
  return function (dispatch){
    
    let data = new FormData();
    data.append('file', userInfo['file']);
    data.append('serviceId',userInfo['serviceId']);
    data.append('background',true);
    let apiUrl = API_SERVER_URL+ 'saveServiceImage';
    axios.post(apiUrl, data).then( function (response){
      dispatch(fetched(response))
    });
    dispatch(isFetching())
  }
}


function fetchingProfileImageResponse(userInfo){
  return callApi('saveServiceImage','post',userInfo)
}


function fetched(response){
  return {
    type: SERVICE_BACKGROUND_SAVING,
    payload: response
  }
}


function isFetching(){
  return {
    type: SERVICE_BACKGROUND_SAVED,
    payload: {},
    isFetching: true
  }
}


