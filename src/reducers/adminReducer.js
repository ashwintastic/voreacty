import {ADMIN_DASHBOARD_FETCHING,
	   ADMIN_DASHBOARD_FETCHED}
	   from '../config/constants';

export default function(state={}, action){
	switch(action.type){
		case ADMIN_DASHBOARD_FETCHING:{
			return action.payload;
		}
		case ADMIN_DASHBOARD_FETCHED:{
			return action.payload;
		}
	}
	return state;
}