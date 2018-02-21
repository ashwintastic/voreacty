import {
  SHOWLOADINGBAR,
  HIDELOADINGBAR,
  RESETLOADINGBAR
} from '../../config/constants';



export default function () {

  return (store) => next => (action) => {
    // const ignoreCases = new RegExp(`ANALYTICS_`, 'g');
    const ignoreCases = []; // regex or string to ignore
    const isPending = new RegExp(`_FETCHING`, 'g');
    const isFulfilled = new RegExp(`_FETCHED`, 'g');
    const isRejected = new RegExp(`_RESET`, 'g');



    if (action && action.type.match(isPending)) {
      // console.log(action.type);
      // console.log(action.type.match(isPending));

      store.dispatch({type: SHOWLOADINGBAR});
      // setTimeout(function(){
      //   store.dispatch({type: HIDELOADINGBAR}); // hide it after 5 secs in case of failure
      // }, 10000);
    }

    if (action && action.type.match(isFulfilled)) {
      store.dispatch({type: HIDELOADINGBAR})
    }

    if(action && action.type.match(isRejected)){
      store.dispatch({type: RESETLOADINGBAR})
    }
    if(action) {
      return next(action);
    }

  }
}