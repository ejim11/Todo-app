import { useRef, useContext } from "react";

import classes from "./NewTodo.module.scss";
import TodoContext from "../store/todo-context";

const NewTodo = () => {
  const inputRef = useRef();
  const todoCtx = useContext(TodoContext);

  const submitTodoHandler = (e) => {
    e.preventDefault();
    const enteredText = inputRef.current.value;
    const todo = {
      id: `${enteredText.slice(-2)}${Math.floor(Math.random() * 100)}`,
      text: enteredText,
      checked: false,
    };
    todoCtx.addTodo(todo);
    inputRef.current.value = "";
  };

  return (
    <div className={classes.input_container}>
      <div></div>
      <form onSubmit={submitTodoHandler}>
        <input ref={inputRef} type="text" placeholder="Write Todo" />
      </form>
    </div>
  );
};

export default NewTodo;
