import { useReducer , useEffect} from "react";
import { toDoReducer } from "./toDo-reducer";

const init = () => {
    return JSON.parse(localStorage.getItem('task')) || [];
  }
  
export const useTodo = () => {

    const initialState = [];
    
    const [state, dispatch] = useReducer(toDoReducer, initialState, init);
    
      const handleToDo = (newTask) => {
        dispatch({
          type: "add",
          payload: newTask,
        });
      };
    
      const handleRemoveTodo = (id) => {
        dispatch({
          type: "delete",
          payload: id,
        });
      }
    
      const onToggleTodo = (id) => {
        dispatch({
          type: "toggle",
          payload: id,
        });
      }
      const totalTask = state.length;
      const pendingTask = state.filter((toDo) => !toDo.done).length;
    
      useEffect(() => {
        const task = JSON.stringify(state);
        localStorage.setItem('task', task||[]);
      },[state]);
       

    return {
        state,
        totalTask,
        pendingTask,
        handleToDo,
        handleRemoveTodo,
        onToggleTodo
    }
}