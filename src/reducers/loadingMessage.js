/**
 * Created by root on 28/7/17.
 */
import {
  AVAILABILITY_OF_SERVICE_CALLING,
  CALL_ENDED
} from '../config/constants';

export default function (state='', action={}) {
  let newState = state;
  switch (action.type) {
    case AVAILABILITY_OF_SERVICE_CALLING:
      newState = action.payload;
      break;
    case CALL_ENDED:
      newState = action.payload
      break;
    default:
      return state;
  }
  return newState;
}
