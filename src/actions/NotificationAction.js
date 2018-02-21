import {
  SHOW_NOTIFICATION,
  SHOW_ERROR_NOTIFICATION
} from '../config/constants';
import {notificationConfig} from '../config/constants'

export function showNotification(notificationMsg, type){
  if(type == 'success') {
    let msg = Object.assign({},notificationConfig.success, notificationMsg);
    return setNotificationForType(msg);
  }
  if(type == 'error'){
    let msg = Object.assign({},notificationConfig.error, notificationMsg);
    return setNotificationForType(msg);
  }
}


function setNotificationForType(message){
  return{
    type: SHOW_NOTIFICATION,
    payload: message,
    isFetching: true
  }
}