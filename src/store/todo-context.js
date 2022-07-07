import React, { useState } from "react";

const TodoContext = React.createContext({
  allTodos: [],
  activeTodos: [],
  listState: "",
  lightModeState: true,
  addToActiveTodo: () => {},
  addToCompleted: () => {},
  setItemChecked: () => {},
  displayAll: () => {},
  addTodo: () => {},
  removeTodo: () => {},
  clearCompleted: () => {},
  dragHandle: () => {},
  editTodo: () => {},
  setMode: () => {},
});

export const TodoContextProvider = (props) => {
  const storedTodos = JSON.parse(localStorage.getItem("todos"));
  const [lightMode, setLightMode] = useState(true);
  const [todos, setTodos] = useState(storedTodos || []);
  const [todoListState, setTodoListState] = useState("all");

  const onDragHandle = (result) => {
    const newItems = [...todos];
    const [removed] = newItems.splice(result.source.index, 1);
    newItems.splice(result.destination.index, 0, removed);
    setTodos(newItems);
  };

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

  const editTodo = ({ id, text }) => {
    let newTodo, updatedTodos;
    const existingTodoIndex = todos.findIndex((item) => item.id === id);
    const existingTodo = todos[existingTodoIndex];
    if (existingTodo && !existingTodo.checked) {
      newTodo = { ...existingTodo, text: text };
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
    setTodos((prevState) => prevState.concat(todo));
  };
  const onRemoveTodo = (id) => {
    setTodos((prevState) => prevState.filter((todo) => todo.id !== id));
  };

  const clearCompleted = () => {
    setTodos((prevState) => prevState.filter((todo) => todo.checked !== true));
  };

  const changeLightModeHandler = (mode) => {
    localStorage.setItem("mode", mode);
    setLightMode(mode);
  };

  const values = {
    allTodos: todos,
    addTodo: onAddTodo,
    removeTodo: onRemoveTodo,
    setItemChecked,
    addToActiveTodo: displayActiveTodos,
    addToCompleted: displayCompletedTodos,
    listState: todoListState,
    displayAll,
    clearCompleted,
    editTodo,
    dragHandle: onDragHandle,
    lightModeState: lightMode,
    setMode: changeLightModeHandler,
  };
  return (
    <TodoContext.Provider value={values}>{props.children}</TodoContext.Provider>
  );
};

export default TodoContext;
