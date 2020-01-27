import { LOAD_TASK, LOAD_FAIL, LOAD_SUCCESS, MOVE_TASK, DELETE_TASK, ADD_TASK } from './actionTypes';

export const moveTask =
  (
    draggableId,
    srcIndex,
    srcDropId,
    destIndex,
    destDropId
  ) => {
    return {
      type: MOVE_TASK,
      dragId: draggableId,
      source: {
        index: srcIndex,
        dropId: srcDropId
      },
      dest: {
        index: destIndex,
        dropId: destDropId,
      }
    }
  }

export const deleteTask = (taskIndex, droppableId) => {
  return {
    type: DELETE_TASK,
    index: taskIndex,
    column: droppableId 
  }
}

// export const addTask = (event, body) => {
//   return {
//     type: ADD_TASK,
//     body: body,
//     event: event,
//   }
// }