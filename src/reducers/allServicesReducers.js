/**
 * Created by root on 18/8/17.
 */
import {
  GET_ALL_SERVIVES_FETCHING,
  GET_ALL_SERVIVES_FETCHED,
  GET_ALL_SERVIVES_FETCHED_WITHOUT_CATAGORY
} from '../config/constants';

export default function (state = {}, action){
  switch(action.type){
    case GET_ALL_SERVIVES_FETCHING:{
      return Object.assign({},state,action.payload)
    }
    case GET_ALL_SERVIVES_FETCHED: {
      return Object.assign({},state,action.payload)
    }
    case GET_ALL_SERVIVES_FETCHED_WITHOUT_CATAGORY: {
      return Object.assign({},state,action.payload)
    }
  }
  return state
}