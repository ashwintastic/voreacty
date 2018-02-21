import {CONTACT_HISTORY_FETCHING, 
		CONTACT_HISTORY_FETCHED}
	   from '../config/constants';

export default function(state={}, action){
	switch(action.type){
		case CONTACT_HISTORY_FETCHING:{
			return Object.assign({},state, action.payload);
		}
		case CONTACT_HISTORY_FETCHED:{
			return Object.assign({},state, action.payload);
		}
	}
	return state;
}