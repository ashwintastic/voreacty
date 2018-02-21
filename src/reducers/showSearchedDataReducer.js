import {
  GET_ALL_SEARCHED_DATA_FETCHING,
  GET_ALL_SEARCHED_DATA_FETCHED,
} from '../config/constants';



export default function (state = {}, action){
  switch(action.type) {
    case GET_ALL_SEARCHED_DATA_FETCHING: {
      return Object.assign({},state,action.payload)
    }
    case GET_ALL_SEARCHED_DATA_FETCHED: {
      return Object.assign({},state,action.payload)
    }
  }
  return state
}