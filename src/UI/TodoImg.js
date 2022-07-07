import todoImg from "../assets/undraw_to_do_list_re_9nt7.svg";
import completedImg from "../assets/undraw_checklist__re_2w7v.svg";
import TodoContext from "../store/todo-context";
import { useContext } from "react";
import classes from "./TodoImg.module.scss";

const TodoImg = () => {
  const { listState } = useContext(TodoContext);

  return (
    <div className={classes.container}>
      {listState === "completed" ? (
        <div className={classes.todoImg}>
          <img src={completedImg} alt={"todo img"} />
        </div>
      ) : (
        <div className={classes.todoImg}>
          <img src={todoImg} alt={"todo img"} />
        </div>
      )}
      {listState === "completed" ? (
        <p>Complete a task and get work done.</p>
      ) : (
        <p> Want to perform a task? add a todo.</p>
      )}
    </div>
  );
};

export default TodoImg;
