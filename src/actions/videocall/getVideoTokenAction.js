import {
	GET_VIDEO_TOKEN_FETCHING,
	GET_VIDEO_TOKEN_FETCHED
	}
	from '../../config/constants'

import callApi from '../../helper/callapi'

export default function getVideoToken(callRequestInfo){
	return function (dispatch){
		getVideoCallTokenRequest(callRequestInfo).then( function (response){
			dispatch(setVideoToken(response))
		});
		dispatch(isFetching())
	}
}


function isFetching(){
  return {
    type: GET_VIDEO_TOKEN_FETCHING,
    payload:{}
  }
}

function getVideoCallTokenRequest(callRequestInfo){
	//return callApi('video/getvideotoken','get')
	return callApi('video/getvideotoken','post',callRequestInfo)
}

function setVideoToken(token){
	return {
	    type: GET_VIDEO_TOKEN_FETCHED,
	    payload: token
  	}
}
