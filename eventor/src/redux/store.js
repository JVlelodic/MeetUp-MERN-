import { createStore, applyMiddleware } from 'redux';
import taskReducer from './reducers';
import thunk from 'redux-thunk'; 
    
// const logger = ReduxLogger.createLogger();

const store = createStore(taskReducer, applyMiddleware(thunk));
console.log(store.getState()); 
export default store; 