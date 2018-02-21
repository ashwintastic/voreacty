
import {
	SERVICE_APPROVED,
  SERVICE_APPROVING,
  SHOWLOADINGBAR,
  RESETLOADINGBAR
} from '../config/constants'
import callApi from '../helper/callapi'
import {showNotification} from './NotificationAction'

export default function (servInfo){
  return function (dispatch){
    fetchingApproveServiceResponse(servInfo).then( function (response){

      dispatch(showNotification({message: 'Service Approved'}, 'success'))
      dispatch(fetched(response))
      dispatch(hideLoader())
    }).catch(
       (reason) => {
            dispatch(hideLoader())
        });
  
    dispatch(isFetching())
  }
}


function fetchingApproveServiceResponse(servInfo){
  return callApi('updateServiceStatus','post',servInfo)
}


function fetched(response){
  //debugger;
  return {
    type: SERVICE_APPROVED,
    payload: response
  }
}


function isFetching(){
  return {
    type: SHOWLOADINGBAR,
    payload: {},
    isFetching: true
  }
}

function hideLoader(){
  return {
    type: RESETLOADINGBAR,
    payload: {},
    isFetching: true
  }
}


