import { MOVE_TASK, DELETE_TASK } from "./actionTypes";

const updateApiTask = () => {
  return function (dispatc)
}

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
