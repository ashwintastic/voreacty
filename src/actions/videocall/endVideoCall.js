import {
	END_VIDEO_CALL
}
	from '../../config/constants'

import callApi from '../../helper/callapi'

export default function endVideoCall(callRequestInfo){
	return function (dispatch){
		endVideoCallAPI(callRequestInfo).then( function (response){
			dispatch(fetched(response))
		});
		//dispatch(isFetching())
	}
}

// function isFetching(){
//   return {
//     type: END_VIDEO_CALL_FETCHING,
//     payload:{}
//   }
// }

function endVideoCallAPI(callRequestInfo){
	//return callApi('video/getvideotoken','get')
	//alert("callRequestInfo => "+JSON.stringify(callRequestInfo))
	return callApi('video/updatecallstatus','post',callRequestInfo)
}

function fetched(res){
	//alert('fetched');
	return {
	    type: END_VIDEO_CALL,
	    payload: {}
  	}
}
