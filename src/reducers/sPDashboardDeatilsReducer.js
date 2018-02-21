import {
  SERVICE_PROVIDER_SERVICES_FETCHING,
  SERVICE_PROVIDER_SERVICES_FETCHED,
  SERVICE_PROVIDER_SERVICES_UPDATING,
  SERVICE_PROVIDER_SERVICES_UPDATED
} from '../config/constants';

export default function (state = {}, action){
  switch(action.type){
    case SERVICE_PROVIDER_SERVICES_FETCHING:{
      return action.payload
    }
    case SERVICE_PROVIDER_SERVICES_FETCHED: {
      return action.payload
    }
  /*  case SERVICE_PROVIDER_SERVICES_UPDATING: {
      return Object.assign({},state,action.payload)
    }*/
    case SERVICE_PROVIDER_SERVICES_UPDATED: {
      return Object.assign({},state,action.payload)
    }
  }
  return state
}
