import "./App.scss";

import { useEffect, useContext } from "react";

import Header from "./components/Header";
import Main from "./components/Main";
import TodoContext from "./store/todo-context";

function App() {
  const { allTodos } = useContext(TodoContext);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(allTodos));
  }, [allTodos]);

  return (
    <div className="App">
      <Header />
      <main>
        <Main />
      </main>
    </div>
  );
}

export default App;
