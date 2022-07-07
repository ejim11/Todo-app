import { Fragment, useRef, useContext } from "react";

import classes from "./EditTodos.module.scss";
import TodoContext from "../store/todo-context";

const EditTodo = (props) => {
  const refInput = useRef();
  const { editTodo, lightModeState } = useContext(TodoContext);

  const submitTodoHandler = () => {
    const enteredText = refInput.current.value;

    editTodo({ id: props.id, text: enteredText });
    refInput.current.value = "";
  };
  return (
    <Fragment>
      <div
        className={`${classes.input_container} ${
          lightModeState ? classes.light : classes.dark
        }`}
      >
        <div></div>
        <form onSubmit={submitTodoHandler}>
          <input
            ref={refInput}
            type="text"
            placeholder="Edit Todo"
            autoFocus={true}
          />
        </form>
      </div>
    </Fragment>
  );
};

export default EditTodo;
