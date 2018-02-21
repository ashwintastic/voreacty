import {CALL_HISTORY_FETCHING, 
		CALL_HISTORY_FETCHED}
	   from '../config/constants';

export default function(state={}, action){
	switch(action.type){
		case CALL_HISTORY_FETCHING:{
			return Object.assign({},state, action.payload);
		}
		case CALL_HISTORY_FETCHED:{
			return Object.assign({},state, action.payload);
		}
	}
	return state;
}