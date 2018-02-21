/**
 * Created by root on 23/8/17.
 */
import {
  SAVE_SELECTED_PRICE_IN_STORE
} from '../config/constants';

//import callApi from '../helper/callapi'

export default function (price){
  console.log("in prices prices", price)
  return function (dispatch) {
    dispatch(savePriceInStore(price))
  }
}

function savePriceInStore(price) {
  return {
    type: SAVE_SELECTED_PRICE_IN_STORE,
    payload: {
      selectedPrice: price
    }
  }
}
