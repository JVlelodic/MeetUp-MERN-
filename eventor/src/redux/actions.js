import { MOVE_TASK, DELETE_TASK, LOAD_TASK } from "./actionTypes";

const URL = "localhost:5468/tasks";

export const loadTask = (data) => {
  return {
    type: LOAD_TASK,
    data
  }
}

export const getTask = () => {
  return function (dispatch) {
    return fetch(URL)
    .then(
      response => response.json(),
      error => console.log(`${error} has occurred`)
    )
    .then(
      json => dispatch(loadTask(json))
    );
  }
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
