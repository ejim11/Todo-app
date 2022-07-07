import { useContext } from "react";
import NewTodo from "./NewTodo";
import TodoList from "./TodoList";
import { BsFillSunFill } from "react-icons/bs";
import { BsFillMoonFill } from "react-icons/bs";
import classes from "./TodoBox.module.scss";
import TodoContext from "../store/todo-context";

const TodoBox = () => {
  const { setMode, lightModeState } = useContext(TodoContext);

  const changeLightModeHandler = () => {
    if(lightModeState){

      setMode(false);
    } else{
      setMode(true)
    }
  };

  return (
    <div className={classes.container}>
      <div className={classes["container-header"]}>
        <h1>TODO</h1>
        {lightModeState ? (
          <BsFillMoonFill
            onClick={changeLightModeHandler}
            className={classes.icon}
          />
        ) : (
          <BsFillSunFill
            onClick={changeLightModeHandler}
            className={classes.icon}
          />
        )}
      </div>
      <div className={classes["container-body"]}>
        <NewTodo />
        <div
          className={`${classes["container-body__list"]} ${
            lightModeState ? classes.light : classes.dark
          }`}
        >
          <TodoList />
        </div>
      </div>
    </div>
  );
};
export default TodoBox;
