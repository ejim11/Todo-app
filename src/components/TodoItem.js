import classes from "./TodoItem.module.scss";
import { useState, useContext } from "react";
import { FaTimes } from "react-icons/fa";

import TodoContext from "../store/todo-context";

const TodoItem = (props) => {
  const todoCtx = useContext(TodoContext);
  const [checked, setIsChecked] = useState(props.checked);
  const checkboxChangeHandler = (e) => {
    if (e.target.checked) {
      setIsChecked(true);
    } else {
      setIsChecked(false);
    }
    todoCtx.setItemChecked(props.id);
  };

  return (
    <li>
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
      <FaTimes className={classes.timesIcon} />
    </li>
  );
};

export default TodoItem;
