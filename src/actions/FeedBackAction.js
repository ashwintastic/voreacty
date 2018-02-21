import {
  SEND_USER_FEEDBACK,
} from '../config/constants';

import callApi from '../helper/callapi'


export  function userFeedBackAction (data){
  return function (dispatch) {
    sendUserFeedBack(data).then(function (response) {
      dispatch(fetched(response))
    });
  }
}

export  function spFeedBackAction (data){
  return function (dispatch) {
    sendSPFeedBack(data).then(function (response) {
      dispatch(fetched(response))
    });
  }
}


function sendUserFeedBack(data){
  return callApi('feedback/user','post', data)
}

function sendSPFeedBack(data){
  return callApi('feedback/sp','post', data)
}

function fetched(response){
  return {
    type: SEND_USER_FEEDBACK,
    payload: response
  }
}
