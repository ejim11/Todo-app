import { Fragment, useRef } from "react";

import classes from "./EditTodos.module.scss";

const EditTodo = (props) => {
  const refInput = useRef();

  const submitTodoHandler = () => {
    const enteredText = refInput.current.value;
  };
  return (
    <Fragment>
      <div className={classes.input_container}>
        <div></div>
        <form onSubmit={submitTodoHandler}>
          <input ref={refInput} type="text" placeholder="Write Todo" />
        </form>
      </div>
    </Fragment>
  );
};

export default EditTodo;
