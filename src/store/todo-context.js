import React, { useState } from "react";

const TodoContext = React.createContext({
  allTodos: [],
  activeTodos: [],
  listState: "",
  addToActiveTodo: () => {},
  addToCompleted: () => {},
  setItemChecked: () => {},
  displayAll: () => {},
  addTodo: () => {},
  removeTodo: () => {},
});

export const TodoContextProvider = (props) => {
  const storedTodos = JSON.parse(localStorage.getItem("todos"));

  const [todos, setTodos] = useState(storedTodos || []);
  const [todoListState, setTodoListState] = useState("all");

  const setItemChecked = (id) => {
    let newTodo, updatedTodos;
    const existingTodoIndex = todos.findIndex((item) => item.id === id);
    const existingTodo = todos[existingTodoIndex];
    if (existingTodo && !existingTodo.checked) {
      newTodo = { ...existingTodo, checked: true };
    } else {
      newTodo = { ...existingTodo, checked: false };
    }
    updatedTodos = [...todos];
    updatedTodos[existingTodoIndex] = newTodo;
    setTodos(updatedTodos);
  };

  const displayActiveTodos = () => {
    setTodoListState("active");
  };

  const displayCompletedTodos = () => {
    setTodoListState("completed");
  };

  const displayAll = () => {
    setTodoListState("all");
  };

  const onAddTodo = (todo) => {
    console.log(todo);
    setTodos((prevState) => prevState.concat(todo));
  };
  const onRemoveTodo = () => {};

  const values = {
    allTodos: todos,
    addTodo: onAddTodo,
    removeTodo: onRemoveTodo,
    setItemChecked,
    addToActiveTodo: displayActiveTodos,
    addToCompleted: displayCompletedTodos,
    listState: todoListState,
    displayAll,
  };
  return (
    <TodoContext.Provider value={values}>{props.children}</TodoContext.Provider>
  );
};

export default TodoContext;
