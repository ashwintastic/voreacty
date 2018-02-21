/**
 * Created by root on 8/8/17.
 */
import {
  PAYMENT_RESPONSE_FETCHING,
  PAYMENT_RESPONSE_FETCHED
} from '../config/constants'

import callApi from '../helper/callapi'

export default function makePaymentAction(paymentInfo){
  return function(dispatch){
    console.log("makePaymentAPI Call")
    makePaymentAPI(paymentInfo).then( function (response){
      console.log("makePaymentAPI Response", response)
      dispatch(makePaymentCompleteAction(paymentInfo))
    });
    dispatch(isFetching())
  }
}


function makePaymentAPI(paymentInfo){
  //return callApi('video/getvideotoken','get')
  //alert("callRequestInfo => "+JSON.stringify(callRequestInfo))
  return callApi('video/makepayment','post',paymentInfo)
}

function makePaymentCompleteAction(response){
  return function(dispatch){
    dispatch({type: PAYMENT_RESPONSE_FETCHED, payload: response})
  }
}


function isFetching(){
  return {
    type: PAYMENT_RESPONSE_FETCHING,
    payload: {}
  }
}