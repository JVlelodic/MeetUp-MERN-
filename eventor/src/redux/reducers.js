// import { MOVE_TASK } from "./actions";
import initialData from "../components/initialData";
import { DELETE_TASK, TASKPOST_SUCCESS, TASKPOST_REQUEST } from "./actionTypes";

function taskReducer(state = initialData, action) {
  switch (action.type) { 
    case TASKPOST_REQUEST:
      return state; 
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
    case TASKPOST_SUCCESS: 
      console.log(action.state); 
      return action.state; 
    default:
      return state;
  }
}

export default taskReducer;
