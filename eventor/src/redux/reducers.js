// import { MOVE_TASK } from "./actions";
import initialData from "../components/initialData";
import { MOVE_TASK, DELETE_TASK, LOAD_TASK } from "./actionTypes";

function taskReducer(state = initialData, action) {
  switch (action.type) {
    case LOAD_TASK:
      const initialState = action.data;
      return {
        initialState
      };

    case MOVE_TASK:
      const source = action.source;
      const dest = action.dest;

      if (source.index === dest.index && source.dropId === dest.dropId)
        return state;

      if (source.dropId === dest.dropId) {
        const currColumn = state.columns[source.dropId];
        const currTasks = Array.from(currColumn.taskIds);
        currTasks.splice(source.index, 1);
        currTasks.splice(dest.index, 0, action.dragId);

        const newColumn = {
          ...currColumn,
          taskIds: currTasks
        };

        return {
          ...state,
          columns: {
            ...state.columns,
            [source.dropId]: newColumn
          }
        };
      }

      const srcTaskIds = Array.from(state.columns[source.dropId].taskIds);
      srcTaskIds.splice(source.index, 1);
      const newStart = {
        ...state.columns[source.dropId],
        taskIds: srcTaskIds
      };

      const destTaskIds = Array.from(state.columns[dest.dropId].taskIds);
      destTaskIds.splice(dest.index, 0, action.dragId);
      const newDest = {
        ...state.columns[dest.dropId],
        taskIds: destTaskIds
      };

      return {
        ...state,
        columns: {
          ...state.columns,
          [source.dropId]: newStart,
          [dest.dropId]: newDest
        }
      };

    case DELETE_TASK:
      const newTaskList = Array.from(state.columns[action.column].taskIds);
      newTaskList.splice(action.index, 1);

      const newColumn = {
        ...state.columns[action.column],
        taskIds: newTaskList
      };

      return {
        ...state,
        columns: {
          ...state.columns,
          [action.column]: newColumn
        }
      };
    default:
      return state;
  }
}

export default taskReducer;
