import {
  PAYMENT_RESPONSE_FETCHING,
  PAYMENT_RESPONSE_FETCHED,
} from '../config/constants';

export default function (state = {}, action){
  switch(action.type){
    case PAYMENT_RESPONSE_FETCHING:{
      return action.payload
    }
    case PAYMENT_RESPONSE_FETCHED: {
      console.log("Set In Reducer makePaymentCompleteAction", action.payload);
      return action.payload
    }
  }
  return state
}