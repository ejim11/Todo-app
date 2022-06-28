import TodoItem from "./TodoItem";

import { useContext } from "react";
import classes from "./TodoList.module.scss";
import TodoContext from "../store/todo-context";

const TodoList = () => {
  const { allTodos, listState, addToActiveTodo, addToCompleted, displayAll } =
    useContext(TodoContext);
  let listItems;

  if (listState === "all") {
    console.log(allTodos);

    listItems = allTodos.map((todo) => (
      <TodoItem
        key={todo.id}
        todoItem={todo.text}
        id={todo.id}
        checked={todo.checked}
      />
    ));
  }
  if (listState === "active") {
    listItems = allTodos
      .slice()
      .filter((item) => item.checked !== true)
      .map((todo) => (
        <TodoItem
          key={todo.id}
          todoItem={todo.text}
          id={todo.id}
          checked={todo.checked}
        />
      ));
  }
  if (listState === "completed") {
    listItems = allTodos
      .slice()
      .filter((item) => item.checked === true)
      .map((todo) => (
        <TodoItem
          key={todo.id}
          todoItem={todo.text}
          id={todo.id}
          checked={todo.checked}
        />
      ));
  }

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
    <div>
      <ul>{listItems}</ul>
      <p className={classes.p} onClick={addAllHandler}>
        all
      </p>

      <p onClick={addActiveHandler}>active</p>
      <p onClick={addCompleteHandler}>completed</p>
    </div>
  );
};

export default TodoList;
