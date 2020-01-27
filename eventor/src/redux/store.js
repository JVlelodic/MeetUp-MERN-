import { createStore, applyMiddleware } from 'redux';
import taskReducer from './reducers'; 

// const logger = ReduxLogger.createLogger();



export const store = createStore(taskReducer);
