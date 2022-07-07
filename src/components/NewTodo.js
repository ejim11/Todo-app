import { useRef, useContext } from "react";

import classes from "./NewTodo.module.scss";
import TodoContext from "../store/todo-context";

const NewTodo = () => {
  const inputRef = useRef();
  const { addTodo, lightModeState } = useContext(TodoContext);

  const submitTodoHandler = (e) => {
    e.preventDefault();
    const enteredText = inputRef.current.value;
    const todo = {
      id: `${enteredText.slice(-2)}${Math.floor(Math.random() * 100)}`,
      text: enteredText,
      checked: false,
    };
    if (enteredText === "") {
      return;
    }
    addTodo(todo);
    inputRef.current.value = "";
  };

  return (
    <div
      className={`${classes.input_container} ${
        lightModeState ? classes.light : classes.dark
      }`}
    >
      <div></div>
      <form onSubmit={submitTodoHandler}>
        <input ref={inputRef} type="text" placeholder="Create a new todo..." />
      </form>
    </div>
  );
};

export default NewTodo;
