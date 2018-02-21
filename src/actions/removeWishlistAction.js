import {
  WISHLIST_DELETING,
  WISHLIST_DELETED,
  SHOWLOADINGBAR,
  RESETLOADINGBAR
} from '../config/constants';

import {showNotification} from './NotificationAction'

import callApi from '../helper/callapi'
export default function (data){
  return function (dispatch, store) {
    addToWishlist(data).then(function (response) {
    if(!data.hasOwnProperty('clear')){
      dispatch(showNotification({message: 'Service Removed from favourites'}, 'success'))
    }
    dispatch(fetched(response))
    dispatch(hideSubmitLoader())
    });
    dispatch(isFetching())
  }
}

function addToWishlist(data){
  if(data.hasOwnProperty('clear')){

    let promise = new Promise(function(resolve, reject) {
        let result = {};
        resolve(result);
    });
    return promise;
  }
  else{
    return callApi('wishlist/delete','post', data)
  }
}

function fetched(response){
  return {
    type: WISHLIST_DELETED,
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