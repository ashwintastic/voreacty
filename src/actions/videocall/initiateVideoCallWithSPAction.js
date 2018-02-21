import {
  RESPONSE_MESSAGE_FROM_VIDEO_CALL_REQUEST_FETCHED,
  SERVICE_PROVIDER_AVAILABILITY_COMFIRMED,
  AVAILABILITY_OF_SERVICE_FETCHING,
  VIDEO_CALL_REFERENCE_ID,
  AVAILABILITY_OF_SERVICE_FETCHED,
  TIMEOUT_FOR_POLLING,
  CLEAR_VIDEO_CALL_RESPONSE_STORE,
  VIDEO_CALL_STATUS,
  AVAILABILITY_OF_SERVICE_CALLING,
  CALL_ENDED
}
  from '../../config/constants'

import callApi from '../../helper/callapi'


export default function initiateVideoCallWithSP(callRequestInfo){
  return function (dispatch, getState){
      
    dispatch(clearVideoCallMessageStore());

    setVideoCallRequest(callRequestInfo)
      .then( function (response){
        if(response.error){
          dispatch(setAvailabilitySPErrorMessage(response))
        }
        else {
          dispatch(setVideoCallReferenceId(response))
        }
        return response;
      })
      .then( function (response) {
        // TODO:: Make these promises composable using Promise.all
        // If service is not available, don't procceed
        if(response.error){
          dispatch(availabilityOfServiceProvider(false));
          dispatch(callEnded())
          return false;
        }
        callSuccessfullyInitiated(response)
          .then(function (confirmResopnse){
            dispatch(setSPConfirmationMessage(confirmResopnse))
            return confirmResopnse
          })
          .then(function(response){
            if(response.call){
              let id = getState().videoCallMessageResponse.videoCallReferenceId;
              // TODO:: later it has to be a push event
              setTimeout(() => {
                let starttime = new Date().getTime();
                let timer = setInterval(function () {
                  startPollingForStatus(id)
                    .then(function(response){
                      let currentTime = new Date().getTime();
                      let timeInterval = currentTime - starttime;
                      // console.log("time ============== ");
                      // console.log("starttime -> "+starttime);
                      // console.log("currentTime -> "+currentTime);
                      // console.log("timeInterval -> "+timeInterval);
                      // console.log("TIMEOUT_FOR_POLLING -> "+TIMEOUT_FOR_POLLING);
                      if(timeInterval > TIMEOUT_FOR_POLLING){
                        clearTimeout(timer);
                        //console.log("TIMEOUT_FOR_POLLING Reached -> id:"+id);
                        //dispatch(setAvailabilitySPErrorMessage({error:true,reason:'pollingTimeOut'}));

                        // End video call if timeout
                        endVideoCallTimeOut(id).then(function(res){
                          dispatch(setAvailabilitySPErrorMessage({error:true,reason:'pollingTimeOut'}));
                          dispatch(callEnded())
                        });
                      }

                      if(response.id == VIDEO_CALL_STATUS.SP_REJECTED){
                          clearTimeout(timer);
                          dispatch(setAvailabilitySPErrorMessage({error:true,reason:'phoneCallRejected'}));
                          dispatch(callEnded())
                      }
                      // Success scenario
                      else if(response.id == VIDEO_CALL_STATUS.SP_CONFIRMED){
                        console.log("SP Confirmed:",response.id);
                        clearTimeout(timer);
                        dispatch(availabilityOfServiceProvider(true))
                        dispatch(callEnded())
                      }
                      else{
                        // race conditions here  
                      }
                    })
                }, 1000)
              }, 1000)
              //dispatch(isFetching())
            }
            else{
              // Server error
              // TODO - Unblock the service provide here
              dispatch(setAvailabilitySPErrorMessage({error:true,reason:'phoneCallServerError'}));
              dispatch(availabilityOfServiceProvider(false));
              dispatch(callEnded())
            }
          });
      }).catch(function(error){
        console.log("CATCH Error ", error);
      //TODO HANDLE WHEN ERROR OCCURS
    });
    dispatch(isFetching())
    dispatch(isCalling())  }
}

function clearVideoCallMessageStore(){
  return{
    type: CLEAR_VIDEO_CALL_RESPONSE_STORE,
    payload: {}
  }
}

function availabilityOfServiceProvider (status){

  return{
    type: AVAILABILITY_OF_SERVICE_FETCHED,
    payload: {hasServiceProviderConfirmed: status}
  }
}


function endVideoCallTimeOut(id){
   // call timeout from client
  let endCallParams = {}
  endCallParams.info = {}
  endCallParams.info.logInfo = 'Timeout while service availability checking'
  endCallParams.videoCallId = id
  endCallParams.status = VIDEO_CALL_STATUS.SP_REJECTED 
  return callApi('video/updatecallstatus','post',endCallParams) 
}

function startPollingForStatus(id){
  return callApi('video/checkCallStatus/'+id+'','get')
}

function callSuccessfullyInitiated(res){
  //return callApi('http://ec2-18-220-34-191.us-east-2.compute.amazonaws.com/notifysp/'+id,'get',id,true)
  return callApi('video/confirmsp','post', {id: res.videoCallReferenceId,
                                            selectedPrice:res.selectedPrice,
                                            selectedDuration:res.selectedDuration    
                                          })
}

function setVideoCallRequest(callRequestInfo){
  return callApi('video/requestcall','post',callRequestInfo)
}

function setSPConfirmationMessage(confirmResopnse){
  return {
    type: SERVICE_PROVIDER_AVAILABILITY_COMFIRMED,
    payload: confirmResopnse
  }
}

function setAvailabilitySPErrorMessage(errMessage){
  //console.log("Set in reducer -> "+errMessage);
  return {
    type: RESPONSE_MESSAGE_FROM_VIDEO_CALL_REQUEST_FETCHED,
    payload: errMessage
  }
}

function setVideoCallReferenceId(videocallId){
  return {
    type: VIDEO_CALL_REFERENCE_ID,
    payload: videocallId
  }
}

function isFetching(){
  return {
    type: AVAILABILITY_OF_SERVICE_FETCHING,
    payload: {},
    isFetching: true
  }
}

function isCalling(){
  return {
    type: AVAILABILITY_OF_SERVICE_CALLING,
    payload: 'Calling...',
    // isFetching: true
  }
}

function callEnded(){
 return {
    type: CALL_ENDED,
    payload: '',
    // isFetching: true
  } 
}