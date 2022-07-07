import "./App.scss";

import { useEffect, useContext } from "react";

import Main from "./components/Main";
import TodoContext from "./store/todo-context";

function App() {
  const { allTodos, lightModeState, setMode } = useContext(TodoContext);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(allTodos));
    const storedMode = localStorage.getItem("mode");
    if (storedMode === "true") {
      setMode(true);
    } else if (storedMode === "false") {
      setMode(false);
  }}, [allTodos, lightModeState, setMode]);

  return (
    <div className={`${"app"} ${lightModeState ? "light" : "dark"}`}>
      <main className={"main"}>
        <Main />
      </main>
    </div>
  );
}

export default App;
