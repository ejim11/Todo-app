import TodoItem from "./TodoItem";

import { useContext } from "react";
import classes from "./TodoList.module.scss";
import TodoContext from "../store/todo-context";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

const TodoList = () => {
  const {
    allTodos,
    listState,
    addToActiveTodo,
    addToCompleted,
    displayAll,
    clearCompleted,
    dragHandle,
  } = useContext(TodoContext);
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

  const addActiveHandler = () => {
    addToActiveTodo();
  };

  const addCompleteHandler = () => {
    addToCompleted();
  };

  const addAllHandler = () => {
    displayAll();
  };

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
              {listItems}
              {provided.placeholder}
            </ul>
          )}
        </Droppable>
      </DragDropContext>
      <div>
        <p className={classes.p} onClick={addAllHandler}>
          all
        </p>

        <p onClick={addActiveHandler}>active</p>

        <p onClick={addCompleteHandler}>completed</p>
        <p onClick={removeCompletedHandler}>clear completed</p>
        <p>{items.length} items left</p>
      </div>
    </>
  );
};

export default TodoList;
