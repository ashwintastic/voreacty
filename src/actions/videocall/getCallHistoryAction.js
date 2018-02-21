import 	{CALL_HISTORY_FETCHING, 
		CALL_HISTORY_FETCHED} from '../../config/constants';

import callApi from '../../helper/callapi';

export function getCallHistoryDetails(requestData){
	return function(dispatch){
		fetchCallHistoryData(requestData).then(function(response){
			dispatch(fetched(response))
		});
		dispatch(fetching());
	}
}

function fetchCallHistoryData(requestData){
	return callApi('getDetailedCallHistory','post',requestData);
}

function fetched(response){
	//console.log("CallHistory -> ",response);
	return {
		type   : CALL_HISTORY_FETCHED,
		payload: response
	}
}

function fetching(){
	return {
		type   : CALL_HISTORY_FETCHING,
		payload: {}
	}
}