
import {
	PROFILE_IMAGE_FETCHED,
  PROFILE_IMAGE_FETCHING
} from '../config/constants';
import {API_SERVER_URL} from '../config/config'
import callApi from '../helper/callapi'
import axios from 'axios';

export default function (userInfo){
  return function (dispatch){
    if(userInfo['file']){
       let data = new FormData();
       data.append('file', userInfo['file']);
       data.append('userId',userInfo['userId']);
      data.append('save',userInfo['save']);
      let apiUrl = API_SERVER_URL+ 'saveProfileImage';
      axios.post(apiUrl, data).then( function (response){
        dispatch(fetched(response))
      });
      dispatch(isFetching())
    }
    else{
      fetchingProfileImageResponse(userInfo).then( function (response){
      dispatch(fetched(response))
    });
      dispatch(isFetching())
    }
  }
}


function fetchingProfileImageResponse(userInfo){
  return callApi('saveProfileImage','post',userInfo)
}


function fetched(response){
  //debugger;
  return {
    type: PROFILE_IMAGE_FETCHED,
    payload: response
  }
}


function isFetching(){
  return {
    type: PROFILE_IMAGE_FETCHING,
    payload: {},
    isFetching: true
  }
}


