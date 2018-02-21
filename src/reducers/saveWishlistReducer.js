import {
  WISHLIST_FETCHING,
  WISHLIST_FETCHED
} from '../config/constants';


export default function (state = {}, action){
  switch(action.type){
    case WISHLIST_FETCHING:{
      	return action.payload
    }
    case WISHLIST_FETCHED: {
      return action.payload
    }
  }
  return state
}