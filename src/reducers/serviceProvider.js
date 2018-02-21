/**
 * Created by root on 28/7/17.
 */
import {
  SERVICE_PROVIDER_DETAILS_FETCHING,
  SERVICE_PROVIDER_DETAILS_FETCHED,
  SAVE_SELECTED_PRICE_IN_STORE
} from '../config/constants';

export default function (state = {}, action){
  switch(action.type){
    case SERVICE_PROVIDER_DETAILS_FETCHING:{
      return action.payload
    }
    case SERVICE_PROVIDER_DETAILS_FETCHED: {
      return action.payload
    }
    case SAVE_SELECTED_PRICE_IN_STORE:{
      return Object.assign({},state,action.payload)
    }
  }
  return state
}