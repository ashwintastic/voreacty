/**
 * Created by root on 28/7/17.
 */
import allReducers from '../reducers';
import logger from 'redux-logger';
import {createStore, applyMiddleware} from "redux";
import {ENABLE_LOGGER} from '../config/config';
import thunk from 'redux-thunk';
import loadingBarMiddleware from './loadingbar';

function configureStore(){
  if(ENABLE_LOGGER){
    var store = createStore(allReducers, {},
      applyMiddleware(thunk, loadingBarMiddleware(), logger)
    );
  }
  else{
    var store = createStore(allReducers,
      applyMiddleware(thunk, loadingBarMiddleware())
    );
  }
  return store;
}
export default configureStore