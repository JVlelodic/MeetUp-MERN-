import { createStore } from 'redux';
import taskReducer from './reducers'; 
    
// const logger = ReduxLogger.createLogger();

const store = createStore(taskReducer);
export default store; 