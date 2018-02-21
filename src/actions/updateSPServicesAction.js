import {
  SERVICE_PROVIDER_SERVICES_UPDATING,
  SERVICE_PROVIDER_SERVICES_UPDATED,
  SHOWLOADINGBAR,
  RESETLOADINGBAR
} from '../config/constants';

import {showNotification} from './NotificationAction'

import callApi from '../helper/callapi'
export default function (data){
  return function (dispatch, store) {
    updatingSPInfo(data).then(function (response) {
    dispatch(showNotification({message: 'Service Details Updated'}, 'success'))
    dispatch(fetched(response))
    dispatch(hideSubmitLoader())
    });
    dispatch(isFetching())
  }
}

function updatingSPInfo(data){
  return callApi('service/edit','post', data)
}

function fetched(response){
  return {
    type: SERVICE_PROVIDER_SERVICES_UPDATED,
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

function hideSubmitLoader(){
  return {
    type: RESETLOADINGBAR,
    payload: {},
    isFetching: true
  }
}

// function upDateSpecificKey(store, response, data){
//   let prevStore = store().sPDashboardDetails;
//   console.log("prev store", prevStore);
//   console.log("response", response);
//   console.log("data", data);
//   if(!response.error) {
//    for(let i in prevStore){
//      if (i == 'data'){continue}
//      if (i == data.id){
//        let updatedStore = Object.assign({},prevStore[i],data);
//        console.log("updatedStore", updatedStore)
//        prevStore[i] = updatedStore
//       // console.log("newstore1", prevStore[i])
//        return prevStore;
//      }
//    }
//   }
// }