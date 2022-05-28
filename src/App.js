import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";

function App() {
  // Remember, Hooks have to be initialized inside of the body
  // of a React Component. You can’t initialize them outside
  // of the body or inside of a function
  const [todos, setTodos] = useState([
    {
      content: "Pickup dry cleaning",
      isCompleted: true,
    },
    {
      content: "Get haircut",
      isCompleted: false,
    },
    {
      content: "Build a todo app in React",
      isCompleted: false,
    },
  ]);

  // check if the key pressed is Enter, to create a new todo item
  // on the following line
  function handleKeyDown(e, i) {
    if(e.key === 'Enter') {
      createTodoAtIndex(e, i);
    }
  };


  function createTodoAtIndex(e, i) {
    // create a copy of the todos state array
    // state should never be directly mutated (modified)
    const newTodos = [...todos];
  }

  // Because we’re dealing with functional React components,
  // we won’t have a render method that’s typically found inside
  // of Class components. Instead, our functional component
  // directly returns the HTML.
  return (
    <div className="app">
      <div className="header">
        <img src={logo} className="logo" alt="logo" />
      </div>
      <form className="todo-list">
        <ul>
          {todos.map((todo, i) => (
            <div className="todo">
              <div className="checkbox" />
              <input
              type="text"
              value={todo.content}
              onKeyDown={(e) => handleKeyDown(e,i)}
              />
            </div>
          ))}
        </ul>
      </form>
    </div>
  );
}

export default App;
