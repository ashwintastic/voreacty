export const getParamObjectForVideoApi = (props) => {
	let serviceId = -1;
	let serviceUserId = -1;
    let videoCallId = -1;
    let userId = -1;
    let callRequestInfo = {}
    let selectedPrice=0
    let selectedDuration=0

    //console.log("Here")
    console.log("common:getParamObjectForVideoApi",props);

    // This will check if the user is SP (to allow directly join video call) or it's reconnect scenario (allow direct connection for both users)

    let spParamObj = checkIfSpUser(props);

    console.log("common:getParamObjectForVideoApi:spParamObj",spParamObj);

    if(spParamObj.isSPUser || spParamObj.connectionPath == "reconnect"){
        callRequestInfo = spParamObj;
    }
    else{

        // For non SP User     
        //console.log(spParamObj);
        
    	// Get From Store if there
    	let contributor = props.selectedServiceDetails.contributor;
        let selectedPriceObj = props.selectedServiceDetails.selectedPrice;
        let videoCallReferenceId = props.videoCallMessage.videoCallReferenceId;
        let loggedInUserInfo = props.loggedInUserInfo;

        if(loggedInUserInfo.hasOwnProperty('userId') ){
            userId = loggedInUserInfo.userId;
        }
        
        if(typeof videoCallReferenceId !='undefined' && videoCallReferenceId>0 ){
            videoCallId = videoCallReferenceId;
        }
        
        if(typeof selectedPriceObj != 'undefined' && selectedPriceObj.price!=''){
            selectedPrice = selectedPriceObj.price
            selectedDuration = selectedPriceObj.duration
        }

    	if(typeof contributor != 'undefined' && contributor.id!=''){
    		serviceId = contributor.id
    		serviceUserId = contributor.user_id
    	}
    	// Get from URL Params
    	else {
            if(typeof props.serviceId !='undefied'){
    		  serviceId = props.serviceId
            }
            if(typeof props.serviceUserId !='undefied'){
    		  serviceUserId = props.serviceUserId
            }
    	}
    	
        // TEST
        // userId = 77;
        // serviceId = 84;
        // videoCallId = 33;
        callRequestInfo = {
          userId: userId,
          serviceId: serviceId,
          videoCallId: videoCallId,
          selectedDuration: selectedDuration,
          selectedPrice: selectedPrice,
          serviceUserId: serviceUserId
        };
    }

    console.log("common:getParamObjectForVideoApi: Return ",callRequestInfo);
    return callRequestInfo;
}

function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

function checkIfSpUser(props){
    //console.log(props);
    console.log("common:getParamObjectForVideoApi: checkIfSpUser ",props);
    let queryString = '';
    let connectionPath = '';
    if(props.hasOwnProperty('location')){
        queryString = props.location.search;
        connectionPath = props.location.pathname.replace("/",'');
    }

    // Logged in User
    let loggedInUserInfo = props.loggedInUserInfo;
    let loggedinUserId = -1;
    if(loggedInUserInfo.hasOwnProperty('userId') ){
        loggedinUserId = loggedInUserInfo.userId;
    }

    let urlParamObj={}  
    let urlUserId = -1
    urlParamObj.isSPUser = false;
    if(typeof queryString !='undefined' && queryString!=''){
        let userType = getParameterByName('user',queryString);

        if(userType=='sp' || connectionPath == 'reconnect'){
            urlParamObj.isSPUser = (userType=='sp');
            urlParamObj.type = userType;

            urlUserId = getParameterByName('user_id',queryString);
            if(loggedinUserId != urlUserId)
            {
                urlParamObj.userIdError = true;
            }
            
            urlParamObj.userId = loggedinUserId;
            urlParamObj.videoCallToken = getParameterByName('token',queryString);
            urlParamObj.serviceId = getParameterByName('service_id',queryString);
            urlParamObj.videoCallId = getParameterByName('video_call_id',queryString);

             urlParamObj.videoId = getParameterByName('video_id',queryString);

            // For reconnect
            urlParamObj.connectionPath = connectionPath;
            urlParamObj.loggedinUserId = loggedinUserId;
        }
    }
    console.log("common:getParamObjectForVideoApi:checkIfSpUser:Return ",urlParamObj);
    return urlParamObj;
}