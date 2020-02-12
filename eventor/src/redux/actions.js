import { MOVE_TASK, DELETE_TASK } from "./actionTypes";
import axios from "axios";

const updateApiTask = () => {
  return function(dispatch) {
    axios({
      url: 'http://localhost/tasks'
    });
  };
};

export const moveTask = (source, destination, draggableId) => {
  return {
    type: MOVE_TASK,
    dragId: draggableId,
    source: {
      index: source.index,
      dropId: source.droppableId
    },
    dest: {
      index: destination.index,
      dropId: destination.droppableId
    }
  };
};

export const deleteTask = (taskIndex, droppableId) => {
  return {
    type: DELETE_TASK,
    index: taskIndex,
    column: droppableId
  };
};
