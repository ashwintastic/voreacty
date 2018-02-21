/**
 * Created by root on 28/7/17.
 */
import {
  SHOWLOADINGBAR,
  HIDELOADINGBAR,
  RESETLOADINGBAR
} from '../config/constants';

export default function (state=0, action={}) {
  let newState = state;
  switch (action.type) {
    case SHOWLOADINGBAR:
      newState = state + 1;
      break;
    case HIDELOADINGBAR:
      newState = state > 0 ? state - 1 : 0;
      break;
    case RESETLOADINGBAR:
      newState = 0;
      break;
    default:
      return state;
  }
  return newState;
}
