import classes from "./TodoItem.module.scss";
import { useState, useContext, memo, Fragment } from "react";
import { FaEdit } from "react-icons/fa";
import { ImBin2 } from "react-icons/im";

import TodoContext from "../store/todo-context";
import EditTodo from "./EditTodo";

const TodoItem = (props) => {
  const todoCtx = useContext(TodoContext);
  const [checked, setIsChecked] = useState(props.checked);
  const [showEditInput, setShowEditInput] = useState(false);
  const checkboxChangeHandler = (e) => {
    if (e.target.checked) {
      setIsChecked(true);
    } else {
      setIsChecked(false);
    }
    todoCtx.setItemChecked(props.id);
  };

  const removeTodoItem = () => {
    todoCtx.removeTodo(props.id);
  };

  const editTodoHandler = () => {
    setShowEditInput((prevState) => !prevState);
  };
  

  return (
    <Fragment>
      <div className={classes.cover}>
        <form action="" className={classes.round}>
          <input
            type="checkbox"
            id={props.id}
            className={classes["click-box"]}
            onChange={checkboxChangeHandler}
            checked={checked}
          />
          <label
            htmlFor={props.id}
            className={classes.mark}
            id="clickable-box1"
          ></label>
          <label
            htmlFor={props.id}
            className={`${classes.name} ${
              checked && classes["text-line-through"]
            }`}
          >
            {props.todoItem}
          </label>
        </form>
        <div className={classes.logos}>
          {checked ? null : (
            <FaEdit className={classes.timesIcon} onClick={editTodoHandler} />
          )}

          <ImBin2 className={classes.timesIcon} onClick={removeTodoItem} />
        </div>
      </div>
      {checked ? null : showEditInput ? (
        <div>
          <EditTodo id={props.id} />
        </div>
      ) : null}
    </Fragment>
  );
};

export default memo(TodoItem);
