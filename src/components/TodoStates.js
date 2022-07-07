import classes from "./TodoStates.module.scss";
import TodoContext from "../store/todo-context";
import { useContext } from "react";

const TodoStates = (props) => {
  const { addToActiveTodo, addToCompleted, displayAll, listState } =
    useContext(TodoContext);
  const addActiveHandler = () => {
    addToActiveTodo();
  };

  const addCompleteHandler = () => {
    addToCompleted();
  };

  const addAllHandler = () => {
    displayAll();
  };

  return (
    <div className={`${classes.state_container} ${classes[props.className]} ${classes[props.mode]}`}>
      <p
        className={`${listState === "all" ? classes.all : null}`}
        onClick={addAllHandler}
      >
        all
      </p>

      <p
        className={`${listState === "active" ? classes.active : null}`}
        onClick={addActiveHandler}
      >
        active
      </p>

      <p
        className={`${listState === "completed" ? classes.completed : null}`}
        onClick={addCompleteHandler}
      >
        completed
      </p>
    </div>
  );
};

export default TodoStates;
