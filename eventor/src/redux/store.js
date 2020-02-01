import { createStore } from 'redux';
import taskReducer from './reducers'; 
    
// const logger = ReduxLogger.createLogger();

const store = createStore(taskReducer);
console.log(store.getState()); 
export default store; 