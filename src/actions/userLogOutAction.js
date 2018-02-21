/**
 * Created by root on 15/8/17.
 */
import {
  USER_LOGOUT
} from '../config/constants'

export default function (){
  return function (dispatch){
    dispatch(logoutUser())
  }
}

function logoutUser(){
  return {
    type: USER_LOGOUT,
    payload: {}
  }
}

