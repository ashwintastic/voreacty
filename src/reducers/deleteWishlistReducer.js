import {
  WISHLIST_DELETING,
  WISHLIST_DELETED
} from '../config/constants';


export default function (state = {}, action){
  switch(action.type){
    case WISHLIST_DELETING:{
      	return action.payload
    }
    case WISHLIST_DELETED: {
      return action.payload
    }
  }
  return state
}