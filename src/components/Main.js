import TodoBox from "./TodoBox";
import TodoContext from "../store/todo-context";
import { useContext } from "react";
import classes from "./Main.module.scss";
import TodoStates from "./TodoStates";

const Main = () => {
  const { lightModeState } = useContext(TodoContext);

  return (
    <section>
      <div
        className={`${classes["bg-color"]} ${
          lightModeState ? classes["bg-l-color"] : classes["bg-d-color"]
        }`}
      ></div>
      <TodoBox />
      <TodoStates className={"smallScreen"} mode = {lightModeState ? "light": "dark"} />
      <p
        className={`${classes.drag_paragraph} ${
          lightModeState ? classes.light : classes.dark
        }`}
      >
        Drag and drop to reorder list
      </p>
    </section>
  );
};

export default Main;
