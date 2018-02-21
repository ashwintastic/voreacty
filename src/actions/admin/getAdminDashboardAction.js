import 	{ADMIN_DASHBOARD_FETCHING, 
		ADMIN_DASHBOARD_FETCHED} from '../../config/constants';

import callApi from '../../helper/callapi';

export default function getAdminDashboard(){
	return function(dispatch){
		fetchAdminDashboardData().then(function(response){
			dispatch(fetched(response))
		});
		dispatch(fetching());
	}
}

function fetchAdminDashboardData(){
	return callApi('admin/dashboard');
}

function fetched(response){
	console.log("AdminResponse -> ",response);
	return {
		type   : ADMIN_DASHBOARD_FETCHED,
		payload: response
	}
}

function fetching(){
	return {
		type   : ADMIN_DASHBOARD_FETCHING,
		payload: {}
	}
}