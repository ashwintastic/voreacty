
import {
	PROFILE_DETAILS_FETCHED,
} from '../config/constants'
import callApi from '../helper/callapi'


export default function (userInfo){
  return function (dispatch){
    fetchingProfileResponse(userInfo).then( function (response){
      dispatch(fetched(response))
    });
  }
}


function fetchingProfileResponse(userInfo){
  return callApi('getProfileData','post',userInfo)
}


function fetched(response){
  //debugger;
  return {
    type: PROFILE_DETAILS_FETCHED,
    payload: response
  }
}



