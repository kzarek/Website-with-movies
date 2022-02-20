import thunk from 'redux-thunk';
import {createStore, applyMiddleware, combineReducers} from 'redux';
import { movieReducer } from './movies/reducers';
import logger from 'redux-logger'
import { personReducer } from './persons/reducers';
import { createMiddleware } from 'redux-api-middleware';


const store = createStore(
  combineReducers({
  movies:movieReducer,
  persons:personReducer
}),applyMiddleware(thunk,createMiddleware(),logger)
  
  );

export default store;