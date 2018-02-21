import {
  RESPONSE_MESSAGE_FROM_VIDEO_CALL_REQUEST_FETCHED,
  SERVICE_PROVIDER_AVAILABILITY_COMFIRMED,
  VIDEO_CALL_REFERENCE_ID,
  AVAILABILITY_OF_SERVICE_FETCHED,
  GET_VIDEO_TOKEN_FETCHING,
  GET_VIDEO_TOKEN_FETCHED,
  CLEAR_VIDEO_CALL_RESPONSE_STORE
} from '../config/constants';

export default function (state = {}, action){
  switch(action.type){
    case CLEAR_VIDEO_CALL_RESPONSE_STORE:{
      console.log("In VideoCall Reducer ");
      console.log(action);
      return action.payload
    }
    case RESPONSE_MESSAGE_FROM_VIDEO_CALL_REQUEST_FETCHED:{
      return action.payload
    }
    case SERVICE_PROVIDER_AVAILABILITY_COMFIRMED: {
      console.log("In confirmation reducer -> "+action.payload);
      //return action.payload
      let temp = Object.assign({}, state, action.payload);
      return temp
    }
    case VIDEO_CALL_REFERENCE_ID:{
      let temp = Object.assign({}, state, action.payload);
      return temp
    }
    case AVAILABILITY_OF_SERVICE_FETCHED: {
      let temp = Object.assign({}, state, action.payload);
      return temp
    }
    case GET_VIDEO_TOKEN_FETCHING:{
      return Object.assign({},state,action.payload)
    }
    case GET_VIDEO_TOKEN_FETCHED:{
      //console.log("In reducer -> "+action.payload);
      //console.log(Object.assign({},state,action.payload))
      return Object.assign({},state,action.payload)
    }
    // case 'CHECK_DISPATCH':{
    //   alert("in reducer");
    // }
  }
  return state
}


/*


videoCallMessageResponse = {
  'sp_confirmation_response': 
    {
      error: 'Message to display on screen'
      success: true
    }
  'service_available_response':

}
*/