import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import taskReducer from "./reducers";

// const logger = ReduxLogger.createLogger();

const store = createStore(taskReducer, applyMiddleware(thunk));
export default store;
