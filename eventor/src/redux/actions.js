import {
  DELETE_TASK,
  TASKPOST_SUCCESS,
  TASKPOST_REQUEST
} from "./actionTypes";
import axios from "axios";

const URL = "http://localhost:5468/tasks";

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
      .then(response => response.json)
      .then(json => {
        dispatch(fetchSuccess(json));
      });
  };
};

export const fetchingTask = () => {
  return {
    type: TASKPOST_REQUEST
  };
};

export const fetchSuccess = newState => {
  return {
    type: TASKPOST_SUCCESS,
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
