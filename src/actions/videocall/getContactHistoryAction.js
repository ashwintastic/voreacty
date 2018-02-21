import 	{CONTACT_HISTORY_FETCHING, 
		CONTACT_HISTORY_FETCHED} from '../../config/constants';

import callApi from '../../helper/callapi';

export default function getContactHistoryDetails(requestData){
	return function(dispatch){
		fetchContactHistoryData(requestData).then(function(response){
			dispatch(fetched(response))
		});
		dispatch(fetching());
	}
}

function fetchContactHistoryData(requestData){
	return callApi('getBriefCallHistory','post',requestData);
}

function fetched(response){
	//console.log("CallHistory -> ",response);
	return {
		type   : CONTACT_HISTORY_FETCHED,
		payload: response
	}
}

function fetching(){
	return {
		type   : CONTACT_HISTORY_FETCHING,
		payload: {}
	}
}