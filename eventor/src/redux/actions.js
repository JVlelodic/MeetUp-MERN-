import { DELETE_TASK, FETCH_REQUEST, FETCH_SUCCESS } from "./actionTypes";
import axios from "axios";

const URL = "http://localhost:5468/tasks";

export const getTasks = () => {
  return function(dispatch) {
    dispatch(fetchingTask());
    return axios({
      method: "get",
      url: URL
    })
      .then(response => response.data)
      .then(payload => {
        console.log(payload);
        dispatch(fetchSuccess(payload));
      });
  };
};

export const moveTask = (source, destination, draggableId) => {
  return function(dispatch) {
    dispatch(fetchingTask());
    return axios({
      method: "post",
      url: URL,
      data: {
        taskId: draggableId,
        source: {
          index: source.index,
          dropId: source.droppableId
        },
        dest: {
          index: destination.index,
          dropId: destination.droppableId
        }
      }
    })
      .then(response => response.data)
      .then(payload => {
        dispatch(fetchSuccess(payload));
      });
  };
};

export const fetchingTask = () => {
  return {
    type: FETCH_REQUEST
  };
};

export const fetchSuccess = newState => {
  return {
    type: FETCH_SUCCESS,
    state: newState
  };
};

export const deleteTask = (taskIndex, droppableId) => {
  return {
    type: DELETE_TASK,
    index: taskIndex,
    column: droppableId
  };
};
