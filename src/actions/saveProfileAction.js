
import {
	PROFILE_DETAILS_FETCHED,
  PROFILE_DETAILS_FETCHING
} from '../config/constants'
import callApi from '../helper/callapi'
import {showNotification} from './NotificationAction'


export default function (userInfo){
  return function (dispatch){
    fetchingProfileResponse(userInfo).then( function (response){
      dispatch(showNotification({message: 'Profile Updated'}, 'success'))
      dispatch(fetched(response))
    });
    dispatch(isFetching())
  }
}


function fetchingProfileResponse(userInfo){
  return callApi('saveProfileData','post',userInfo)
}


function fetched(response){
  //debugger;
  return {
    type: PROFILE_DETAILS_FETCHED,
    payload: response
  }
}


function isFetching(){
  return {
    type: PROFILE_DETAILS_FETCHING,
    payload: {},
    isFetching: true
  }
}


