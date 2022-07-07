import TodoItem from "./TodoItem";

import { useContext } from "react";
import classes from "./TodoList.module.scss";
import TodoContext from "../store/todo-context";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import TodoStates from "./TodoStates";
import TodoImg from "../UI/TodoImg";

const TodoList = () => {
  const { allTodos, listState, clearCompleted, dragHandle } =
    useContext(TodoContext);
  let listItems, items;

  if (listState === "all") {
    console.log(allTodos);

    listItems = allTodos.map((todo, index) => (
      <Draggable key={todo.id} draggableId={todo.id} index={index}>
        {(provided, snapshot) => (
          <li
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
          >
            <TodoItem
              todoItem={todo.text}
              id={todo.id}
              checked={todo.checked}
            />
          </li>
        )}
      </Draggable>
    ));
  }
  if (listState === "active") {
    listItems = allTodos
      .slice()
      .filter((item) => item.checked !== true)
      .map((todo, index) => (
        <Draggable key={todo.id} draggableId={todo.id} index={index}>
          {(provided, snapshot) => (
            <li
              ref={provided.innerRef}
              {...provided.draggableProps}
              {...provided.dragHandleProps}
            >
              <TodoItem
                todoItem={todo.text}
                id={todo.id}
                checked={todo.checked}
              />
            </li>
          )}
        </Draggable>
      ));
  }
  if (listState === "completed") {
    listItems = allTodos
      .slice()
      .filter((item) => item.checked === true)
      .map((todo, index) => (
        <Draggable key={todo.id} draggableId={todo.id} index={index}>
          {(provided, snapshot) => (
            <li
              ref={provided.innerRef}
              snapshot={snapshot}
              {...provided.draggableProps}
              {...provided.dragHandleProps}
            >
              <TodoItem
                todoItem={todo.text}
                id={todo.id}
                checked={todo.checked}
              />
            </li>
          )}
        </Draggable>
      ));
  }

  items =
    listState === "completed"
      ? allTodos.slice().filter((item) => item.checked === true)
      : allTodos.slice().filter((item) => item.checked !== true);

  console.log(items);

  const removeCompletedHandler = () => {
    clearCompleted();
  };

  const onDragEnd = (result) => {
    dragHandle(result);
  };

  return (
    <>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="characters">
          {(provided, snapshot) => (
            <ul
              className="characters"
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {listItems.length > 0 ? listItems : <TodoImg />}
              {provided.placeholder}
            </ul>
          )}
        </Droppable>
      </DragDropContext>
      <div className={classes["state-container"]}>
        <p className={classes.p}>
          {items.length} {items.length > 1 ? "items" : "item"} left
        </p>
        <TodoStates className={"bigScreen"} />
        <p
          className={classes["state-container__clear-completed"]}
          onClick={removeCompletedHandler}
        >
          clear completed
        </p>
      </div>
    </>
  );
};

export default TodoList;
